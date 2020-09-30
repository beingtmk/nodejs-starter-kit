import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';

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
      <Select name="role" defaultValue={label} style={{ width: '100px' }} onChange={e => onLabelChange(e.target.value)}>
        <Option key={1} value="">
          {t('dynamicCarousel.list.item.role.all')}
        </Option>
        <Option key={2} value="user">
          {t('dynamicCarousel.list.item.role.user')}
        </Option>
        <Option key={3} value="admin">
          {t('dynamicCarousel.list.item.role.admin')}
        </Option>
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
