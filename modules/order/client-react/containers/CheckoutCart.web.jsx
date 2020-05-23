import React from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

// import { Loader } from '@gqlapp/look-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import { FormError } from '@gqlapp/forms-client-react';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';
import PATCH_ORDER from '../graphql/PatchOrder.graphql';

import CheckoutCartView from '../components/CheckoutCartView';

const ORDER = {
  id: 1,
  orderDetails: [
    {
      id: 1,
      thumbnail:'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 1',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 4
    },
    {
      id: 2,
      thumbnail:'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 2',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 3
    }
  ]
  // , delivery: {
    
  // }
};

class CheckoutCart extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit = async () => {
    const { history, navigation } = this.props;
    console.log('submit pressed!');
    console.log('this.props.getCart');
    try {
      await this.props.patchOrder({id:this.props.getCart.id, state: "INITIATED"});
    } catch (e) {
      message.error("Failed!");
      console.log(e);
      // throw new FormError('Failed!', e);
    }

    // Redirect
    if (history) {
      return history.push('/my-orders/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  };

  render(){
    const props = this.props;
    return (
      <>
        {props.currentUserLoading || props.cartLoading ? (
          <>Loading...</>
        ) : (
        <CheckoutCartView
          order={props.getCart}
          // deleteProduct={deleteProduct}
          onSubmit={this.onSubmit}
          // cart={props.cart}
          {...props}
        />
        )}
      </>
    );
  }
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        currentUserLoading: loading,
        currentUser
      };
    }
  }),
  graphql(GET_CART_QUERY, {
    props({ data: { loading, error, getCart } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart };
    }
  }),
  graphql(PATCH_ORDER, {
    props: ({ mutate }) => ({
      patchOrder: async values => {
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
)(CheckoutCart);
