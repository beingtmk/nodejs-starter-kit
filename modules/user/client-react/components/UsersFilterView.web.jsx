import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import {
  Space,
  Icon,
  Form,
  FormItem,
  Select,
  Option,
  RenderCheckBox,
  Input,
  Row,
  Col
} from '@gqlapp/look-client-react';

const UsersFilterView = props => {
  const {
    filter: { searchText, role, isActive },
    onSearchTextChange,
    onRoleChange,
    onIsActiveChange,
    t
  } = props;

  return (
    <Form /* layout="inline" */>
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row>
            <Col lg={16} xs={24} md={14}>
              <Row gutter={24}>
                <Col>
                  <FormItem
                    label={
                      <Space align="center">
                        <Icon type="SearchOutlined" />
                        {t('users.list.item.filter')}
                      </Space>
                    }
                  >
                    <DebounceInput
                      minLength={2}
                      debounceTimeout={300}
                      placeholder={t('users.list.item.search')}
                      element={Input}
                      value={searchText}
                      onChange={e => onSearchTextChange(e.target.value)}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <Field
                    name="isActive"
                    icon={'CheckCircleOutlined'}
                    component={RenderCheckBox}
                    type="checkbox"
                    onChange={() => onIsActiveChange(!isActive)}
                    label={t('users.list.item.active')}
                    inFilter={true}
                    checked={isActive}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={8} xs={24} md={10}>
              <Row>
                <Col lg={0} md={0} xs={24}>
                  <FormItem label={t('users.list.item.role.label')} style={{ width: '100%' }}>
                    <Select name="role" defaultValue={role} style={{ width: '100%' }} onChange={e => onRoleChange(e)}>
                      <Option key={1} value="">
                        {t('users.list.item.role.all')}
                      </Option>
                      <Option key={2} value="user">
                        {t('users.list.item.role.user')}
                      </Option>
                      <Option key={3} value="admin">
                        {t('users.list.item.role.admin')}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={0} md={24} lg={24}>
                  <Row type="flex" justify="end">
                    <FormItem
                      label={
                        <Space align="center">
                          <Icon type="UserSwitchOutlined" />
                          {t('users.list.item.role.label')}
                        </Space>
                      }
                      style={{ width: '100%' }}
                    >
                      <Select name="role" defaultValue={''} style={{ width: '170px' }} onChange={e => onRoleChange(e)}>
                        <Option key={1} value="">
                          {t('users.list.item.role.all')}
                        </Option>
                        <Option key={2} value="user">
                          {t('users.list.item.role.user')}
                        </Option>
                        <Option key={3} value="admin">
                          {t('users.list.item.role.admin')}
                        </Option>
                      </Select>
                    </FormItem>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

UsersFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(UsersFilterView);
