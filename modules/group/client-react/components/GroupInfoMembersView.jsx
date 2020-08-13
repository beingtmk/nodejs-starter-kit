import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
// import { Menu, Icon } from "antd";
// import { Loading, MenuItem } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
import MembersComponent from "./MembersComponent";

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

class GroupInfoMembersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false};
  }

  componentDidMount() {
    this.setState({ flag: true });
  }

  render() {
    const { group } = this.props;
    return <MembersComponent {...this.props} />;
  }
}

GroupInfoMembersView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func,
};

export default GroupInfoMembersView;
