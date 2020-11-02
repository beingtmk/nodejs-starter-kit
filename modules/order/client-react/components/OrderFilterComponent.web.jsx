import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Input } from '@gqlapp/look-client-react';

const OrderFilterComponent = ({ filter: { searchText, state }, orderStates, onSearchTextChange, onStateChange, t }) => {
  return (
    <Form layout="inline">
      <FormItem label={t('orders.item.search')}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={t('orders.item.search')}
          element={Input}
          value={searchText}
          onChange={e => onSearchTextChange(e.target.value)}
        />
      </FormItem>
      &nbsp;
      {orderStates && orderStates.length !== 0 && (
        <FormItem label={t('orders.item.sortBy')}>
          <Select name="role" defaultValue={state} style={{ width: '100px' }} onChange={e => onStateChange(e)}>
            <Option key={1} value="">
              ALL
            </Option>
            {orderStates.map((oS, i) => (
              <Option key={i + 2} value={oS.state}>
                {oS.state}
              </Option>
            ))}
          </Select>
        </FormItem>
      )}
    </Form>
  );
};
OrderFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  orderStates: PropTypes.array.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('order')(OrderFilterComponent);
