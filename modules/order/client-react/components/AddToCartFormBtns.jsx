import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col, Tooltip } from 'antd';

import ROUTES from '../routes';

const AddToCartFormBtns = props => {
  const { inCart, onSubmit, loading, disabled, onSubmitRedirect, onDelete, title, catalogueCard = false } = props;
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
              <Icon type="shopping" />
              ADD TO CART
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
              BOOK NOW
              <Icon type="shopping-cart" />
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
              <Icon type="shopping" />
              ADD TO CART
            </Button>
            <Button block type="primary" size="large" onClick={onSubmitRedirect} disabled={disabled}>
              BOOK NOW
              <Icon type="shopping-cart" />
            </Button>
          </Col>
        </Row>
      ) : (
        <Row type="flex" gutter={24}>
          <Col {...customGridLG}>
            <Button size="large" onClick={onDelete} block disabled={disabled} type="danger" ghost>
              <Icon type="delete" />
              Remove from CART
            </Button>
          </Col>
          <Col {...customGridLG}>
            <a href={`${ROUTES.checkoutCart}`}>
              <Button type="primary" size="large" block disabled={disabled}>
                Go to CART
                <Icon type="shopping-cart" />
              </Button>
            </a>
          </Col>
          <Col {...customGridXS}>
            <Button block size="large" onClick={onDelete} disabled={disabled} type="danger" ghost>
              <Icon type="delete" />
              Remove from CART
            </Button>
            <a href={`${ROUTES.checkoutCart}`}>
              <Button block type="primary" size="large" disabled={disabled}>
                Go to CART
                <Icon type="shopping-cart" />
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
  catalogueCard: PropTypes.bool
};

export default AddToCartFormBtns;
