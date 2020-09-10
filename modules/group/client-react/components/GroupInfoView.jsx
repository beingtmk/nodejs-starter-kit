import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Menu, Icon, Spin as Loader } from "antd";
import { MenuItem } from "@gqlapp/look-client-react";
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupInfoQuizReport from "../containers/GroupInfoQuizReport";
import GroupComponent from "./GroupComponent";
import GroupInfoMembers from "../containers/GroupInfoMembers";

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

class GroupInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false, current: "info" };
  }

  componentDidMount() {
    this.setState({ flag: true });
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { group, match, navigation, history } = this.props;
    let id = 0;
    if (match) {
      id = match.params.id;
    } else if (navigation) {
      id = navigation.state.params.id;
    }
    return (
      <GroupLayout id={id} path={match && match.path}>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.groupLoading ? (
          <GroupComponent {...this.props} />
        ) : (
          <div align="center">
            <Loader />
          </div>
        )}
      </GroupLayout>
    );
  }
}

GroupInfoView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func,
};

export default GroupInfoView;
