import React from 'react';
import { Statistic } from 'antd';

const symbols = {
  INR: <>&#8377;</>,
  USD: '$',
  GBP: <>&#163;</>,
  AUD: '$',
  EUR: <>&#8364;</>,
  RUB: <>&#8381;</>
};

const currencyDisplayComponent = props => {
  const { value, input, valueStyle, currency, style } = props;

  const displayAmount = input * 1;
  const currentCurrency = symbols['INR'];
  return (
    <Statistic
      style={style}
      title=""
      precision={2}
      valueStyle={valueStyle}
      value={displayAmount}
      prefix={currentCurrency}
      suffix={'/-'}
      style={{ display: 'inline' }}
    />
  );
};

export default currencyDisplayComponent;
