import React from 'react';
import PropTypes from 'prop-types';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { NextButton, Button, Icon, Row, Col, RenderCheckBox } from '@gqlapp/look-client-react';

const FlagsFormFields = props => {
  const { values, t, setStep } = props;

  return (
    <Row gutter={24}>
      <Col md={8} xs={24} align="left">
        <Col xs={12} lg={24}>
          <Field
            icon="CrownOutlined"
            name="listingFlags.isFeatured"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isFeatured')}
            checked={values.listingFlags.isFeatured}
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
      </Col>
      <Col md={8} xs={24} align="left">
        <Col xs={12} lg={24}>
          <Field
            name="listingFlags.isNew"
            icon="TagOutlined"
            component={RenderCheckBox}
            type="checkbox"
            label={t('listingForm.isNew')}
            checked={values.listingFlags.isNew}
          />
        </Col>
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
  setStep: PropTypes.func
};

export default FlagsFormFields;
