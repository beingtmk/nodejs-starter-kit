import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Col, Empty } from "antd";
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { NavLink } from "react-router-dom";

import { translate } from "@gqlapp/i18n-client-react";
// import { message } from 'antd';
// import ProfileOrganisationDisplayView from '../components/ProfileOrganisationDisplayView';

import GROUP_SUBSCRIPTION from "../graphql/GroupsSubscription.graphql";
import GROUP_QUERY from "../graphql/UserGroupsQuery.graphql";
import { Row, Loading, Avatar } from "@gqlapp/look-client-react";

const { Meta } = Card;

const ProfileOrganisationDisplay = (props) => {
  //   const { subscribeToMore } = props;
  //   useEffect(() => {
  //     const subscribe = subscribeToGroups(subscribeToMore);
  //     return () => subscribe();
  //   });
  console.log("propsProfileOrg", props);
  const { loading, userGroups } = props;
  return (
    <Row gutter={24}>
      {loading ? (
        <div align="center">
          <Loading />
        </div>
      ) : userGroups && userGroups.length !== 0 ? (
        userGroups.map((group, key) => (
          <Col key={key} xs={24} md={12} lg={8}>
            <NavLink to={`/group/${group.id}/info`}>
              <Card bodyStyle={{ padding: "15px" }}>
                <Meta
                  title={
                    <p className="line-limiter-1" style={{ fontSize: "15px" }}>
                      {group.title}
                    </p>
                  }
                  description={
                    <p className="line-limiter-2" style={{ fontSize: "10px" }}>
                      {group.description}
                    </p>
                  }
                  avatar={<Avatar size={50} src={group.avatar} />}
                />
              </Card>
            </NavLink>
          </Col>
        ))
      ) : (
        <Empty />
      )}
      {/* {<Col xs={24} md={12} lg={8}>
          </Col>} */}
    </Row>
  );
};

ProfileOrganisationDisplay.propTypes = {
  //   subscribeToMore: PropTypes.func,
  userGroups: PropTypes.array,
};

// const onAddGroup = (prev, node) => {
//   // ignore if duplicate
//   if (prev.userGroups.some((item) => node.id === item.id)) {
//     return prev;
//   }
//   return update(prev, {
//     userGroups: {
//       $set: [...prev.userGroups, node],
//     },
//   });
// };

// const onDelete = (prev, id) => {
//   const index = prev.userGroups.findIndex((item) => item.id === id);

//   // ignore if not found
//   if (index < 0) {
//     return prev;
//   }

//   return update(prev, {
//     userGroups: {
//       $splice: [[index, 1]],
//     },
//   });
// };

// const subscribeToGroups = (subscribeToMore) =>
//   subscribeToMore({
//     document: GROUP_SUBSCRIPTION,
//     updateQuery: (
//       prev,
//       {
//         subscriptionData: {
//           data: {
//             groupsUpdated: { mutation, node },
//           },
//         },
//       }
//     ) => {
//       let newResult = prev;
//       if (mutation === "CREATED") {
//         newResult = onAddGroup(prev, node);
//       } else if (mutation === "UPDATED") {
//         newResult = onDelete(prev, node.id);
//         return () => newResult();
//       } else if (mutation === "DELETED") {
//         newResult = onDelete(prev, node.id);
//       }
//       return newResult;
//     },
//   });

export default compose(
  graphql(GROUP_QUERY, {
    options: ({ userId }) => {
      return {
        fetchPolicy: "network-only",
        variables: { userId },
      };
    },
    props({
      data: {
        loading,
        userGroups,
        refetch,
        error,
        updateQuery,
        subscribeToMore,
      },
    }) {
      return {
        loading,
        userGroups,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null,
      };
    },
  })
)(translate("group")(ProfileOrganisationDisplay));
