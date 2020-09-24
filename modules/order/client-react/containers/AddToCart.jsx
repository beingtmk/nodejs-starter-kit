import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ADD_TO_CART from '../graphql/AddToCart.graphql';

import AddTocartCard from '../components/AddTocartCard';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async (values, redirect = false) => {
    const { history, navigation, currentUser } = this.props;

    // if (!currentUser) {
    //   return history.push("/login/");
    // }
    // Get Values
    console.log(values);
    console.log('****************');
    console.log(this.props.listing);
    // Call Mutation

    const obj = {
      consumerId: 1,
      orderDetail: {
        cost: 491,
        title: 'Listing 50',
        quantity: values.quantity,
        date: values.date,
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU'
      }
    };

    try {
      await this.props.addToCart(obj);
    } catch (e) {
      message.error('Failed!');
      console.log(e);
      // throw new FormError('Failed!', e);
    }

    // Add Message
    message.success('Success! Complete your Order.');

    // Redirect
    // if (history || navigation) {
    //   if (history && redirect) {
    //     return history.push("/checkout-cart/");
    //   }
    // }
  };

  render() {
    console.log('props, add to cart', this.props);
    return (
      <>
        <AddTocartCard onSubmit={this.onSubmit} {...this.props} />
      </>
    );
  }
}

export default compose(
  graphql(ADD_TO_CART, {
    props: ({ mutate }) => ({
      addToCart: async values => {
        console.log('mutation start', values);
        await mutate({
          variables: {
            input: values
          }
        });
        console.log(values, 'mutation called');
      }
    })
  }),
  translate('orders')
)(AddToCart);
