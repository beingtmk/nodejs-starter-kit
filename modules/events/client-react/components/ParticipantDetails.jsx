import React from 'react';
import { Divider } from 'antd';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';
import { PropTypes } from 'prop-types';

const ParticipantDetails = props => {
  return (
    <>
      {props.user && (
        <>
          <Divider />
          <h4>
            {props.user.username}: {props.user.email}
          </h4>
          {/* <h4>{props.user.email}</h4> */}
        </>
      )}
    </>
  );
};

ParticipantDetails.propTypes = {
  user: PropTypes.object
};

export default compose(
  graphql(USER_QUERY, {
    options: ({ participant: { userId } }) => {
      return {
        variables: { id: Number(userId) }
      };
    },
    props({ data: { loading, user } }) {
      const userPayload = user ? { user: user.user } : {};
      return {
        loading,
        ...userPayload
      };
    }
  })
)(ParticipantDetails);
