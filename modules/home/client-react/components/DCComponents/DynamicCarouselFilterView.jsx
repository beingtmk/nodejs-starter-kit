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
    <Row type="flex">
      <Col>
        <FormItem label={t('dynamicCarousel.filter.search')}>
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
      <Col>
        <FormItem label={t('dynamicCarousel.filter.label')}>
          <Select name="label" defaultValue={label} style={{ width: '100px' }} onChange={e => onLabelChange(e)}>
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
      <Col>
        <FormItem>
          <Label>
            <Input type="checkbox" defaultChecked={isActive} onChange={e => onIsActiveChange(e.target.checked)} />
            &nbsp; {t('dynamicCarousel.filter.isActive')}
          </Label>
        </FormItem>
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
