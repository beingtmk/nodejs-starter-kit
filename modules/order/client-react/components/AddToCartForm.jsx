import React from 'react';
import { Form, Button, Icon, Tooltip } from 'antd';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField } from '@gqlapp/look-client-react';

const AddToCartFormSchema = {
  quantity: [required]
};

const ButtonGroup = Button.Group;

const AddToCartForm = props => {
  const { values, handleSubmit, currentUser, onSubmit, max, fixedQuantity, listingOwned } = props;
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
          <ButtonGroup>
            <Button size="large" onClick={handleSubmit} disabled={disabled}>
              <Icon type="shopping" />
              ADD TO CART
            </Button>
            <Button type="primary" size="large" onClick={() => onSubmit(values, true)} disabled={disabled}>
              BOOK NOW
            </Button>
          </ButtonGroup>
        </Tooltip>
      </div>
    </Form>
  );
};

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
  currentUser: PropTypes.object,
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  max: PropTypes.number,
  fixedQuantity: PropTypes.number,
  listingOwned: PropTypes.bool
};

const AddToCartWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      quantity: props.max > 0 ? (props.fixedQuantity === -1 ? 1 : props.fixedQuantity) : 0
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  validate: values => validate(values, AddToCartFormSchema),
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
