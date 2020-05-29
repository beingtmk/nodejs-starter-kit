import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import MyOrdersListView from '../components/MyDeliveryListView';

import MY_DELIVERIES_QUERY from '../graphql/MyDeliveriesQuery.graphql';


const ORDERS = [
  {
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
    ],
    delivery: [
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
  },
  {
    id: 2,
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
    ],
    delivery: [
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
  }
];

const MyOrders = props => {

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${'MyOrders'}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${''}`
        }
      ]}
    />
  );
  console.log('admin blog', props);
  return (
    <PageLayout>
      {renderMetaData()}

      {props.loading ? <>Loading...</>
        :
         <MyOrdersListView orders={ORDERS} {...props} />
      }
    </PageLayout>
  );
};

// Orders.propTypes = {
//   usersUpdated: PropTypes.object,
//   updateQuery: PropTypes.func,
//   t: PropTypes.func,
//   subscribeToMore: PropTypes.func,
//   filter: PropTypes.object
// };

export default compose(
  graphql(MY_DELIVERIES_QUERY, {
    props({ data: { loading, error, userDeliveries } }) {
      if (error) {
        throw new Error(error);
      }
      console.log("******************");
      console.log(userDeliveries);
      return { loading, userDeliveries };
    }
  }),translate('order'))(MyOrders);
