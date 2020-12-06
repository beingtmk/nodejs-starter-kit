import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, FormItem, Option, Label, Input, Row, Col, RenderSelect } from '@gqlapp/look-client-react';
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
    <Form layout="inline">
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row>
            <Col lg={16} xs={24} sm={24} md={14}>
              <Row gutter={24}>
                <Col xs={24} md={24} sm={14} lg={16}>
                  <FormItem label={t('dynamicCarousel.filter.search')} style={{ width: '100%' }}>
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
                  <FormItem>
                    <Label>
                      <Input
                        type="checkbox"
                        defaultChecked={isActive}
                        onChange={e => onIsActiveChange(e.target.checked)}
                      />
                      &nbsp; {t('dynamicCarousel.filter.isActive')}
                    </Label>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col lg={8} xs={24} sm={24} md={10}>
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
    </Form>
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
