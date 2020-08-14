import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { translate } from '@gqlapp/i18n-client-react';
import GroupInfoMembersView from '../components/GroupInfoMembersView';
import GROUP_QUERY from '../graphql/GroupQuery.graphql';
import ADD_GROUP_MEMBER from '../graphql/AddGroupMemberInvite.graphql';
import EDIT_GROUP_MEMBER from '../graphql/EditGroupMember.graphql';
import CHANGE_GROUP_MEMBER_TYPE from '../graphql/ChangeGroupMemberType.graphql';
import GROUP_ITEM_SUBSCRIPTION from '../graphql/GroupItemSubscription.graphql';

const subscribeToGroupPage = (subscribeToMore, groupId, history, navigation) =>
  subscribeToMore({
    document: GROUP_ITEM_SUBSCRIPTION,
    variables: { id: groupId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            groupItemUpdated: { mutation, node }
          }
        }
      }
    ) => {
      console.log('subscriptionOfQuiz', mutation, node);
      if (mutation === 'UPDATED') {
        return {group:node}
      }
      return prev;
    }
  });


const Group = (props)=>{
  useEffect(() => {
    console.log('useEffectGroup', props);
    if (props.group) {
      const {
        subscribeToMore,
        group: { id },
        history,
        navigation
      } = props;
      const subscribe = subscribeToGroupPage(subscribeToMore, id, history, navigation);
      return () => subscribe();
    }
  });
  return(
<GroupInfoMembersView {...props} />
  )
}


Group.propTypes = {
  match: PropTypes.object
};

export default compose(
  graphql(GROUP_QUERY, {
    options: props => {
      let id = 0;
      if (props.groupId) {
        id = props.groupId;
      }
      console.log('groupquery', props);

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, group, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { groupLoading: loading, group, subscribeToMore, updateQuery };
    }
  }),
  graphql(ADD_GROUP_MEMBER, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addGroupMember: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let ansData = await mutate({
            variables: {
              input: values
            },
          });

          
        } catch (e) {
          
          console.error(e);
        }
      }
    })
  }),
  graphql(EDIT_GROUP_MEMBER, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      editGroupMember: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let ansData = await mutate({
            variables: {
              input: values
            },
          });

          
        } catch (e) {
          
          console.error(e);
        }
      }
    })
  }),
  graphql(CHANGE_GROUP_MEMBER_TYPE, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      changeGroupMemberType: async values => {
        // message.destroy();
        // message.loading('Please wait...', 0);
        try {
          let ansData = await mutate({
            variables: {
              input: values
            },
          });

          
        } catch (e) {
          
          console.error(e);
        }
      }
    })
  }),
)(translate('blog')(Group));
