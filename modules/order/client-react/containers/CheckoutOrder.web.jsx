import React from 'react';

import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

// import ORDER_TRACK_QUERY from '../graphql/OrderTrackQuery.graphql';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import PATCH_ORDER from '../graphql/PatchOrder.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';

import CheckoutOrderView from '../components/CheckoutOrderView';

const ORDER = {
  id: 1,
  orderDetails: [
    {
      id: 1,
      thumbnail: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 1',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 4
    },
    {
      id: 2,
      thumbnail: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 2',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 3
    }
  ]
  // , delivery: {

  // }
};
const ADDRESSES = [
  {
    id: 5,
    streetAddress1: 'Room A308, Manas Hostel, IITG',
    streetAddress2: 'North Guwahati',
    state: 'Assam',
    city: 'Guwahati',
    pinCode: '7810390',
    mobile: '+91-9085626859'
  },
  {
    id: 3,
    streetAddress1: 'Room A308, Manas Hostel, IITG',
    streetAddress2: 'Guwahati, North Guwahati',
    state: 'Assam',
    city: 'Guwahati',
    pinCode: '7810390',
    mobile: '+91-9085626859'
  }
];

class CheckoutOrder extends React.Component {
  onSubmit = async () => {
    const { history, navigation } = this.props;
    console.log('submit pressed!');
    console.log('this.props.getCart');
    try {
      await this.props.patchOrder({ id: this.props.getCart.id, state: 'INITIATED' });
    } catch (e) {
      message.error('Failed!');
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

  render() {
    console.log('props', this.props);
    if (this.props.loading) {
      return <div>Loading.......................</div>;
    }
    return <CheckoutOrderView addresses={ADDRESSES} onSubmit={this.onSubmit} order={ORDER} {...this.props} />;
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(GET_CART_QUERY, {
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  }),
  // graphql(ORDER_TRACK_QUERY, {
  //   options: props => {
  //     return {
  //       variables: { id: parseInt(props.match.params.id) }
  //     };
  //   },
  //   props({ data: { loading, error, order } }) {
  //     if (error) throw new Error(error);
  //     return { loading, order };
  //   }
  // })
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
  })
)(CheckoutOrder);
