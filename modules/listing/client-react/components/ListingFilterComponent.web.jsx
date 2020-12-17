import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { SORT_BY } from '@gqlapp/listing-common/SortFilter';
import { translate } from '@gqlapp/i18n-client-react';
import {
  Affix,
  Card,
  Option,
  FormItem,
  Input,
  Row,
  Col,
  Button,
  RenderSelect,
  Icon,
  RenderCheckBox
} from '@gqlapp/look-client-react';
import CategoryTreeComponent from '@gqlapp/category-client-react/containers/CategoryTreeComponent';
import { MODAL } from '@gqlapp/review-common';

import SliderControlled from './FIlterSliderControlledComponent';

const ListingsFilterComponent = props => {
  // console.log('listings filter component', props);
  const {
    filter: { searchText, lowerCost, upperCost, isActive, categoryFilter },
    onIsActiveChange,
    onCategoryChange,
    onSearchTextChange,
    onLowerCostChange,
    onUpperCostChange,
    onFiltersRemove,
    listings,
    showIsActive = false,
    showCategoryFilter = false,
    orderBy,
    onOrderBy,
    t,
    layout
  } = props;
  // console.log(props.filter);
  const handleFiltersRemove = useRef(() => {});

  handleFiltersRemove.current = () => {
    const filter = {
      searchText: '',
      lowerCost: 0,
      upperCost: 0,
      categoryFilter: {
        categoryId: 0,
        allSubCategory: true,
        __typename: 'ListingFilter'
      },
      isActive: true
    };
    const orderBy = { column: '', order: '' };
    onFiltersRemove(filter, orderBy);
  };

  useEffect(() => {
    return () => handleFiltersRemove.current();
  }, []);

  const rangeValues = listings && listings.rangeValues;
  const handleChangeSlider = e => {
    onLowerCostChange(e[0]);
    onUpperCostChange(e[1]);
    // console.log(e);
  };

  // const handleOrderBy = (order, name) => {
  //   return onOrderBy({ column: name, order });
  // };

  const minCostRangeValues = Math.round(rangeValues && rangeValues.minCost);
  const maxCostRangeValues = Math.round(rangeValues && rangeValues.maxCost);
  var costMarks = {
    [`${minCostRangeValues}`]: minCostRangeValues,
    [`${maxCostRangeValues}`]: maxCostRangeValues
  };
  const categoryTreeField = showCategoryFilter && (
    <Field
      component={CategoryTreeComponent}
      filter={{ modalName: MODAL[1].value }}
      // disableParent={true}
      inFilter={true}
      nullable={true}
      onChange={e => onCategoryChange({ categoryId: e, allSubCategory: false })}
      type="number"
      name="categoryId"
      placeholder="category"
      label="Select a category"
      value={categoryFilter.categoryId}
    />
  );

  const listingSortBy = (width, inFilter = true) => {
    const index = SORT_BY.findIndex(x => x.value === orderBy.column && x.sortBy === orderBy.order);
    return (
      <Field
        name="sortBy"
        component={RenderSelect}
        label={t('listingFilter.sortBy')}
        // defaultValue={orderBy.order}
        onChange={e =>
          SORT_BY[e].sortBy === ''
            ? onOrderBy({ order: SORT_BY[e].sortBy, column: '' })
            : onOrderBy({
                order: SORT_BY[e].sortBy,
                column: SORT_BY[e].value
              })
        }
        style={{ width: '100%' }}
        value={index > -1 && SORT_BY[index].label}
        inFilter={inFilter}
        selectStyle={{ width }}
      >
        <Option key={1} value="">
          None
        </Option>
        {SORT_BY.map((sB, i) => (
          <Option key={i + 2} value={i}>
            {sB.label}
          </Option>
        ))}
      </Field>
    );
  };

  const handleResetBtn = (
    <Button block color="primary" onClick={handleFiltersRemove.current}>
      <Icon type={'UndoOutlined'} /> {t('listingFilter.btn.reset')}
    </Button>
  );

  const sliderControlled = inFilter => (
    <SliderControlled
      style={{
        width: '100%',
        background: 'white'
      }}
      label={t('listingFilter.costFilter')}
      max={Math.round(rangeValues && rangeValues.maxCost + 1)}
      min={Math.floor(rangeValues && rangeValues.minCost)}
      marks={costMarks}
      range
      value={[lowerCost, upperCost]}
      // disabled={false}
      inFilter={inFilter}
      handleSliderChange={e => handleChangeSlider(e)}
    />
  );

  const searchField = isFilter => {
    const obj = isFilter
      ? {}
      : {
          labelCol: { span: 24 },
          wrapperCol: { span: 24 }
        };
    return (
      <FormItem label={t('listingFilter.search')} style={{ height: '60px', width: '100%' }} {...obj}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={t('listingFilter.search')}
          element={Input}
          value={searchText}
          onChange={e => onSearchTextChange(e.target.value)}
        />
      </FormItem>
    );
  };

  const activeField = inFilter => (
    <Field
      name="isActive"
      component={RenderCheckBox}
      type="checkbox"
      onChange={() => onIsActiveChange(!isActive)}
      label={t('listingFilter.isActive')}
      inFilter={inFilter}
      checked={isActive}
    />
  );

  const filterItems =
    layout === 'vertical' ? (
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row gutter={24}>
            <Col span={24}>{searchField(false)}</Col>
            <Col span={24}>{showIsActive && activeField(false)}</Col>
            <Col>{categoryTreeField}</Col>
            <Col span={24}>{listingSortBy('100%', false)}</Col>
            <Col span={22}>{sliderControlled(false)}</Col>
            <Col span={24}>
              <br />
              {handleResetBtn}
            </Col>
          </Row>
        </Col>
      </Row>
    ) : (
      <Row type="flex" align="middle">
        <Col span={24} /* style={{ height: '60px' }} */>
          <Row gutter={24}>
            <Col>{searchField(true)}</Col>
            <Col>{showIsActive && activeField(true)}</Col>
          </Row>
        </Col>
        <Col lg={24} xs={24} md={12}>
          <Row type="flex" gutter={24}>
            <Col lg={16} md={16} xs={24}>
              {categoryTreeField}
            </Col>
            <Col lg={8} md={8} xs={24}>
              {listingSortBy('100%')}
            </Col>
          </Row>
        </Col>
        <Col span={24} align="right">
          <Row type="flex" gutter={48}>
            <Col lg={20} md={18} xs={21} align="left">
              {sliderControlled(false)}
            </Col>
            <Col lg={4} md={6} xs={24}>
              <br />
              <FormItem>{handleResetBtn}</FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
    );

  return (
    <Row>
      <Col lg={24} md={24} xs={0}>
        <Affix offsetTop={layout === 'vertical' ? 110 : 43}>
          <Card>{filterItems}</Card>
        </Affix>
      </Col>
      <Col lg={0} md={0} xs={24}>
        <Card>{filterItems}</Card>
      </Col>
    </Row>
  );
};

ListingsFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onLowerCostChange: PropTypes.func.isRequired,
  onUpperCostChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  listings: PropTypes.object.isRequired,
  orderBy: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  showIsActive: PropTypes.bool.isRequired,
  showCategoryFilter: PropTypes.bool.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onOrderBy: PropTypes.func.isRequired,
  t: PropTypes.func,
  layout: PropTypes.string
};

export default translate('listing')(ListingsFilterComponent);
