import React from 'react';
import PropTypes from 'prop-types';

import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, Icon, RenderField, ModalDrawer } from '@gqlapp/look-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';

const OrderStatusMailView = props => {
  const { values, handleSubmit } = props;
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
      </ModalDrawer>
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
