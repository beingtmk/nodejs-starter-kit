import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import {
  Space,
  Icon,
  FormItem,
  Option,
  RenderCheckBox,
  Input,
  Row,
  Col,
  RenderSelect
} from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';

const DynamicCarouselFilterView = props => {
  const {
    filter: { searchText, label, isActive } = {},
    onSearchTextChange,
    onLabelChange,
    onIsActiveChange,
    onFiltersRemove,
    t
  } = props;
  const handleFiltersRemove = useRef(() => {});

  handleFiltersRemove.current = () => {
    const filter = {
      searchText: '',
      label: '',
      isActive: true
    };
    const orderBy = { column: '', order: '' };
    onFiltersRemove(filter, orderBy);
  };

  useEffect(() => {
    return () => handleFiltersRemove.current();
  }, []);
  const CarouselLabelField = width => {
    return (
      <Field
        name="label"
        icon="FlagOutlined"
        component={RenderSelect}
        placeholder={t('dynamicCarousel.filter.label')}
        defaultValue={label}
        onChange={e => onLabelChange(e)}
        label={t('dynamicCarousel.filter.label')}
        style={{ width: '100px' }}
        value={label}
        inFilter={true}
        selectStyle={{ width: width }}
      >
        <Option key={1} value={''}>
          All
        </Option>
        {LABEL &&
          LABEL.map((l, i) => (
            <Option key={i + 2} value={l}>
              {l}
            </Option>
          ))}
      </Field>
    );
  };
  return (
    <Row type="flex" align="middle">
      <Col span={24}>
        <Row>
          <Col lg={18} xs={24} sm={24} md={14}>
            <Row gutter={24}>
              <Col xs={24} md={24} sm={14} lg={16}>
                <FormItem
                  label={
                    <Space align="center">
                      <Icon type="SearchOutlined" />
                      {t('dynamicCarousel.filter.search')}
                    </Space>
                  }
                  style={{ width: '100%' }}
                >
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    placeholder={t('dynamicCarousel.filter.search')}
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
                  label={t('dynamicCarousel.filter.isActive')}
                  inFilter={true}
                  checked={isActive}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6} xs={24} sm={24} md={10}>
            <Row>
              <Col lg={0} md={0} xs={24}>
                {CarouselLabelField('100%')}
              </Col>
              <Col xs={0} md={24} lg={24}>
                <Row type="flex" justify="end">
                  {CarouselLabelField('170px')}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
DynamicCarouselFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default DynamicCarouselFilterView;
