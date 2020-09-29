import React from "react";
import PropTypes from "prop-types";
import AccountLayout from "@gqlapp/look-client-react/ui-antd/components/AccountLayout";

const DashboardView = (props) => {
  const { match } = props;
  return (
    <AccountLayout path={match && match.path}>
      <h1>DashBoardView</h1>
    </AccountLayout>
  );
};

DashboardView.propTypes = {
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

export default DashboardView;
