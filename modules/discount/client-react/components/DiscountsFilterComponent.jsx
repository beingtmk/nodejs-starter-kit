import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';
import { translate } from '@gqlapp/i18n-client-react';
import {
  RenderCheckBox,
  Icon,
  Space,
  FormItem,
  Option,
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

  const modalSelectField = (width, inFilter) => {
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
        inFilter={inFilter}
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
    <Row>
      <Col lg={18} md={14} xs={24}>
        <Row gutter={24}>
          <Col lg={16} md={12} xs={24}>
            <FormItem
              label={
                <Space align="center">
                  <Icon type="SearchOutlined" />
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
          <Col xs={24} md={12} lg={8}>
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
      <Col lg={6} xs={24} md={10}>
        <Col lg={0} md={0} xs={24}>
          {modalSelectField('100%', false)}
        </Col>
        <Col xs={0} md={24} lg={24}>
          <Row type="flex" justify="end">
            {modalSelectField('170px', true)}
          </Row>
        </Col>
      </Col>
    </Row>
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

export default translate('discount')(ReviewsFilterView);
