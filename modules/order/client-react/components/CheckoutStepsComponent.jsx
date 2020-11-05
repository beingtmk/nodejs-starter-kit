import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { Heading, Col, Row, Step, Steps } from '@gqlapp/look-client-react';

const CheckoutSteps = styled.div`
  text-align: center;
  text-shadow: 1px 0 0;
  font-size: 30px;
  margin-bottom: 19px;
`;

// const Step = Steps.Step;

const CheckoutStepsComponent = props => {
  const { t, step } = props;
  return (
    <Row justify="center">
      <Col span={24}>
        <Row justify="center">
          <CheckoutSteps>
            <Heading type="3" align="center">
              {t('checkoutSteps.heading')}
            </Heading>
          </CheckoutSteps>
        </Row>
      </Col>
      <Col span={3} />
      <Col span={18}>
        <Steps current={step} size="small">
          <Step title={t('checkoutSteps.step1')} />
          <Step title={t('checkoutSteps.step2')} />
          <Step title={t('checkoutSteps.step3')} />
        </Steps>
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
