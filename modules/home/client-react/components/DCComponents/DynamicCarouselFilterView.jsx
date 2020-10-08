import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';

const DynamicCarouselFilterView = ({
  filter: { searchText, label, isActive },
  onSearchTextChange,
  onLabelChange,
  onIsActiveChange,
  t
}) => (
  <Form layout="inline">
    <FormItem label={'Search text'}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        placeholder={'Search text'}
        element={Input}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
    </FormItem>
    &nbsp;
    <FormItem label={'Label'}>
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
    &nbsp;
    <FormItem>
      <Label>
        <Input type="checkbox" defaultChecked={isActive} onChange={e => onIsActiveChange(e.target.checked)} />
        &nbsp; {'Is active'}
      </Label>
    </FormItem>
  </Form>
);

DynamicCarouselFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(DynamicCarouselFilterView);
