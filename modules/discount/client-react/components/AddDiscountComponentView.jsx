import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Row, Col, RenderCheckBox, RenderDatePicker } from '@gqlapp/look-client-react';

const AddDiscountComponentView = props => {
  const { setFieldValue, values, t } = props;
  return (
    <Row gutter={24}>
      <Col md={8} xs={24} align="left">
        {values.listingFlags.isDiscount && (
          <Field
            name="isTimeStamp"
            component={RenderCheckBox}
            type="checkbox"
            label={t('discountForm.isTimeStamp')}
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
            showTime
            label={t('discountForm.discountDuration.startDate')}
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
            showTime
            label={t('discountForm.discountDuration.endDate')}
            onChange={e => setFieldValue('discountDuration.endDate', e.toISOString())}
            value={values.discountDuration.endDate ? moment(values.discountDuration.endDate) : moment()}
          />
        )}
      </Col>
    </Row>
  );
};

AddDiscountComponentView.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  t: PropTypes.func
};

export default AddDiscountComponentView;
