import React from 'react';
import { graphql } from 'react-apollo';
import { PLATFORM, compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import settings from '../../../../settings';
import ResourcesView from '../components/ResourcesView';

import RESOURCES_QUERY from '../graphql/ResourcesQuery.graphql';
// import DELETE_RESOURCE from '../.graphql/DeleteResource.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class Resources extends React.Component {
  render() {
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
  // graphql(DELETE_LISTING, {
  //   props: ({ mutate }) => ({
  //     deleteListing: id => {
  //       mutate({
  //         variables: { id },
  //         optimisticResponse: {
  //           __typename: 'Mutation',
  //           deleteListing: {
  //             id: id,
  //             __typename: 'Listing'
  //           }
  //         },

  //         update: (cache, { data: { deleteListing } }) => {
  //           // Get previous listings from cache
  //           const prevListings = cache.readQuery({
  //             query: LISTINGS_QUERY,
  //             variables: {
  //               limit,
  //               after: 0
  //             }
  //           });

  //           const newListListings = onDeleteListing(
  //             prevListings,
  //             deleteListing.id
  //           );

  //           // Write listings to cache
  //           cache.writeQuery({
  //             query: LISTINGS_QUERY,
  //             variables: {
  //               limit,
  //               after: 0
  //             },
  //             data: {
  //               listings: {
  //                 ...newListListings.listings,
  //                 __typename: 'Listings'
  //               }
  //             }
  //           });
  //         }
  //       });
  //       message.warning('Listing deleted.');
  //     }
  //   })
  // }),
  translate('resources')
)(Resources);
