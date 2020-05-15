import React from 'react';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';

// import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserId.graphql';
import CheckoutPayView from '../components/CheckoutPayView';
// import CART_QUERY from '@gqlapp/order-client-react/graphql/GetCart.graphql';

// import ORDER_PAYMENT from '../graphql/OrderPayment.graphql';
// import PATCH_ORDER_PAYMENT from '../graphql/PatchOrderPayment.graphql';

class CheckoutPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderPayment: this.props.orderPayment };

    this.onSubmit = this.onSubmit.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ orderPayment: nextProps.orderPayment });
  }

  openCheckout() {
    // Variables
    this.props.orderPaymentRefetch();
    const orderPayment = this.state.orderPayment;
    const orderId = orderPayment.orderId;
    const amount = orderPayment.razorpayTransactionAmount;
    const razorpayOrderId = orderPayment.razorpayOrderId;

    let options = {
      key: 'rzp_test_vmG2tbpGt4EDR2',
      key_secret: 'zOerAsWXjhWe9fr8i38F5g1X',
      amount: amount, // 2000 paise = INR 20, amount in paisa
      currency: 'INR',
      name: 'Edgenus',
      description: 'Payment for events',
      image: 'https://res.cloudinary.com/dpvrqxttb/image/upload/v1585145914/edgenus/tkv2wuwutfj0brqbmbja.svg',
      // order_id: razorpayOrderId, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      handler: function handler(response) {
        console.log(response);
        document.getElementById('razorpay_order_id').value = response.razorpay_order_id;
        document.getElementById('razorpay_payment_id').value = response.razorpay_payment_id;
        document.getElementById('razorpay_signature').value = response.razorpay_signature;
        document.getElementById('rp_button').click();
      },
      // prefill: {
      //   name: 'Harshil Mathur',
      //   email: 'harshil@razorpay.com'
      // },
      notes: {
        address: 'note value'
      },

      theme: {
        color: '#3F0869'
      }
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  }

  async onSubmit(e) {
    e.preventDefault();

    console.log('onSubmit Called!');
    const razorpayOrderId = document.getElementById('razorpay_order_id').value;
    const razorpaySignature = document.getElementById('razorpay_signature').value;
    const razorpayPaymentId = document.getElementById('razorpay_payment_id').value;

    const { history, navigation } = this.props;

    // Get Values
    const finalObj = {
      id: this.props.orderPayment.id,
      razorpaySignature,
      razorpayPaymentId,
      razorpayOrderId,
      status: 'completed'
    };
    console.log('paymmmmmmm', finalObj);

    // Call Mutation
    try {
      await this.props.patchOrderPayment(finalObj);
    } catch (e) {
      message.error('Failed!');
      return null;
      // throw new FormError(t('userAdd.errorMsg'), e);
    }

    // Add Message
    message.info('Success! Order Placed.');

    //Redirect
    if (history) {
      return history.push(`/checkout-order/${this.props.getCart.id}`);
    }
    if (navigation) {
      return navigation.goBack();
    }
  }

  render() {
    console.log('checkout pay', this.props);
    return (
      <>
        {/* {this.props.loading ? (
          <Loader />
        ) : ( */}
        <>
          {console.log('props', this.props)}
          <CheckoutPayView {...this.props} onSubmit={this.onSubmit} openCheckout={this.openCheckout} />
          <div ref={el => (this.instance = el)} />

          <form onSubmit={this.onSubmit} id="rp_custom" hidden>
            <input type="text" id="razorpay_order_id" />
            <input type="text" id="razorpay_signature" />
            <input type="text" id="razorpay_payment_id" />
            <input type="submit" id="rp_button" />
          </form>
        </>
        {/* )} */}
      </>
    );
  }
}

export default compose(
  translate('order')
  // graphql(ORDER_PAYMENT, {
  //   props({ data: { loading, error, orderPayment, refetch } }) {
  //     if (error) throw new Error(error);
  //     console.log(orderPayment);
  //     return { loading, orderPayment, orderPaymentRefetch: refetch };
  //   }
  // }),
  // graphql(CURRENT_USER_QUERY, {
  //   props({ data: { loading, error, currentUser } }) {
  //     if (error) throw new Error(error);
  //     return { currentUserLoading: loading, currentUser };
  //   }
  // }),
  // graphql(PATCH_ORDER_PAYMENT, {
  //   props: ({ ownProps: { history, navigation }, mutate }) => ({
  //     patchOrderPayment: async values => {
  //       console.log('mutation called in container', values);
  //       await mutate({
  //         variables: {
  //           input: values
  //         }
  //       });
  //     }
  //   })
  // }),
  // graphql(CART_QUERY, {
  //   options: props => {
  //     return {
  //       variables: { userId: props.currentUser && props.currentUser.id }
  //     };
  //   },
  //   props({ data: { loading, error, getCart } }) {
  //     if (error) throw new Error(error);
  //     console.log(getCart);
  //     return { loading, getCart };
  //   }
  // })
)(CheckoutPay);
