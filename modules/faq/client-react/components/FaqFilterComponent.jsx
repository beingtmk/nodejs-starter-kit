import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Input } from '@gqlapp/look-client-react';
// import { GEARCATEGORY, GEARSUBSUBCATEGORY, GEARSUBCATEGORY } from '../constants/GearDetails';

const FaqFilterComponent = props => {
  const {
    filter: { searchText, isFeatured },
    orderBy,
    onSearchTextChange,
    onIsFeaturedChange,

  } = props;


  return (
    <Form layout="inline">
      <FormItem label="Filter">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder="Search"
          element={Input}
          value={searchText}
          onChange={e => onSearchTextChange(e.target.value)}
        />
      </FormItem>
      &nbsp;
      {/* <FormItem label="eventCategory">
        <Select
          name="eventCategory"
          defaultValue={eventCategory}
          onChange={value => {
            onFaqCategoryChange(value);
          }}
        style={{ width: '100px' }}
        >
          <Option key={'all'} value={''}>
            All
          </Option>
          <Option key={eventCategories.SEMINAR} value={eventCategories.SEMINAR}>
            {eventCategories.SEMINAR}
          </Option>
          <Option key={eventCategories.WORKSHOP} value={eventCategories.WORKSHOP}>
            {eventCategories.WORKSHOP}
          </Option>
          <Option key={eventCategories.CONTEST} value={eventCategories.CONTEST}>
            {eventCategories.CONTEST}
          </Option>
        </Select>
      </FormItem> */}
    </Form>
  );
};

FaqFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onFaqCategoryChange: PropTypes.func.isRequired
};

export default translate('events')(FaqFilterComponent);
