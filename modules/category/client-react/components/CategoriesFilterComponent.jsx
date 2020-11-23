import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Label, Input, Row, Col } from '@gqlapp/look-client-react';

const CategoriesFilterComponent = ({ filter: { searchText, isActive }, onSearchTextChange, onIsActiveChange, t }) => {
  const CategoryIsActiveFiled = (
    <FormItem>
      <Label>
        <Input type="checkbox" defaultChecked={isActive} onChange={e => onIsActiveChange(e.target.checked)} />
        &nbsp; {t('categories.filter.isActive')}
      </Label>
    </FormItem>
  );
  return (
    <Form layout="inline">
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row>
            <Col lg={16} xs={24} md={14} sm={24}>
              <Row gutter={24}>
                <Col>
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
              </Row>
            </Col>
            <Col lg={8} xs={24} md={10} sm={24}>
              <Row>
                <Col lg={0} md={0} xs={24}>
                  {CategoryIsActiveFiled}
                </Col>
                <Col xs={0} md={24} lg={24}>
                  <Row type="flex" justify="middle">
                    {CategoryIsActiveFiled}
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

CategoriesFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default CategoriesFilterComponent;
