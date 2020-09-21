import React, { useState } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Drawer, Menu, Icon } from "antd";
import { enquireScreen } from "enquire-js";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import styles from "../styles/index.less";

class GroupDashBoardSider extends React.Component {
  render() {
    const { path, id } = this.props;
    return (
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={path}
        // className="navbar-menu"
      >
        <MenuItem
          className="group-layout-sider-menuitem"
          key="/group/:id/info"
        >
          <NavLink to={`/group/${id}/info`}>
            <Icon type="file-text" />
            Info
          </NavLink>
        </MenuItem>
        <MenuItem
          className="group-layout-sider-menuitem"
          key="/group/:id/sub-groups"
        >
          <NavLink to={`/group/${id}/sub-groups`}>
            <Icon type="apartment" />
            Sub Groups
          </NavLink>
        </MenuItem>

        <MenuItem
          className="group-layout-sider-menuitem"
          key="/group/:id/members"
        >
          <NavLink to={`/group/${id}/members`}>
            <Icon type="team" />
            Members
          </NavLink>
        </MenuItem>

        <MenuItem
          className="group-layout-sider-menuitem"
          key="/group/:id/quizzes"
        >
          <NavLink to={`/group/${id}/quizzes`}>
            <Icon type="question" />
            Quizzes
          </NavLink>
        </MenuItem>
      </Menu>
    );
  }
}

GroupDashBoardSider.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string,
};

export { GroupDashBoardSider };

const GroupDashBoardDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Drawer placement="left" onClose={setVisible(true)} visible={visible}>
      <GroupDashBoardSider {...props} />
    </Drawer>
  );
};

export default GroupDashBoardDrawer;
