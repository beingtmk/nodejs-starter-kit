import React from 'react';
import { PropTypes } from 'prop-types';

import { Statistic } from '@gqlapp/look-client-react';

const symbols = {
  INR: <>&#8377;</>,
  USD: '$',
  GBP: <>&#163;</>,
  AUD: '$',
  EUR: <>&#8364;</>,
  RUB: <>&#8381;</>
};

const currencyDisplayComponent = props => {
  const { /* value, currency, */ input, valueStyle, style } = props;

  const displayAmount = input * 1;
  const currentCurrency = symbols['INR'];
  return (
    <Statistic
      title=""
      precision={2}
      valueStyle={valueStyle}
      value={displayAmount}
      prefix={currentCurrency}
      suffix={'/-'}
      style={{ ...style, display: 'inline' }}
    />
  );
};
currencyDisplayComponent.propTypes = {
  input: PropTypes.number,
  valueStyle: PropTypes.object,
  currency: PropTypes.number,
  style: PropTypes.object
};
export default currencyDisplayComponent;
