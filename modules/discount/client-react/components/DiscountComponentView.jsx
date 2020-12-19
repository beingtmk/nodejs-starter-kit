import React from 'react';
import PropTypes from 'prop-types';

import { Tag, Icon, Space, Row, Col, Skeleton } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';

import CurrencyDisplay from './CurrencyDisplay';

const DiscountComponent = props => {
  const { loading, cost, isDiscount, discount, modalDiscount } = props;
  const now = new Date().toISOString();
  const discountDuration = modalDiscount && modalDiscount.discountDuration;
  const startDate = discountDuration && discountDuration.startDate;
  const endDate = discountDuration && discountDuration.endDate;
  return !loading ? (
    <Row>
      <Col span={24}>
        <Space align="center" size="large">
          {isDiscount
            ? cost && (
                <Space align="center">
                  <CurrencyDisplay
                    style={{ display: 'inline' }}
                    precision={0}
                    input={(cost - cost * (discount / 100)).toFixed(2)}
                    valueStyle={{
                      fontSize: '21px',
                      fontWeight: 'bold'
                    }}
                  />
                  <span
                    style={{
                      textDecoration: 'line-through',
                      fontSize: '17px'
                    }}
                  >
                    &#8377; {cost.toFixed(0)}
                  </span>
                </Space>
              )
            : cost && (
                <CurrencyDisplay
                  input={cost.toFixed(2)}
                  precision={0}
                  valueStyle={{
                    fontSize: '21px',
                    fontWeight: 'bold'
                  }}
                />
              )}
          {isDiscount && (
            <Tag color="success" icon={<Icon type="ArrowDownOutlined" />}>
              {discount && discount.toFixed(2) ? discount.toFixed(2) : 0} &nbsp; %
            </Tag>
          )}
        </Space>
      </Col>
      {discountDuration && (
        <Col span={24}>
          {startDate <= now && endDate >= now ? (
            <h4>
              Deal ends in:{' '}
              {Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)) !== 0
                ? `${Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))} days`
                : Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60)) !== 0
                ? `${Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60))} hours`
                : Math.round((new Date(endDate) - new Date()) / (1000 * 60)) !== 0
                ? `${Math.round((new Date(endDate) - new Date()) / (1000 * 60))} minutes`
                : Math.round((new Date(endDate) - new Date()) / (1000 * 60)) !== 0
                ? `${Math.round((new Date(endDate) - new Date()) / 1000)} seconds`
                : 'Deal has Ended!'}
            </h4>
          ) : (
            startDate >= now &&
            endDate >= now && (
              <h4>
                Deal starts in:
                {Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)) !== 0
                  ? `${Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24))} days`
                  : Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60)) !== 0
                  ? `${Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60))} hours`
                  : Math.round((new Date(startDate) - new Date()) / (1000 * 60)) !== 0
                  ? `${Math.round((new Date(startDate) - new Date()) / (1000 * 60))} minutes`
                  : Math.round((new Date(startDate) - new Date()) / (1000 * 60)) !== 0
                  ? `${Math.round((new Date(startDate) - new Date()) / 1000)} seconds`
                  : 'Deal has Ended!'}
              </h4>
            )
          )}
        </Col>
      )}
    </Row>
  ) : (
    <>
      <Skeleton active title={{ width: '75%' }} paragraph={false} />
    </>
  );
};

DiscountComponent.propTypes = {
  modalDiscount: PropTypes.object,
  loading: PropTypes.bool,
  isDiscount: PropTypes.bool,
  discount: PropTypes.number,
  t: PropTypes.func,
  cost: PropTypes.number
};

export default translate('discount')(DiscountComponent);
