import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Label, Input, Row, Col } from '@gqlapp/look-client-react';

const CategoriesFilterComponent = ({ filter: { searchText, isActive }, onSearchTextChange, onIsActiveChange, t }) => (
  <Form layout="inline">
    <Row type="flex" align="middle">
      <Col span={24}>
        <Row>
          <Col lg={16} xs={24} sm={24} md={14}>
            <Row gutter={24}>
              <Col xs={24} md={24} sm={14} lg={16}>
                <FormItem label={t('categories.filter.search')} style={{ width: '100%' }}>
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    placeholder={t('categories.filter.search')}
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
                    &nbsp; {t('categories.filter.isActive')}
                  </Label>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Form>
);

CategoriesFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default CategoriesFilterComponent;
