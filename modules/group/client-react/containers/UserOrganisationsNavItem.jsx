import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Col, Empty, Menu, Icon } from "antd";
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { NavLink } from "react-router-dom";

import { translate } from "@gqlapp/i18n-client-react";
// import { message } from 'antd';
// import UserOrganisationsNavItemView from '../components/UserOrganisationsNavItemView';

import GROUP_SUBSCRIPTION from "../graphql/GroupsSubscription.graphql";
import GROUP_QUERY from "../graphql/UserGroupsQuery.graphql";
import { Row, Loading, Avatar, MenuItem } from "@gqlapp/look-client-react";
import { withLoadedUser } from "@gqlapp/user-client-react/containers/Auth.web";
const { Meta } = Card;
const { SubMenu } = Menu;

const UserOrganisationsNavItem = (props) => {
  //   const { subscribeToMore } = props;
  //   useEffect(() => {
  //     const subscribe = subscribeToGroups(subscribeToMore);
  //     return () => subscribe();
  //   });
  console.log("propsProfileOrg", props);
  const { loading, userGroups } = props;

  const getOrgs = () => {
    if (loading) {
      return (
        <MenuItem {...props} key="my-organisations-loading">
          <Icon type="loading" />
          Loading...
        </MenuItem>
      );
    } else {
      if (userGroups && userGroups.length === 0) {
        return <MenuItem {...props}>No organisations to show</MenuItem>;
      } else if (userGroups && userGroups.length === 1) {
        return (
          <MenuItem {...props} key={`/group/${userGroups[0].id}/info`}>
            <NavLink
              to={`/group/${userGroups[0].id}/info`}
              className="nav-link"
              activeClassName="active"
            >
              <Avatar
                size={15}
                style={{ marginTop: "-5px", marginRight: "5px" }}
                src={userGroups[0].avatar}
              />
              {userGroups[0].title}
            </NavLink>
          </MenuItem>
        );
      } else {
        return (
          <SubMenu
            key="my-organisations"
            title={
              <>
                {" "}
                <Icon type="team" />
                My Organisations
              </>
            }
            {...props}
          >
            {userGroups.map((group, key) => (
              <MenuItem key={`/group/${group.id}/info`}>
                <NavLink
                  to={`/group/${group.id}/info`}
                  className="nav-link"
                  activeClassName="active"
                >
                  <Avatar
                    size={15}
                    style={{ marginTop: "-5px", marginRight: "5px" }}
                    src={group.avatar}
                  />
                  {group.title}
                </NavLink>
              </MenuItem>
            ))}
          </SubMenu>
        );
      }
    }
  };
  return getOrgs();
};

UserOrganisationsNavItem.propTypes = {
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
  withLoadedUser,
  graphql(GROUP_QUERY, {
    options: ({ currentUser: { id } }) => {
      return {
        fetchPolicy: "network-only",
        variables: { userId: id },
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
)(translate("group")(UserOrganisationsNavItem));

// const UserOrganisationWithGroupsWithCurrentUser = () => {
//   return (
//     <>
//       <MenuItem>Orgs C</MenuItem>
//       {/* <UserOrganisationWithGroups /> */}
//     </>
//   );
// };

// export default UserOrganisationWithGroupsWithCurrentUser;
