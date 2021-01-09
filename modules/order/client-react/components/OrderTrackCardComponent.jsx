import React from 'react';
import PropTypes from 'prop-types';

import { ORDER_STATES } from '@gqlapp/order-common';
import { Icon, Steps, Card, Step } from '@gqlapp/look-client-react';

const OrderTrackCardComponent = props => {
  const { t, orderStatus } = props;

  function getStep() {
    const status = orderStatus;
    if (status === ORDER_STATES.STALE) {
      return 0;
    } else if (status === ORDER_STATES.COMPLETED) {
      return 6;
    }
  }
  function IconCheck(val) {
    // console.log(val, getStep());
    var state = getStep();
    if (state >= 0) {
      if (val <= getStep() && getStep() !== 0) return <Icon type="CheckCircleFilled" />;
      else return <Icon type="ClockCircleOutlined" style={{ color: '#FFCC99' }} />;
    } else if (state < 0) {
      state = state * -1;
      if (val <= getStep() && getStep() !== 0) return <Icon type="CheckCircleFilled" />;
      else return <Icon type="ClockCircleOutlined" style={{ color: '#FFCC99' }} />;
    }
  }

  const stepsText = [
    { id: 0, text: t('orderDetails.status.step1') },
    { id: 1, text: t('orderDetails.status.step2') },
    { id: 2, text: t('orderDetails.status.step3') },
    { id: 3, text: t('orderDetails.status.step4') }
  ];

  return (
    <Card>
      <h3>{t('orderDetails.status.title')}</h3>
      <br />
      <hr />
      <br />
      <Steps direction="vertical" size="small" current={getStep() < 0 ? getStep() * -1 : getStep()}>
        {stepsText.map((item, key) => (
          <Step
            title={
              <p>
                {item.text}
                <strong className="rightfloat"> {item.date}</strong>
              </p>
            }
            icon={IconCheck(key)}
          />
        ))}
      </Steps>
    </Card>
  );
};
OrderTrackCardComponent.propTypes = {
  t: PropTypes.func,
  orderStatus: PropTypes.string
};

export default OrderTrackCardComponent;
