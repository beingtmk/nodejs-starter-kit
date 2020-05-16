import React from 'react';

import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

// import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserId.graphql';
// import ORDER_TRACK_QUERY from '../graphql/OrderTrackQuery.graphql';

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
class CheckoutOrder extends React.Component {
  render() {
    console.log('props', this.props);
    if (this.props.loading) {
      return <div>Loading.......................</div>;
    }
    return <CheckoutOrderView order={ORDER} {...this.props} />;
  }
}

export default compose()(CheckoutOrder);
// graphql(CURRENT_USER_QUERY, {
//   props({ data: { loading, error, currentUser } }) {
//     if (error) throw new Error(error);
//     return { currentUserLoading: loading, currentUser };
//   }
// }),
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
