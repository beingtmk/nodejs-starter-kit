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
        <Tooltip title={!currentUser ? 'SignIn To Continue' : 'Continue to Booking'}>
          <ButtonGroup>
            <Button size="large" onClick={handleSubmit}>
              <Icon type="shopping" />
              ADD TO CART
            </Button>
            <Button type="primary" size="large" onClick={() => onSubmit(values, true)}>
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
  mapPropsToValues: () => {
    return {
      quantity: 1
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  validate: values => validate(values, AddToCartFormSchema),
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
