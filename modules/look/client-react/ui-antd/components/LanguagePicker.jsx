import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon } from "antd";

const { SubMenu } = Menu;

export default class LanguagePicker extends React.Component {
  render() {
    const { i18n } = this.props;
    const languages = Object.keys(i18n.store.data);

    return (
      <Menu theme="dark" style={{ height: "32px" }} className="nav-translator">
        {languages.length > 1 && (
          <SubMenu
            key="sub1"
            onClick={({ key }) => this.props.i18n.changeLanguage(key)}
            title={
              <div className="lang-picker-submenu">
                <Icon type="read" />{" "}
                {this.props.i18n.language.slice(0, 2).toUpperCase()}{" "}
              </div>
            }
          >
            {Object.keys(this.props.i18n.store.data).map(lang => (
              <Menu.Item key={lang}>{lang.slice(0, 2).toUpperCase()}</Menu.Item>
            ))}
          </SubMenu>
        )}
      </Menu>
    );
  }
}

LanguagePicker.propTypes = {
  i18n: PropTypes.object.isRequired
};
