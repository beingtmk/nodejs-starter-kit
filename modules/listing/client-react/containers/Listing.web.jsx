import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import { compose, PLATFORM } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';
import ListingView from '../components/ListingView';

import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
import TOGGLE_LISTING_IS_ACTIVE from '../graphql/ToggleListingIsActive.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class Listing extends React.Component {
  render() {
    return <ListingView {...this.props} />;
  }
}

export default compose(
  graphql(LISTINGS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, listings, fetchMore, subscribeToMore } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.listings.totalCount;
            const newEdges = fetchMoreResult.listings.edges;
            const pageInfo = fetchMoreResult.listings.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.listings.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              listings: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Listings'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, listings, subscribeToMore, loadData };
    }
  }),
  graphql(DELETE_LISTING, {
    props: ({ mutate }) => ({
      deleteListing: async id => {
        message.loading('Please wait...', 0);
        try {
          const {
            data: { deleteListing }
          } = await mutate({ variables: { id } });

          if (deleteListing.errors) {
            return { errors: deleteListing.errors };
          }
          message.destroy();
          message.warning('Listing deleted.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(TOGGLE_LISTING_IS_ACTIVE, {
    props: ({ mutate }) => ({
      toggleListingIsActive: async id => {
        message.loading('Please wait...', 0);
        try {
          message.destroy();
          const {
            data: { toggleListingIsActive }
          } = await mutate({
            variables: { id }
          });

          if (toggleListingIsActive.errors) {
            return { errors: toggleListingIsActive.errors };
          }

          message.success('Success!');
        } catch (e) {
          message.error("Couldn't perform the action");
          throw Error(e);
        }
      }
    })
  }),
  translate('listing')
)(Listing);
