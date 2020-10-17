import React from 'react';
import { Row, Col, Form, Button, Icon, Tooltip } from 'antd';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';
// import * as Yup from 'yup';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField } from '@gqlapp/look-client-react';

import ROUTES from '../routes';

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
        label={`Quantity (<=${max}) `}
        value={values.quantity}
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
              <Row type="flex" gutter={24}>
                <Col xs={0} md={0} lg={12}>
                  <Button
                    size="large"
                    block
                    onClick={handleSubmit}
                    disabled={loading || disabled}
                    type="primary"
                    ghost
                    loading={loading}
                  >
                    <Icon type="shopping" />
                    ADD TO CART
                  </Button>
                </Col>
                <Col xs={0} md={0} lg={12}>
                  <Button type="primary" block size="large" onClick={() => onSubmit(values, true)} disabled={disabled}>
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
                  <Button block type="primary" size="large" onClick={() => onSubmit(values, true)} disabled={disabled}>
                    BOOK NOW
                    <Icon type="shopping-cart" />
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row type="flex" gutter={24}>
                <Col xs={0} md={0} lg={12}>
                  <Button size="large" onClick={onDelete} block disabled={disabled} type="danger" ghost>
                    <Icon type="delete" />
                    Remove from CART
                  </Button>
                </Col>
                <Col xs={0} md={0} lg={12}>
                  <a href={`${ROUTES.checkoutCart}`}>
                    <Button type="primary" size="large" block disabled={disabled}>
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
  listingOwned: PropTypes.bool,
  loading: PropTypes.bool,
  showBtn: PropTypes.bool,
  inCart: PropTypes.bool
};

const AddToCartWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      quantity: (props.item && props.item.orderOptions && props.item.orderOptions.quantity) || props.max > 0 ? 1 : 0
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  validate: values => validate(values, AddToCartFormSchema),
  // validationSchema: AddToCartFormSchema,
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
