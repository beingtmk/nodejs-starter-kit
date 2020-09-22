import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Divider, Button } from 'antd';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Label, Input } from '@gqlapp/look-client-react';
import SliderControlled from './FIlterSliderControlledComponent';

const ListingsFilterComponent = props => {
  console.log('listings filter component', props);
  const {
    filter: { searchText, lowerCost, upperCost, isActive },
    onIsActiveChange,
    onSearchTextChange,
    onLowerCostChange,
    onUpperCostChange,
    onFiltersRemove,
    listings
  } = props;
  const rangeValues = listings && listings.rangeValues;
  const handleChangeSlider = e => {
    onLowerCostChange(e[0]);
    onUpperCostChange(e[1]);
    console.log(e);
  };

  const handleFiltersRemove = () => {
    const filter = {
      searchText: '',
      lowerCost: 0,
      upperCost: 0,
      isActive: true
    };
    onFiltersRemove(filter);
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
        <FormItem>
          <Button type="primary" onClick={handleFiltersRemove}>
            Reset Filters
          </Button>
        </FormItem>
        <br />
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
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(ListingsFilterComponent);
