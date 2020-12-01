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
  Form,
  FormItem,
  Label,
  Input,
  Row,
  Col,
  Button,
  RenderSelect
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
  console.log(props.filter);
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
  const CategoryTreeField = showCategoryFilter && (
    <Field
      component={CategoryTreeComponent}
      filter={{ modalName: MODAL[1].value }}
      // disableParent={true}
      nullable={true}
      onChange={e => onCategoryChange({ categoryId: e, allSubCategory: false })}
      type="number"
      name="categoryId"
      placeholder="category"
      label="Select a category"
      value={categoryFilter.categoryId}
    />
  );

  const ListingSortBy = width => {
    const index = SORT_BY.findIndex(x => x.value === orderBy.column && x.sortBy === orderBy.order);
    return (
      <Field
        name="sortBy"
        component={RenderSelect}
        // defaultValue={orderBy.order}
        onChange={e =>
          SORT_BY[e].sortBy === ''
            ? onOrderBy({ order: SORT_BY[e].sortBy, column: '' })
            : onOrderBy({
                order: SORT_BY[e].sortBy,
                column: SORT_BY[e].value
              })
        }
        style={{ width: '100px' }}
        value={index > -1 && SORT_BY[index].label}
        inFilter={true}
        selectStyle={{ width: width }}
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
    <Button color="primary" onClick={handleFiltersRemove.current}>
      {t('listingFilter.btn.reset')}
    </Button>
  );

  const filterItems =
    layout === 'vertical' ? (
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row gutter={24}>
            <Col span={24}>
              <FormItem label={t('listingFilter.search')} style={{ width: '100%' }}>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  placeholder={t('listingFilter.search')}
                  element={Input}
                  value={searchText}
                  onChange={e => onSearchTextChange(e.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              {showIsActive && (
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ width: '100%' }}>
                  <Label>
                    <Input
                      type="checkbox"
                      defaultChecked={isActive}
                      checked={isActive}
                      onChange={() => onIsActiveChange(!isActive)}
                    />
                    &nbsp;{t('listingFilter.isActive')}
                  </Label>
                </FormItem>
              )}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col>{CategoryTreeField}</Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <FormItem label={t('listingFilter.sortBy')} style={{ width: '100%' }}>
                {ListingSortBy('100%')}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <div style={{ display: 'block' }}>
                <h5>{t('listingFilter.costFilter')}</h5>
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
                  // disabled={false}
                  handleSliderChange={e => handleChangeSlider(e)}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <br />
              <FormItem>{handleResetBtn}</FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
    ) : (
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row>
            <Col lg={10} xs={24} md={12}>
              <Row gutter={24}>
                <Col>
                  <FormItem label={'search'} style={{ width: '100%' }}>
                    <DebounceInput
                      minLength={2}
                      debounceTimeout={300}
                      placeholder={'search'}
                      element={Input}
                      value={searchText}
                      onChange={e => onSearchTextChange(e.target.value)}
                    />
                  </FormItem>
                </Col>
                <Col>
                  {showIsActive && (
                    <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                      <Label>
                        <Input
                          type="checkbox"
                          defaultChecked={isActive}
                          checked={isActive}
                          onChange={() => onIsActiveChange(!isActive)}
                        />
                        &nbsp;{t('listingFilter.isActive')}
                      </Label>
                    </FormItem>
                  )}
                </Col>
              </Row>
            </Col>
            <Col
              lg={14}
              xs={24}
              md={12}
              // align="right"
            >
              <Row>
                <Col lg={0} md={0} xs={24}>
                  {CategoryTreeField}
                  <FormItem label={t('listingFilter.sortBy')} style={{ width: '100%' }}>
                    {ListingSortBy('100%')}
                  </FormItem>
                </Col>
                <Col xs={0} md={24} lg={24}>
                  <Row type="flex">
                    <Col lg={14} md={12}>
                      {CategoryTreeField}
                    </Col>
                    <Col lg={0} md={2} xs={0}></Col>
                    <Col lg={10} md={10}>
                      <Row type="flex" justify="end">
                        {SORT_BY && SORT_BY.length !== 0 && (
                          <FormItem label={t('listingFilter.sortBy')}>{ListingSortBy('170px')}</FormItem>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} align="right">
          <Row>
            <Col lg={0} md={0} xs={1} />
            <Col lg={20} md={18} xs={21} align="left">
              <div style={{ display: 'block' }}>
                <h5>{t('listingFilter.costFilter')}</h5>
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
                  // disabled={false}
                  handleSliderChange={e => handleChangeSlider(e)}
                />
              </div>
            </Col>
            <Col lg={0} md={2} xs={2} />
            <Col lg={4} md={4} xs={24}>
              <Row>
                <Col lg={0} md={0} xs={24}>
                  <br />
                  {handleResetBtn}
                </Col>
                <Col xs={0} md={24} lg={24}>
                  <br />
                  <FormItem>{handleResetBtn}</FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );

  return (
    <Form
    //  layout="inline"
    >
      <Row>
        <Col lg={24} md={24} xs={0}>
          <Affix offsetTop={110}>
            <Card>{filterItems}</Card>
          </Affix>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <Card>{filterItems}</Card>
        </Col>
      </Row>
    </Form>
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
