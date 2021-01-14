import React from 'react';
import PropTypes from 'prop-types';

import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, Icon, RenderField, ModalDrawer, Button, Col } from '@gqlapp/look-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react';

const OrderStatusMailView = props => {
  const { disabled = false } = props;
  return (
    <>
      <ModalDrawer
        buttonText={
          <>
            <Icon type="MailOutlined" />
          </>
        }
        shape="circle"
        size="sm"
        modalTitle={`Mail details for order id: ${displayDataCheck(props.orderId)}`}
        height="auto"
        block={false}
        disabled={disabled}
      >
        <StatusMailForm {...props} />
      </ModalDrawer>
    </>
  );
};

const StatusMailForm = props => {
  const { values, handleSubmit, hideModal } = props;
  const handleOnSubmit = () => {
    handleSubmit();
    hideModal();
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Field
        name="note"
        component={RenderField}
        placeholder="Note"
        type="textarea"
        label="Extra note"
        value={values.note}
      />
      <div align="right">
        <Col lg={4} md={5} sm={24} xs={24}>
          <Button color="primary" type="submit" block>
            Submit
          </Button>
        </Col>
      </div>
    </Form>
  );
};
StatusMailForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  hideModal: PropTypes.func
};

OrderStatusMailView.propTypes = {
  orderId: PropTypes.number,
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  disabled: PropTypes.bool
};

const OrderStatusMailWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    note: ''
  }),
  async handleSubmit(values, { props: { onSubmit, orderId } }) {
    // console.log('on submit called', values);
    await onSubmit(orderId, values.note);
  },
  displayName: 'OrderStatusMail Form' // helps with React DevTools
});
export default OrderStatusMailWithFormik(OrderStatusMailView);
