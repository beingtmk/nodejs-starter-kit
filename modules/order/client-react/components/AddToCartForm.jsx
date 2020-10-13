import React from 'react';
import { Row, Col, Form, Button, Icon, Tooltip } from 'antd';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField } from '@gqlapp/look-client-react';

import ROUTES from '../routes';

const ButtonGroup = Button.Group;
const AddToCartFormSchema = {
  quantity: [required]
};

const AddToCartForm = props => {
  const {
    values,
    handleSubmit,
    currentUser,
    onSubmit,
    max,
    fixedQuantity,
    listingOwned,
    showBtn = true,
    inCart = true,
    loading,
    onDelete
  } = props;
  const disabled = max <= 0 || listingOwned || !currentUser;

  // console.log('props', props);
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="quantity"
        component={RenderField}
        placeholder="Quantity"
        type="number"
        label="Quantity"
        value={values.quantity}
        disabled={fixedQuantity !== -1}
        min={0}
        max={max}
      />
      {!showBtn ? (
        <Button type={'primary'} onClick={handleSubmit}>
          Save
        </Button>
      ) : (
        <div align="right">
          <Tooltip
            title={
              !currentUser
                ? 'SignIn To Continue'
                : disabled
                ? (max <= 0 && 'Out of Stock') || (listingOwned && 'Listing owned')
                : 'Continue to Booking'
            }
          >
            {inCart ? (
              <ButtonGroup>
                <Row type="flex">
                  <Col xs={0} md={0} lg={24}>
                    <Button
                      size="large"
                      onClick={handleSubmit}
                      disabled={loading || disabled}
                      type="primary"
                      ghost
                      loading={loading}
                    >
                      <Icon type="shopping" />
                      ADD TO CART
                    </Button>
                    <Button type="primary" size="large" onClick={() => onSubmit(values, true)} disabled={disabled}>
                      BOOK NOW
                      <Icon type="shopping-cart" />
                    </Button>
                  </Col>
                  <Col xs={24} md={24} lg={0}>
                    <Button
                      block
                      size="large"
                      onClick={handleSubmit}
                      disabled={loading || disabled}
                      type="primary"
                      ghost
                      loading={loading}
                    >
                      <Icon type="shopping" />
                      ADD TO CART
                    </Button>
                    <Button
                      block
                      type="primary"
                      size="large"
                      onClick={() => onSubmit(values, true)}
                      disabled={disabled}
                    >
                      BOOK NOW
                      <Icon type="shopping-cart" />
                    </Button>
                  </Col>
                </Row>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Row type="flex">
                  <Col xs={0} md={0} lg={24}>
                    <Button size="large" onClick={onDelete} disabled={disabled} type="danger" ghost>
                      <Icon type="delete" />
                      Remove from CART
                    </Button>
                    <a href={`${ROUTES.checkoutCart}`}>
                      <Button type="primary" size="large" disabled={disabled}>
                        Go to CART
                        <Icon type="shopping-cart" />
                      </Button>
                    </a>
                  </Col>
                  <Col xs={24} md={24} lg={0}>
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
              </ButtonGroup>
            )}
          </Tooltip>
        </div>
      )}
    </Form>
  );
};

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  currentUser: PropTypes.object,
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  max: PropTypes.number,
  fixedQuantity: PropTypes.number,
  listingOwned: PropTypes.bool,
  loading: PropTypes.bool,
  showBtn: PropTypes.bool,
  inCart: PropTypes.bool
};

const AddToCartWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      quantity:
        (props.item && props.item.orderOptions && props.item.orderOptions.quantity) || props.max > 0
          ? props.fixedQuantity === -1
            ? 1
            : props.fixedQuantity
          : 0
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  validate: values => validate(values, AddToCartFormSchema),
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
