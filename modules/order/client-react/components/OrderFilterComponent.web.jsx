import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Input } from '@gqlapp/look-client-react';

const OrdersFilterView = ({ filter: { searchText, state }, orderStates, onSearchTextChange, onStateChange, t }) => (
  <Form layout="inline">
    <FormItem label={t('orders.list.item.filter')}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        placeholder={t('orders.list.item.search')}
        element={Input}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
    </FormItem>
    &nbsp;
    {orderStates && orderStates.length !== 0 && (
      <FormItem label={t('orders.list.item.role.label')}>
        <Select name="role" defaultValue={state} style={{ width: '100px' }} onChange={e => onStateChange(e)}>
          <Option key={1} value="">
            {t('orders.list.item.role.all')}
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

OrdersFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  orderStates: PropTypes.array.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(OrdersFilterView);
