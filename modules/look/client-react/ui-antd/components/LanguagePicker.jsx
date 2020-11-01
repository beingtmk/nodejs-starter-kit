import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import Icon from './Icon';
import MenuItem from './MenuItem';
import Dropdown from './Dropdown';

export default class LanguagePicker extends React.Component {
  render() {
    const { i18n } = this.props;
    const languages = Object.keys(i18n.store.data);

    return (
      <MenuItem className="ant-menu-item language-picker-nav">
        {languages.length > 1 && (
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => this.props.i18n.changeLanguage(key)} mode="verticle" theme="dark">
                {Object.keys(this.props.i18n.store.data).map(lang => (
                  <MenuItem key={lang}>{lang.slice(0, 2).toUpperCase()}</MenuItem>
                ))}
              </Menu>
            }
            trigger={['hover']}
          >
            <div style={{ marginLeft: '8px' }}>
              <Icon type="ReadOutlined" />
              {this.props.i18n.language.slice(0, 2).toUpperCase()}{' '}
            </div>
          </Dropdown>
        )}
      </MenuItem>
    );
  }
}

LanguagePicker.propTypes = {
  i18n: PropTypes.object.isRequired
};
