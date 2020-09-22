import React from 'react';
import moment from 'moment';
import { Modal, Card, Button, Icon, Tooltip, Form, DatePicker } from 'antd';
import { PropTypes } from 'prop-types';

import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField } from '@gqlapp/look-client-react';

const FormItem = Form.Item;

const AddToCartFormSchema = {
  date: [required],
  quantity: [required]
};

const AddToCartForm = props => {
  const { values, visible, details, handleSubmit, handleVisible } = props;
  const onChange = value => {
    // const { values } = this.props;
    values.date = value._d.toDateString();
    console.log('values', values);
  };
  return (
    <Modal visible={visible} title={details.title} okText="Save" onCancel={handleVisible} onOk={handleSubmit}>
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
      </Form>
    </Modal>
  );
};

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
  currentUser: PropTypes.object,
  values: PropTypes.object,
  handleSubmit: PropTypes.func
};
const AddToCartWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      cost: props.details && props.details.cost,
      date: (props.details && props.details.date) || '',
      id: props.details && props.details.id,
      quantity: (props.details && props.details.quantity) || 0,
      thumbnail: props.details && props.details.thumbnail,
      title: props.details && props.details.title
    };
  },
  handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit, handleVisible }
    }
  ) {
    // console.log('on submit called', values);
    handleVisible();
    console.log('hey there this is a test!', values);
    onSubmit(values);
    // .catch(e => {
    //   if (isFormError(e)) {
    //     setErrors(e.errors);
    //   } else {
    //     throw e;
    //   }
    // });
  },
  validate: values => validate(values, AddToCartFormSchema),
  displayName: 'AddToCart Form' // helps with React DevTools
});

export default AddToCartWithFormik(AddToCartForm);
