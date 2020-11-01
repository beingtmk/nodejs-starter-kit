import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Tooltip } from 'antd';
import { translate } from '@gqlapp/i18n-client-react';

import { Icon, Row, Col } from '@gqlapp/look-client-react';

import ROUTES from '../routes';

const AddToCartFormBtns = props => {
  const { t, inCart, onSubmit, loading, disabled, onSubmitRedirect, onDelete, title, catalogueCard = false } = props;
  const customGridLG = !catalogueCard
    ? {
        xs: 0,
        md: 0,
        lg: 12
      }
    : {
        xs: 0,
        md: 0,
        lg: 24
      };

  const customGridXS = {
    xs: 24,
    md: 24,
    lg: 0
  };
  // console.log(props);
  return (
    <Tooltip title={title}>
      {inCart ? (
        <Row type="flex" gutter={24}>
          <Col {...customGridLG}>
            <Button
              size="large"
              block
              onClick={onSubmit}
              disabled={loading || disabled}
              type="primary"
              ghost
              loading={loading}
            >
              <Icon type="ShoppingOutlined" />
              {t('addToCart.form.btn.add')}
            </Button>
          </Col>
          <Col {...customGridLG}>
            <Button
              type="primary"
              block
              size="large"
              onClick={onSubmitRedirect}
              disabled={loading || disabled}
              loading={loading}
            >
              <Icon type="ShoppingCartOutlined" />
              {t('addToCart.form.btn.book')}
            </Button>
          </Col>
          <Col {...customGridXS}>
            <Button
              block
              size="large"
              onClick={onSubmit}
              disabled={loading || disabled}
              type="primary"
              ghost
              loading={loading}
            >
              <Icon type="ShoppingOutlined" />
              {t('addToCart.form.btn.add')}
            </Button>
            <Button block type="primary" size="large" onClick={onSubmitRedirect} disabled={disabled}>
              <Icon type="ShoppingCartOutlined" />
              {t('addToCart.form.btn.book')}
            </Button>
          </Col>
        </Row>
      ) : (
        <Row type="flex" gutter={24}>
          {onDelete && (
            <Col {...customGridLG}>
              <Button size="large" onClick={onDelete} block disabled={disabled} type="danger" ghost>
                <Icon type="DeleteOutlined" />
                {t('addToCart.form.btn.remove')}
              </Button>
            </Col>
          )}
          <Col {...customGridLG}>
            <a href={`${ROUTES.checkoutCart}`}>
              <Button type="primary" size="large" block disabled={disabled}>
                {t('addToCart.form.btn.go')}
                <Icon type="ShoppingCartOutlined" />
              </Button>
            </a>
          </Col>
          <Col {...customGridXS}>
            {onDelete && (
              <Button block size="large" onClick={onDelete} disabled={disabled} type="danger" ghost>
                <Icon type="DeleteOutlined" />
                {t('addToCart.form.btn.remove')}
              </Button>
            )}
            <a href={`${ROUTES.checkoutCart}`}>
              <Button block type="primary" size="large" disabled={disabled}>
                {t('addToCart.form.btn.go')}
                <Icon type="ShoppingCartOutlined" />
              </Button>
            </a>
          </Col>
        </Row>
      )}
    </Tooltip>
  );
};

AddToCartFormBtns.propTypes = {
  inCart: PropTypes.bool,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onSubmitRedirect: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string,
  catalogueCard: PropTypes.bool,
  t: PropTypes.func
};

export default translate('order')(AddToCartFormBtns);
