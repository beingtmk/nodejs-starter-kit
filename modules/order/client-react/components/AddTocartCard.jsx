import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { Card, Button, Icon, Tooltip, Form, DatePicker } from 'antd';

import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField } from '@gqlapp/look-client-react';

const ButtonGroup = Button.Group;

const AddToCartCardFormSchema = {
  date: [required],
  quantity: [required]
};

const FormItem = Form.Item;

const AddToCartCard = ({ currentUser, values, handleSubmit }) => {
  const onChange = value => {
    // const { values } = this.props;
    values.date = value._d.toDateString();
    console.log('values', values);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormItem label="Date">
          <DatePicker placeholder={moment(`${values.date}`, 'YYYY-MM-DD')._i} onChange={onChange} />
        </FormItem>
        <Field
          name="quantity"
          component={RenderField}
          placeholder="Quantity"
          type="number"
          label="Quantity"
          value={values.quantity}
        />
        <Tooltip title={!currentUser ? 'SignIn To Continue' : 'Continue to Booking'}>
          <ButtonGroup>
            <Button
              size="large"
              // block
              onClick={handleSubmit}
              // disabled={!bookNowValidation}
            >
              BOOK NOW
            </Button>
            <Button
              type="primary"
              size="large"
              // block
              onClick={handleSubmit}
              // disabled={!bookNowValidation}
            >
              ADD TO CART <Icon type="shopping" />
            </Button>
          </ButtonGroup>
        </Tooltip>
      </Form>
    </Card>
  );
};

AddToCartCard.propTypes = {
  onSubmit: PropTypes.func,
  currentUser: PropTypes.object,
  values: PropTypes.object,
  handleSubmit: PropTypes.func
};

const AddToCartCardWithFormik = withFormik({
  mapPropsToValues: () => {
    return {
      date: '',
      quantity: 0
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    // console.log('on submit called', values);
    console.log('hey there this is a test!');
    await onSubmit(values);
    // .catch(e => {
    //   if (isFormError(e)) {
    //     setErrors(e.errors);
    //   } else {
    //     throw e;
    //   }
    // });
  },
  validate: values => validate(values, AddToCartCardFormSchema),
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartCardWithFormik(AddToCartCard);
