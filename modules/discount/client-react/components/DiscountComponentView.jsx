import React from 'react';
import PropTypes from 'prop-types';

import { Tag, Icon, Space, Row, Col, Skeleton, Tooltip } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';

import CurrencyDisplay from './CurrencyDisplay';

const DiscountComponent = props => {
  const { loading, cost, isDiscount, discount, modalDiscount, NavitemCart } = props;
  const now = new Date().toISOString();
  const discountDuration = modalDiscount && modalDiscount.discountDuration;
  const startDate = discountDuration && discountDuration.startDate;
  const endDate = discountDuration && discountDuration.endDate;
  return !loading ? (
    <Row>
      <Col span={24}>
        <Row gutter={8}>
          <Col
            span={isDiscount && !NavitemCart ? 17 : 24}
            style={{
              whiteSpace: 'nowrap',
              overflow: NavitemCart ? 'visible' : 'hidden'
            }}
          >
            {!NavitemCart && <Icon type="TagTwoTone" style={{ fontSize: '20px', paddingRight: '5px' }} />}
            {isDiscount
              ? cost && (
                  <Space align="center">
                    <Tooltip title={(cost - cost * (discount / 100)).toFixed(2)}>
                      <div className="ant-card-meta-title">
                        <CurrencyDisplay
                          style={{ display: 'inline' }}
                          precision={0}
                          input={(cost - cost * (discount / 100)).toFixed(2)}
                          valueStyle={{
                            fontSize: NavitemCart ? '17px' : '21px',
                            fontWeight: 'bold',
                            color: NavitemCart ? 'green' : ''
                          }}
                        />
                      </div>
                    </Tooltip>
                    <Tooltip title={cost.toFixed(2)}>
                      <div className="ant-card-meta-title">
                        <span
                          style={{
                            textDecoration: 'line-through',
                            fontSize: NavitemCart ? '12px' : '16px'
                          }}
                        >
                          &#8377; {cost.toFixed(0)}
                        </span>
                      </div>
                    </Tooltip>
                  </Space>
                )
              : cost && (
                  <Space /* align="center" */>
                    <Tooltip title={cost.toFixed(2)}>
                      <div className="ant-card-meta-title">
                        <CurrencyDisplay
                          input={cost.toFixed(2)}
                          precision={0}
                          valueStyle={{
                            fontSize: NavitemCart ? '17px' : '21px',
                            fontWeight: 'bold',
                            color: NavitemCart ? 'green' : ''
                          }}
                        />
                      </div>
                    </Tooltip>
                  </Space>
                )}
          </Col>
          {isDiscount && !NavitemCart && (
            <Col span={7}>
              <Tag color="success" icon={<Icon type="ArrowDownOutlined" />}>
                {discount && discount.toFixed(0) ? discount.toFixed(0) : 0} %
              </Tag>
            </Col>
          )}
        </Row>
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
  NavitemCart: PropTypes.bool,
  cost: PropTypes.number
};

export default translate('discount')(DiscountComponent);
