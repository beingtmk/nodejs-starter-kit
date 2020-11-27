import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input, Row, Col } from '@gqlapp/look-client-react';

const UsersFilterView = ({
  filter: { searchText, role, isActive },
  onSearchTextChange,
  onRoleChange,
  onIsActiveChange,
  t
}) => (
  <Form /* layout="inline" */>
    <Row type="flex" align="middle">
      <Col span={24}>
        <Row>
          <Col lg={16} xs={24} md={14}>
            <Row gutter={24}>
              <Col>
                <FormItem label={t('users.list.item.filter')}>
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
                <FormItem>
                  <Label>
                    <Input
                      type="checkbox"
                      defaultChecked={isActive}
                      onChange={e => onIsActiveChange(e.target.checked)}
                    />
                    {t('users.list.item.active')}
                  </Label>
                </FormItem>
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
                  <FormItem label={t('users.list.item.role.label')} style={{ width: '100%' }}>
                    <Select name="role" defaultValue={role} style={{ width: '170px' }} onChange={e => onRoleChange(e)}>
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

UsersFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(UsersFilterView);
