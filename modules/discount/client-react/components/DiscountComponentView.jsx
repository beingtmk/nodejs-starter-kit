import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Statistic } from 'antd';

import { Icon, Row, Col } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';

import CurrencyDisplay from './CurrencyDisplay';

const DiscountComponent = props => {
  const { loading, t, cost, isDiscount, discount, modalDiscount } = props;
  const discountDuration = modalDiscount && modalDiscount.discountDuration;
  return !loading ? (
    <Row>
      <Col span={12}>
        {isDiscount
          ? cost && (
              <CurrencyDisplay style={{ display: 'inline' }} input={(cost - cost * (discount / 100)).toFixed(2)} />
            )
          : cost && <CurrencyDisplay input={cost.toFixed(2)} />}
      </Col>
      {isDiscount && (
        <Col span={12}>
          <Statistic
            title=""
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            value={discount && discount.toFixed(2) ? discount.toFixed(2) : 0}
            suffix={'%'}
            prefix={<Icon type="ArrowDownOutlined" />}
          />
        </Col>
      )}
      <Col span={24}>
        {isDiscount && (
          <div style={{ display: 'flex' }}>
            <CurrencyDisplay input={cost.toFixed(2)} valueStyle={{ textDecoration: 'line-through' }} />
            &nbsp; &nbsp;
            <div style={{ lineHeight: '45px', display: 'flex' }}>
              <div style={{ fontSize: '15px' }}>
                <b>{t('discountComponent.savingAmount')} &nbsp;</b>
              </div>
              {(cost.toFixed(2) - (cost - cost * (discount / 100)).toFixed(2)).toFixed(2)}
            </div>
          </div>
        )}
        <i>
          {t('discountComponent.includingGST')}
          <br /> {t('discountComponent.freeShipping')}
          <br /> {t('discountComponent.certified')}
        </i>
      </Col>
      {discountDuration && (
        <Col span={24}>{`Discount expires on ${new Date(discountDuration.endDate).toLocaleString()}`}</Col>
      )}
    </Row>
  ) : (
    <Row>
      <Col span={12}>
        <Skeleton active title={{ width: '75%' }} paragraph={false} />
      </Col>
      <Col span={12}>
        <Skeleton active title={{ width: '75%' }} paragraph={false} />
      </Col>
      <Col span={24}>
        <Skeleton active title={{ width: '75%' }} paragraph={false} />
        <Skeleton active title={{ width: '50%' }} paragraph={false} />
        <Skeleton active title={{ width: '50%' }} paragraph={false} />
        <Skeleton active title={{ width: '50%' }} paragraph={false} />
      </Col>
    </Row>
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
