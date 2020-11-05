import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Select, Option, Label, Input, Row, Col } from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';

const DynamicCarouselFilterView = ({
  filter: { searchText, label, isActive },
  onSearchTextChange,
  onLabelChange,
  onIsActiveChange,
  t
}) => (
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
                <FormItem label={t('dynamicCarousel.filter.label')} style={{ width: '100%' }}>
                  <Select name="label" defaultValue={label} style={{ width: '100%' }} onChange={e => onLabelChange(e)}>
                    <Option key={1} value={''}>
                      All
                    </Option>
                    {LABEL &&
                      LABEL.map((l, i) => (
                        <Option key={i + 2} value={l}>
                          {l}
                        </Option>
                      ))}
                  </Select>
                </FormItem>
              </Col>
              <Col xs={0} md={24} lg={24}>
                <Row type="flex" justify="end">
                  <FormItem label={t('dynamicCarousel.filter.label')} style={{ width: '100%' }}>
                    <Select
                      name="label"
                      defaultValue={label}
                      style={{ width: '170px' }}
                      onChange={e => onLabelChange(e)}
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

DynamicCarouselFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default DynamicCarouselFilterView;
