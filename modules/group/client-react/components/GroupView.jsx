import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Loading, MenuItem } from "@gqlapp/look-client-react";
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupComponent from "./GroupComponent";
import MembersComponent from "./MembersComponent";

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false, current: "info" };
  }

  componentDidMount() {
    this.setState({ flag: true });
  }

  handleClick=(e)=>{
    console.log(e);
    this.setState({ current: e.key });
  }

  render() {
    return (
      <GroupLayout siderMenu={
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
          // className="navbar-menu"
        >
          <MenuItem key="info">Info</MenuItem>,
          <MenuItem key="members">Members</MenuItem>,
          <MenuItem key="quiz-report">Quiz Report</MenuItem>,
        </Menu>
      }>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.groupLoading ? (
          <>
          {this.state.current === 'info' && (<GroupComponent {...this.props} />)}
          {this.state.current === 'members' && (<MembersComponent {...this.props} />)}
          </>
        ) : (
          <Loading />
        )}
      </GroupLayout>
    );
  }
}

GroupView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func,
};

export default GroupView;
