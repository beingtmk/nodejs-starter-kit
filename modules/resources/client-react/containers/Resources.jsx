import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { PLATFORM, compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import settings from '../../../../settings';
import ResourcesView from '../components/ResourcesView';

import RESOURCES_QUERY from '../graphql/ResourcesQuery.graphql';
import DELETE_RESOURCE from '../graphql/DeleteResource.graphql';
import RESOURCES_SUBSCRIPTION from '../graphql/ResourcesSubscription.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;
const Resources = props => {
  const { t, updateQuery, subscribeToMore, filter } = props;
  const useResourcesWithSubscription = (subscribeToMore, filter) => {
    const [resourcesUpdated, setresourcesUpdated] = useState(null);

    useEffect(() => {
      const subscribe = subscribeToResources();
      return () => subscribe();
    });

    const subscribeToResources = () => {
      return subscribeToMore({
        document: RESOURCES_SUBSCRIPTION,
        variables: { filter },
        updateQuery: (
          prev,
          {
            subscriptionData: {
              data: { resourcesUpdated: newData }
            }
          }
        ) => {
          setresourcesUpdated(newData);
        }
      });
    };

    return resourcesUpdated;
  };

  const updateResourcesState = (ResourcesUpdated, updateQuery) => {
    const { mutation, node } = ResourcesUpdated;
    updateQuery(prev => {
      switch (mutation) {
        case 'CREATED':
          return onAddResource(prev, node);
        case 'DELETED':
          return onDeleteResource(prev, node.id);
        case 'UPDATED':
          return onDeleteResource(prev, node.id);
        default:
          return prev;
      }
    });
  };

  function onAddResource(prev, node) {
    // check if it is duplicate
    if (prev.resources.edges.some(resource => resource.node.id === node.id)) {
      return prev;
    }

    return update(prev, {
      resources: {
        pageInfo: {
          endCursor: { $set: prev.resources.pageInfo.endCursor + 1 }
        },
        edges: {
          $set: [
            ...prev.resources.edges,
            {
              cursor: prev.resources.pageInfo.endCursor + 1,
              node,
              __typename: 'ResourceEdges'
            }
          ]
        }
      }
    });
  }

  const onDeleteResource = (prev, id) => {
    const index = prev.resources.edges.findIndex(x => x.node.id === id);

    // ignore if not found
    if (index < 0) {
      return prev;
    }

    return update(prev, {
      resources: {
        totalCount: {
          $set: prev.resources.totalCount - 1
        },
        edges: {
          $splice: [[index, 1]]
        }
      }
    });
  };

  const resourcesUpdated = useResourcesWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (resourcesUpdated) {
      updateResourcesState(resourcesUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return <ResourcesView {...props} t={translate} />;
  // }
};

export default compose(
  graphql(RESOURCES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, resources, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.resources.totalCount;
            const newEdges = fetchMoreResult.resources.edges;
            const pageInfo = fetchMoreResult.resources.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.resources.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              resources: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Resources'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, resources, subscribeToMore, loadData, updateQuery };
    }
  }),
  graphql(DELETE_RESOURCE, {
    props: ({ mutate }) => ({
      deleteResource: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteResource: {
              id: id,
              __typename: 'Resource'
            }
          },

          update: (cache, { data: { deleteResource } }) => {
            // Get previous resource from cache
            const prevResource = cache.readQuery({
              query: RESOURCES_QUERY,
              variables: {
                limit,
                after: 0
              }
            });

            const newListResource = onDeleteResource(prevResource, deleteResource.id);

            // Write resource to cache
            cache.writeQuery({
              query: RESOURCES_QUERY,
              variables: {
                limit,
                after: 0
              },
              data: {
                resources: {
                  ...newListResource.resources,
                  __typename: 'Resources'
                }
              }
            });
          }
        });
        message.warning('Resource deleted.');
      }
    })
  }),
  translate('resources')
)(Resources);
