import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';

// Query
import PLATFORM_QUERY from '../graphql/PlatformQuery.graphql';

// Mutation
import EDIT_PLATFORM from '../graphql/EditPlatform.graphql';

// Query
export const withPlatform = Component =>
  graphql(PLATFORM_QUERY, {
    options: () => {
      // let id = 0;
      // if (props.match) {
      //   id = props.match.params.id;
      // } else if (props.navigation) {
      //   id = props.navigation.state.params.id;
      // }
      return {
        variables: { id: 1 }
      };
    },
    props({ data: { loading, error, platform, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, platform, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
export const withEditPlatform = Component =>
  graphql(EDIT_PLATFORM, {
    props: ({ mutate }) => ({
      editPlatform: async input => {
        try {
          Message.destroy();
          Message.loading('Please wait...', 0);
          await mutate({
            variables: {
              input
            }
          });
          Message.destroy();
          Message.success('Changes Saved.');
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
