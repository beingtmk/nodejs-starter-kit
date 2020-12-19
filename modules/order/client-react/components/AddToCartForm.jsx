import React from 'react';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, RenderField, Row, Col, Button } from '@gqlapp/look-client-react';

import AddToCartFormBtns from './AddToCartFormBtns';

const AddToCartFormSchema = Yup.object().shape({
  quantity: Yup.number().test('quantityValidCheck', 'Invalid quantity.', function(value) {
    const inventoryCount = this.options.from[0].value.inventoryCount;
    if (value === 0) {
      return this.createError({ message: 'Quantity is required' });
    }
    return value > 0 && value <= inventoryCount ? true : false;
  })
});

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
    onDelete,
    t,
    catalogueCard
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
        <div align="right">
          <Row type="flex">
            <Col lg={24} md={24} xs={0}>
              <Button color={'primary'} onClick={handleSubmit}>
                {t('addToCart.form.btn.save')}
              </Button>
            </Col>
            <Col lg={0} md={0} xs={24}>
              <Button block color={'primary'} onClick={handleSubmit}>
                {t('addToCart.form.btn.save')}
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <div align="right">
          <AddToCartFormBtns
            t={t}
            title={
              !currentUser
                ? 'SignIn To Continue'
                : disabled
                ? (max <= 0 && 'Out of Stock') || (listingOwned && 'Listing owned')
                : 'Continue to Booking'
            }
            inCart={inCart}
            onSubmit={handleSubmit}
            onDelete={onDelete}
            onSubmitRedirect={() => onSubmit(values, true)}
            loading={loading}
            catalogueCard={catalogueCard}
            disabled={disabled}
          />
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
  inCart: PropTypes.bool,
  catalogueCard: PropTypes.bool,
  t: PropTypes.func
};

const AddToCartWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      inventoryCount: (props.max && props.max) || 0,
      quantity: (props.item && props.item.orderOptions && props.item.orderOptions.quantity) || (props.max > 0 ? 1 : 0)
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  // validate: values => validate(values, AddToCartFormSchema),
  validationSchema: AddToCartFormSchema,
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
