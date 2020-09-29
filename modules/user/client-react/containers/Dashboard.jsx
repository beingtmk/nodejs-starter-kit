import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";

import { compose } from "@gqlapp/core-common";

import DashboardView from "../components/DashboardView";

const Dashboard = (props) => {
  return <DashboardView {...props}  />;
};

Dashboard.propTypes = {
  // currentUser: PropTypes.object,
  // shape({
  //   id: PropTypes.number,
  //   role: PropTypes.string,
  //   isActive: PropTypes.bool,
  //   createdAt: PropTypes.string,
  //   updatedAt: PropTypes.string,
  //   profile: PropTypes.shape({
  //     firstName: PropTypes.string,
  //     lastName: PropTypes.string
  //   })
  // })
};

export default Dashboard;
