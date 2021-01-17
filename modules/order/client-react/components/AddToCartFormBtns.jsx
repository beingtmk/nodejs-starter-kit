import React from 'react';
import { PropTypes } from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Icon, Row, Col, Button, Tooltip } from '@gqlapp/look-client-react';

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
        <Row type="flex" gutter={[24, 4]}>
          <Col {...customGridLG}>
            <Button
              color="primary"
              block
              size="lg"
              onClick={onSubmitRedirect}
              disabled={loading || disabled}
              loading={loading}
            >
              <Icon type="ShoppingOutlined" />
              {t('addToCart.form.btn.book')}
            </Button>
          </Col>
          <Col {...customGridXS}>
            <Button block size="lg" onClick={onSubmit} disabled={loading || disabled} loading={loading}>
              <Icon type="PlusCircleOutlined" />
              {t('addToCart.form.btn.add')}
            </Button>
            <Button block color="primary" size="lg" onClick={onSubmitRedirect} disabled={disabled}>
              <Icon type="ShoppingOutlined" />
              {t('addToCart.form.btn.book')}
            </Button>
          </Col>
          <Col {...customGridLG}>
            <Button size="lg" block onClick={onSubmit} disabled={loading || disabled} loading={loading}>
              <Icon type="PlusCircleOutlined" />
              {t('addToCart.form.btn.add')}
            </Button>
          </Col>
        </Row>
      ) : (
        <Row type="flex" gutter={[24, 4]}>
          <Col {...customGridLG}>
            <a href={`${ROUTES.checkoutCart}`}>
              <Button color="primary" size="lg" block disabled={disabled}>
                <Icon type="ShoppingOutlined" />
                {t('addToCart.form.btn.go')}
              </Button>
            </a>
          </Col>
          {onDelete && (
            <Col {...customGridLG}>
              <Button size="lg" onClick={onDelete} block disabled={disabled} danger ghost>
                <Icon type="DeleteOutlined" />
                {t('addToCart.form.btn.remove')}
              </Button>
            </Col>
          )}
          <Col {...customGridXS}>
            <a href={`${ROUTES.checkoutCart}`}>
              <Button block color="primary" size="lg" disabled={disabled}>
                {t('addToCart.form.btn.go')}
                <Icon type="ShoppingOutlined" />
              </Button>
            </a>
            {onDelete && (
              <Button block size="lg" onClick={onDelete} disabled={disabled} danger ghost>
                <Icon type="DeleteOutlined" />
                {t('addToCart.form.btn.remove')}
              </Button>
            )}
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
