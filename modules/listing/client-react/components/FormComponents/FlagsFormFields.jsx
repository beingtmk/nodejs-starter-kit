import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import {
  NextButton,
  Button,
  Icon,
  Row,
  Col,
  RenderField,
  RenderCheckBox,
  RenderDatePicker
} from '@gqlapp/look-client-react';

const FlagsFormFields = props => {
  const { values, t, setFieldValue, isDiscount, setStep } = props;

  function disabledStartDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  }

  function disabledEndDate(current) {
    const startDate = moment(values.discountDuration.startDate ? moment(values.discountDuration.startDate) : moment());
    // Can not select days before today and today
    return current && current < startDate.startOf('day');
  }

  return (
    <Row gutter={24}>
      <Col md={8} xs={24} align="left">
        <Col xs={12} lg={24}>
          <Field
            name="listingFlags.isFeatured"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isFeatured')}
            checked={values.listingFlags.isFeatured}
          />
        </Col>
        <Col xs={12} lg={24}>
          <Field
            name="listingFlags.isDiscount"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isDiscount')}
            checked={isDiscount}
          />
        </Col>
      </Col>
      <Col md={8} xs={24} align="left">
        <Col xs={12} lg={24}>
          <Field
            name="isActive"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isActive')}
            checked={values.isActive}
          />
        </Col>
        <Col xs={12} lg={24}>
          {isDiscount && (
            <Field
              name="listingCostArray[0].discount"
              component={RenderField}
              placeholder={t('listingForm.discount')}
              type="number"
              label={t('listingForm.discount')}
              min={0}
              max={100}
              value={values.listingCostArray[0].discount}
            />
          )}
        </Col>
      </Col>
      <Col md={8} xs={24} align="left">
        <Col xs={12} lg={24}>
          <Field
            name="listingFlags.isNew"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isNew')}
            checked={values.listingFlags.isNew}
          />
        </Col>
        <Col xs={12} lg={24}>
          {isDiscount && values.listingCostArray[0].discount && (
            <Field
              name="finalPrice"
              component={RenderField}
              type="number"
              label={t('listingForm.finalPrice')}
              disabled={true}
              value={(
                values.listingCostArray[0].cost -
                values.listingCostArray[0].cost * (values.listingCostArray[0].discount / 100)
              ).toFixed(2)}
            />
          )}
        </Col>
      </Col>
      <Col md={8} xs={24} align="left">
        {isDiscount && values.discountDuration && (
          <Field
            name="isTimeStamp"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isTimeStamp')}
            checked={values.isTimeStamp}
          />
        )}
      </Col>
      <Col md={8} xs={24} align="left">
        {values.isTimeStamp && (
          <Field
            name={'discountDuration.startDate'}
            component={RenderDatePicker}
            // type="range"
            disabledDate={disabledStartDate}
            showTime
            label={t('listingForm.discountDuration.startDate')}
            onChange={e => setFieldValue('discountDuration.startDate', e.toISOString())}
            value={values.discountDuration.startDate ? moment(values.discountDuration.startDate) : moment()}
          />
        )}
      </Col>
      <Col md={8} xs={24} align="left">
        {values.isTimeStamp && (
          <Field
            name={'discountDuration.endDate'}
            component={RenderDatePicker}
            // type="range"
            disabledDate={disabledEndDate}
            showTime
            label={t('listingForm.discountDuration.endDate')}
            onChange={e => setFieldValue('discountDuration.endDate', e.toISOString())}
            value={
              values.discountDuration.endDate
                ? moment(values.discountDuration.endDate)
                : values.discountDuration.startDate
                ? moment(values.discountDuration.startDate)
                : moment()
            }
          />
        )}
      </Col>
      <Col span={24} align="right">
        <Row>
          <Col span={12} align="left">
            <br />
            <Button onClick={() => setStep(0)}>
              <Icon type="ArrowLeftOutlined" />
              {t('listingForm.btn.previous')}
            </Button>
          </Col>
          <Col span={12} align="right">
            <br />
            <NextButton style={{ width: 'auto' }} type="submit">
              {t('listingForm.btn.next')}
            </NextButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

FlagsFormFields.propTypes = {
  values: PropTypes.object,
  t: PropTypes.func,
  setFieldValue: PropTypes.func,
  isDiscount: PropTypes.bool,
  setStep: PropTypes.func
};

export default FlagsFormFields;
