import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';
import { translate } from '@gqlapp/i18n-client-react';
import {
  Space,
  Icon,
  Form,
  FormItem,
  Option,
  RenderCheckBox,
  Input,
  Col,
  Row,
  RenderSelect
} from '@gqlapp/look-client-react';

const ReviewsFilterView = props => {
  const {
    filter: { searchText, modalName = '', isActive },
    onSearchTextChange,
    onIsActiveChange,
    onModalNameChange,
    onFiltersRemove,
    t
  } = props;
  const handleFiltersRemove = useRef(() => {});

  handleFiltersRemove.current = () => {
    const filter = {
      searchText: '',
      modalName: '',
      isActive: true
    };
    const orderBy = { column: '', order: '' };
    onFiltersRemove(filter, orderBy);
  };

  useEffect(() => {
    return () => handleFiltersRemove.current();
  }, []);
  const ReviewSelectField = width => {
    return (
      <Field
        name="modal"
        icon="SafetyCertificateOutlined"
        component={RenderSelect}
        placeholder={t('adminPanel.filter.field2')}
        defaultValue={MODAL[0].value}
        onChange={e => onModalNameChange(e)}
        label={t('adminPanel.filter.field2')}
        style={{ width: '100px' }}
        value={modalName}
        inFilter={true}
        selectStyle={{ width: width }}
      >
        {MODAL.map((m, i) => (
          <Option key={i} value={m.value}>
            {m.label}
          </Option>
        ))}
      </Field>
    );
  };
  return (
    <Form>
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row>
            <Col lg={16} xs={24} sm={24} md={14}>
              <Row gutter={24}>
                <Col xs={24} md={24} sm={14} lg={16}>
                  <FormItem
                    label={
                      <Space align="center">
                        <Icon type="UserOutlined" />
                        {t('adminPanel.filter.field1')}
                      </Space>
                    }
                    style={{ width: '100%' }}
                  >
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
                  <Field
                    name="isActive"
                    icon={'CheckCircleOutlined'}
                    component={RenderCheckBox}
                    type="checkbox"
                    onChange={() => onIsActiveChange(!isActive)}
                    label={t('adminPanel.filter.field3')}
                    inFilter={true}
                    checked={isActive}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={8} xs={24} sm={24} md={10}>
              <Row>
                <Col lg={0} md={0} xs={24}>
                  {ReviewSelectField('100%')}
                </Col>
                <Col xs={0} md={24} lg={24}>
                  <Row type="flex" justify="end">
                    {ReviewSelectField('170px')}
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

ReviewsFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onModalNameChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('review')(ReviewsFilterView);
