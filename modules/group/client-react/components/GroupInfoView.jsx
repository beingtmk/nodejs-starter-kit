import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Menu, Icon, Spin as Loader } from "antd";
import { MenuItem } from "@gqlapp/look-client-react";
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupInfoQuizReport from '../containers/GroupInfoQuizReport';
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

  handleClick=(e)=>{
    console.log(e);
    this.setState({ current: e.key });
  }

  render() {
    const {group} = this.props;
    return (
      <GroupLayout siderMenu={
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
          // className="navbar-menu"
        >
          <MenuItem key="info"><Icon type="file-text" />Info</MenuItem>
          <MenuItem key="members"><Icon type="team" />Members</MenuItem>
          <MenuItem key="quiz-report"><Icon type="bar-chart" />Quiz Report</MenuItem>
        </Menu>
      }>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.groupLoading ? (
          <>
          {this.state.current === 'info' && (<GroupComponent {...this.props} />)}
          {this.state.current === 'members' && (<GroupInfoMembers groupId={group && group.id} />)}
          {this.state.current === 'quiz-report' && (<GroupInfoQuizReport groupId={group && group.id}/>)}
          </>
        ) : (
          <div align='center'><Loader /></div>
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
