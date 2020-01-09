import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { PLATFORM, compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import settings from '../../../../settings';
import ResourcesView from '../components/ResourcesView';

import RESOURCES_QUERY from '../graphql/ResourcesQuery.graphql';
import DELETE_RESOURCE from '../graphql/DeleteResource.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

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
class Resources extends React.Component {
  render() {
    console.log('props', this.props);
    return <ResourcesView {...this.props} t={translate} />;
  }
}

export default compose(
  graphql(RESOURCES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, resources, fetchMore, subscribeToMore } = data;
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
      return { loading, resources, subscribeToMore, loadData };
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
