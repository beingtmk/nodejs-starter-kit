import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import MyGroupsView from '../components/MyGroupsView';

import GROUP_SUBSCRIPTION from '../graphql/GroupsSubscription.graphql';
import GROUP_QUERY from '../graphql/UserGroupsQuery.graphql';

const MyGroups = props => {
  const { subscribeToMore } = props;
  useEffect(() => {
    const subscribe = subscribeToGroups(subscribeToMore);
    return () => subscribe();
  });
  return <MyGroupsView {...props} groups={props.userGroups} />;
};

MyGroups.propTypes = {
  subscribeToMore: PropTypes.func,
  userGroups: PropTypes.array
};

const onAddGroup = (prev, node) => {
  // ignore if duplicate
  if (prev.userGroups.some(item => node.id === item.id)) {
    return prev;
  }
  return update(prev, {
    userGroups: {
      $set: [...prev.userGroups, node]
    }
  });
};

const onDelete = (prev, id) => {
  const index = prev.userGroups.findIndex(item => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    userGroups: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToGroups = subscribeToMore =>
  subscribeToMore({
    document: GROUP_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            groupsUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddGroup(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onDelete(prev, node.id);
        return () => newResult();
      } else if (mutation === 'DELETED') {
        newResult = onDelete(prev, node.id);
      }
      return newResult;
    }
  });

export default compose(
  graphql(GROUP_QUERY, {
    props({ data: { loading, userGroups, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        userGroups,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })
)(translate('group')(MyGroups));
