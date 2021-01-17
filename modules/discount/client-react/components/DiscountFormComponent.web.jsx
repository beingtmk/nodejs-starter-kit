import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import moment from 'moment';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import {
  Card,
  SubmitButton,
  Icon,
  Row,
  Col,
  Form,
  RenderDatePicker,
  RenderCheckBox,
  RenderField
} from '@gqlapp/look-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react';
// import { LABEL } from '@gqlapp/home-common';

const DiscountFormSchema = {
  discountPercent: [required]
};

const DiscountFormComponent = props => {
  const { t, values, handleSubmit, setFieldValue, cardTitle } = props;

  function disabledStartDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  }

  function disabledEndDate(current) {
    const startDate = moment(values.startDate ? moment(values.startDate) : moment());
    // Can not select days before today and today
    return current && current < startDate.startOf('day');
  }

  return (
    <Card
      title={
        <>
          <h3>
            <Icon type="SolutionOutlined" />
            &nbsp;
            <strong>{displayDataCheck(cardTitle)}</strong>
          </h3>
          <div align="center">
            <div key="line" className="title-line-wrapper" align="left">
              <div
                className="title-line"
                // style={{ transform: "translateX(-64px)" }}
              />
            </div>
          </div>
        </>
      }
    >
      <Form onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col lg={12} xs={24} align="left">
            <Field
              name="discountPercent"
              icon={'PercentageOutlined'}
              component={RenderField}
              placeholder={t('discountForm.discountPercent')}
              type="number"
              label={t('discountForm.discountPercent')}
              min={0}
              max={100}
              value={values.discountPercent}
            />
          </Col>
          {/* <Col xs={12} lg={24}>
            <Field
            name="finalPrice"
              component={RenderField}
              type="number"
              label={t('discountForm.finalPrice')}
              disabled={true}
              // value={(
                //   values.listingCostArray[0].cost -
                //   values.listingCostArray[0].cost * (values.listingCostArray[0].discount / 100)
                // ).toFixed(2)}
                />
              </Col> */}
          <Col lg={12} xs={24} align="left">
            <Field
              name="isActive"
              component={RenderCheckBox}
              type="checkbox"
              label={t('discountForm.isActive')}
              checked={values.isActive}
            />
          </Col>
          <Col md={8} xs={24} align="left">
            <Field
              name="isTimeStamp"
              component={RenderCheckBox}
              type="checkbox"
              label={t('discountForm.isTimeStamp')}
              checked={values.isTimeStamp}
            />
          </Col>
          <Col md={8} xs={24} align="left">
            {values.isTimeStamp && (
              <Field
                name={'discountDuration.startDate'}
                component={RenderDatePicker}
                // type="range"
                disabledDate={disabledStartDate}
                showTime
                label={t('discountForm.discountDuration.startDate')}
                onChange={e => setFieldValue('startDate', e.toISOString())}
                value={values.startDate ? moment(values.startDate) : moment()}
              />
            )}
          </Col>
          <Col md={8} xs={24} align="left">
            {values.isTimeStamp && (
              <Field
                name={'endDate'}
                component={RenderDatePicker}
                // type="range"
                disabledDate={disabledEndDate}
                showTime
                label={t('discountForm.discountDuration.endDate')}
                onChange={e => setFieldValue('endDate', e.toISOString())}
                value={values.endDate ? moment(values.endDate) : values.startDate ? moment(values.startDate) : moment()}
              />
            )}
          </Col>
          <Col span={24} align="right">
            {/* <br /> */}
            <SubmitButton style={{ width: 'auto' }} type="submit">
              {t('discountForm.btn.submit')}
            </SubmitButton>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

DiscountFormComponent.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  t: PropTypes.func,
  cardTitle: PropTypes.string
};

const DiscountWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.modalDiscount && props.modalDiscount.id) || null,
      discountPercent: (props.modalDiscount && props.modalDiscount.discountPercent) || 0,
      isTimeStamp: props.modalDiscount && props.modalDiscount.discountDuration ? true : false,
      discountDurationId:
        (props.modalDiscount && props.modalDiscount.discountDuration && props.modalDiscount.discountDuration.id) ||
        null,
      startDate:
        (props.modalDiscount &&
          props.modalDiscount.discountDuration &&
          props.modalDiscount.discountDuration.startDate) ||
        null,
      endDate:
        (props.modalDiscount && props.modalDiscount.discountDuration && props.modalDiscount.discountDuration.endDate) ||
        null,
      isActive: props.modalDiscount ? (props.modalDiscount.isActive ? true : false) : true
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    const now = new Date().toISOString();
    const discountInput = {
      id: values.id,
      discountPercent: values.discountPercent,
      discountDuration: {
        id: values.discountDurationId,
        startDate: values.startDate || now,
        endDate: values.endDate || now
      },
      isActive: values.isActive
    };
    onSubmit(discountInput);
  },
  validate: values => validate(values, DiscountFormSchema),
  displayName: 'DiscountForm' // helps with React DevTools
});

export default DiscountWithFormik(DiscountFormComponent);
