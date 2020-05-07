import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import LISTING_QUERY from '../graphql/ListingQuery.graphql';
import EDIT_LISTING from '../graphql/EditListing.graphql';

import EditListingView from '../components/EditListingView.web';

class EditListing extends React.Component {
  render() {
    console.log('props', this.props);
    return <EditListingView {...this.props} />;
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  graphql(LISTING_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, listing, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { loading, listing, subscribeToMore };
    }
  }),
  graphql(EDIT_LISTING, {
    props: ({
      ownProps: {
        history,
        navigation,
        currentUser: { role }
      },
      mutate
    }) => ({
      editListing: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const input = removeTypename(values);
          input.listingImage = Object.values(input.listingImage);

          console.log('input', input);
          await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          if (history) {
            if (role === 'admin') return history.push('/listings');
            else return history.push('/my-listings');
          }
          if (navigation) {
            if (role === 'admin') return navigation.navigate('ListingCatalogue');
            else return navigation.navigate('MyListings');
          }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),

  translate('events')
)(EditListing);
