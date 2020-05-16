import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import MyOrdersListView from '../components/MyOrdersListView';

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
    delivery: {}
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
    delivery: {}
  }
];

const MyOrders = props => {
  // const { t, updateQuery, subscribeToMore } = props;
  // const filter = { isActive: true };
  // const usersUpdated = useUsersWithSubscription(subscribeToMore, filter);
  // console.log('users', props);
  // useEffect(() => {
  //   if (usersUpdated) {
  //     updateUsersState(usersUpdated, updateQuery);
  //   }
  // });

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
      {/* <h2>Orders</h2> */}
      {/* <Link to="/users/new">
        <Button color="primary">{t('users.btn.add')}</Button>
      </Link> */}
      {/* <hr /> */}
      {/* <UsersFilterView {...props} filter={filter} />
      <hr /> */}
      <MyOrdersListView orders={ORDERS} {...props} />
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

export default compose()(translate('order')(MyOrders));
