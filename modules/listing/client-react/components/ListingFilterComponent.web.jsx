import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Row, Col, Button } from 'antd';

import { SORT_BY } from '@gqlapp/listing-common/SortFilter';
import { translate } from '@gqlapp/i18n-client-react';
import { Select, Option, Form, FormItem, Label, Input } from '@gqlapp/look-client-react';

import SliderControlled from './FIlterSliderControlledComponent';

const ListingsFilterComponent = props => {
  // console.log('listings filter component', props);
  const {
    filter: { searchText, lowerCost, upperCost, isActive },
    onIsActiveChange,
    onSearchTextChange,
    onLowerCostChange,
    onUpperCostChange,
    onFiltersRemove,
    listings,
    showIsActive = false,
    orderBy,
    onOrderBy
  } = props;
  const rangeValues = listings && listings.rangeValues;
  const handleChangeSlider = e => {
    onLowerCostChange(e[0]);
    onUpperCostChange(e[1]);
    console.log(e);
  };

  // const handleOrderBy = (order, name) => {
  //   return onOrderBy({ column: name, order });
  // };

  const handleFiltersRemove = () => {
    const filter = {
      searchText: '',
      lowerCost: 0,
      upperCost: 0,
      isActive: true
    };
    const orderBy = { column: '', order: '' };
    onFiltersRemove(filter, orderBy);
  };

  const minCostRangeValues = Math.round(rangeValues && rangeValues.minCost);
  const maxCostRangeValues = Math.round(rangeValues && rangeValues.maxCost);
  var costMarks = {
    [`${minCostRangeValues}`]: minCostRangeValues,
    [`${maxCostRangeValues}`]: maxCostRangeValues
  };
  return (
    <>
      <Form layout="inline">
        <Row type="flex" align="middle">
          <Col span={24}>
            <Col span={16}>
              <FormItem label={'search'}>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  placeholder={'search'}
                  element={Input}
                  value={searchText}
                  onChange={e => onSearchTextChange(e.target.value)}
                />
              </FormItem>
              &nbsp;
              {showIsActive && (
                <FormItem>
                  <Label>
                    <Input
                      type="checkbox"
                      defaultChecked={isActive}
                      checked={isActive}
                      onChange={() => onIsActiveChange(!isActive)}
                    />
                    &nbsp;Is Active
                  </Label>
                </FormItem>
              )}
            </Col>
            <Col span={8} align="right">
              {SORT_BY && SORT_BY.length !== 0 && (
                <FormItem label={'Sort By'}>
                  <Select
                    name="sortBy"
                    defaultValue={orderBy.order}
                    style={{ width: '170px' }}
                    onChange={e =>
                      SORT_BY[e].sortBy === ''
                        ? onOrderBy({ order: SORT_BY[e].sortBy, column: '' })
                        : onOrderBy({ order: SORT_BY[e].sortBy, column: SORT_BY[e].value })
                    }
                  >
                    <Option key={1} value="">
                      None
                    </Option>
                    {SORT_BY.map((sB, i) => (
                      <Option key={i + 2} value={i}>
                        {sB.label}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              )}
            </Col>
          </Col>
          <Col span={24} align="right">
            <Col span={20}>
              <div style={{ display: 'block' }}>
                <h5 style={{ fontSize: '' }}>Cost Filter</h5>
                <SliderControlled
                  style={{
                    width: '100%',
                    background: 'white'
                  }}
                  max={Math.round(rangeValues && rangeValues.maxCost + 1)}
                  min={Math.floor(rangeValues && rangeValues.minCost)}
                  marks={costMarks}
                  range
                  value={[lowerCost, upperCost]}
                  // value={[lowerCost, upperCost]}
                  // disabled={false}
                  handleSliderChange={e => handleChangeSlider(e)}
                />
              </div>
            </Col>
            <Col span={4}>
              <br />
              <FormItem>
                <Button type="primary" onClick={handleFiltersRemove}>
                  Reset Filters
                </Button>
              </FormItem>
            </Col>
          </Col>
        </Row>
      </Form>
    </>
  );
};

ListingsFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onLowerCostChange: PropTypes.func.isRequired,
  onUpperCostChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  listings: PropTypes.object.isRequired,
  orderBy: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  showIsActive: PropTypes.bool.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onOrderBy: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('listing')(ListingsFilterComponent);
