import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form } from 'antd';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField } from '@gqlapp/look-client-react';

const OrderStatusMailView = props => {
  const [visible, setVisible] = useState(false);
  const { values, handleSubmit } = props;

  return (
    <>
      <Button type="primary" shape="circle" size="sm" onClick={() => setVisible(true)}>
        <Icon type="mail" />
      </Button>
      <Modal
        title={`Mail details for order id: ${props.orderId}`}
        // visible={true}
        visible={visible}
        onOk={() => handleSubmit() || setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form onSubmit={handleSubmit}>
          <Field
            name="note"
            component={RenderField}
            placeholder="Note"
            type="textarea"
            label="Extra note"
            value={values.note}
          />
        </Form>
      </Modal>
    </>
  );
};

OrderStatusMailView.propTypes = {
  orderId: PropTypes.number,
  values: PropTypes.object,
  handleSubmit: PropTypes.func
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