import React from 'react';
import { message, Form, Button, Icon, Tooltip } from 'antd';
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
  const { values, handleSubmit, currentUser, onSubmit, max } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="quantity"
        component={RenderField}
        placeholder="Quantity"
        type="number"
        label="Quantity"
        value={values.quantity}
        min={0}
        max={max}
      />
      <div align="right">
        <Tooltip title={!currentUser ? 'SignIn To Continue' : max <= 0 ? 'Out of Stock' : 'Continue to Booking'}>
          <ButtonGroup>
            <Button size="large" onClick={handleSubmit} disabled={max <= 0}>
              <Icon type="shopping" />
              ADD TO CART
            </Button>
            <Button type="primary" size="large" onClick={() => onSubmit(values, true)} disabled={max <= 0}>
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
  max: PropTypes.number
};

const AddToCartWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      quantity: props.max > 0 ? 1 : 0
    };
  },
  handleSubmit(values, { props: { onSubmit, max } }) {
    onSubmit(values);
  },
  validate: values => validate(values, AddToCartFormSchema),
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
