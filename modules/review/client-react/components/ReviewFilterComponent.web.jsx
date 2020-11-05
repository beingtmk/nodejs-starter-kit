import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { MODAL } from '@gqlapp/review-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input, Col, Row } from '@gqlapp/look-client-react';

const ReviewsFilterView = ({
  filter: { searchText, isActive },
  onSearchTextChange,
  onIsActiveChange,
  onModalNameChange,
  t
}) => (
  <Form layout="inline">
    <Row type="flex" align="middle">
      <Col span={24}>
        <Row>
          <Col lg={16} xs={24} sm={24} md={14}>
            <Row gutter={24}>
              <Col xs={24} md={24} sm={14} lg={16}>
                <FormItem label={t('adminPanel.filter.field1')} style={{ width: '100%' }}>
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    placeholder={t('adminPanel.filter.field1')}
                    element={Input}
                    value={searchText}
                    onChange={e => onSearchTextChange(e.target.value)}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24} sm={10} lg={8}>
                <FormItem>
                  <Label>
                    <Input type="checkbox" defaultChecked={isActive} onChange={() => onIsActiveChange(!isActive)} />
                    &nbsp; &nbsp;
                    {t('adminPanel.filter.field3')}
                  </Label>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col lg={8} xs={24} sm={24} md={10}>
            <Row>
              <Col lg={0} md={0} xs={24}>
                <FormItem label={t('adminPanel.filter.field2')} style={{ width: '100%' }}>
                  <Select
                    name="modal"
                    defaultValue={MODAL[0].value}
                    style={{ width: '100%' }}
                    onChange={e => onModalNameChange(e)}
                  >
                    {MODAL.map((m, i) => (
                      <Option key={i} value={m.value}>
                        {m.label}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col xs={0} md={24} lg={24}>
                <Row type="flex" justify="end">
                  <FormItem label={t('adminPanel.filter.field2')} style={{ width: '100%' }}>
                    <Select
                      name="modal"
                      defaultValue={MODAL[0].value}
                      style={{ width: '170px' }}
                      onChange={e => onModalNameChange(e)}
                    >
                      {MODAL.map((m, i) => (
                        <Option key={i} value={m.value}>
                          {m.label}
                        </Option>
                      ))}
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

ReviewsFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onModalNameChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('review')(ReviewsFilterView);
