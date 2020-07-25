import React, { Children, isValidElement, cloneElement } from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import { compose } from "@gqlapp/core-common";
import CURRENT_USER_QUERY from "../graphql/CurrentUserQuery.graphql";

const Profile = (props) => {
  const { currentUser, currentUserLoading, children } = props;
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { currentUser, currentUserLoading });
    }

    return child;
  });

  return <>{!currentUserLoading && currentUser && childrenWithProps}</>;
};

Profile.propTypes = {
  currentUser: PropTypes.object,
  currentUserLoading: PropTypes.bool,
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    },
  })
)(Profile);
