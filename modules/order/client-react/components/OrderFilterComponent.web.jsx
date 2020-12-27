import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Space, Icon, FormItem, Option, Input, Col, Row, RenderSelect } from '@gqlapp/look-client-react';

const OrderFilterComponent = props => {
  const {
    filter: { searchText, state },
    orderStates,
    onSearchTextChange,
    onStateChange,
    t,
    onFiltersRemove
  } = props;
  const handleFiltersRemove = useRef(() => {});

  handleFiltersRemove.current = () => {
    const filter = {
      searchText: ''
    };
    const orderBy = { column: '', order: '' };
    onFiltersRemove(filter, orderBy);
  };

  useEffect(() => {
    return () => handleFiltersRemove.current();
  }, []);
  const OrderSortByField = width => {
    return (
      <Field
        name="modalName"
        icon={'FilterOutlined'}
        component={RenderSelect}
        placeholder={t('orders.item.sortBy')}
        defaultValue={state}
        onChange={e => onStateChange(e)}
        label={t('orders.item.sortBy')}
        style={{ width: '100px' }}
        value={state}
        inFilter={true}
        selectStyle={{ width: width }}
      >
        <Option key={1} value="">
          ALL
        </Option>
        {orderStates.map((oS, i) => (
          <Option key={i + 2} value={oS.state}>
            {oS.state}
          </Option>
        ))}
      </Field>
    );
  };
  return (
    <Row type="flex" align="middle">
      <Col span={24}>
        <Row>
          <Col lg={16} xs={24} md={14}>
            <Row gutter={24}>
              <Col>
                <FormItem
                  label={
                    <Space align="center">
                      <Icon type="SearchOutlined" />
                      {t('orders.item.search')}
                    </Space>
                  }
                  style={{ width: '100%' }}
                >
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    placeholder={t('orders.item.search')}
                    element={Input}
                    value={searchText}
                    onChange={e => onSearchTextChange(e.target.value)}
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col lg={8} xs={24} md={10}>
            <Row>
              <Col lg={0} md={0} xs={24}>
                {orderStates && orderStates.length !== 0 && <>{OrderSortByField('100%')}</>}
              </Col>
              <Col xs={0} md={24} lg={24}>
                <Row type="flex" justify="end">
                  {orderStates && orderStates.length !== 0 && <>{OrderSortByField('170px')}</>}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
OrderFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  orderStates: PropTypes.array.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('order')(OrderFilterComponent);
