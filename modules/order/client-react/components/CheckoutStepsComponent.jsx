import React from 'react';
import { PropTypes } from 'prop-types';

import { Col, Row, Step, Steps } from '@gqlapp/look-client-react';

const CheckoutStepsComponent = props => {
  const { t, step } = props;
  return (
    <Row justify="center">
      <Col span={3} />
      <Col span={18}>
        <Steps current={step} size="small">
          <Step title={t('checkoutSteps.step1')} />
          <Step title={t('checkoutSteps.step2')} />
          <Step title={t('checkoutSteps.step3')} />
        </Steps>
        <br />
      </Col>
      <Col span={3} />
    </Row>
  );
};
CheckoutStepsComponent.propTypes = {
  step: PropTypes.number,
  t: PropTypes.func
};
export default CheckoutStepsComponent;
