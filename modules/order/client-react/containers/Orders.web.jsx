import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import OrdersListView from '../components/OrdersListView';

const Orders = props => {
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
      title={`${settings.app.name} - ${'Orders-Admin'}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${'View and edit Orders'}`
        }
      ]}
    />
  );
  console.log('admin blog', props);
  return (
    <PageLayout>
      {renderMetaData()}
      <h2>Orders</h2>
      {/* <Link to="/users/new">
        <Button color="primary">{t('users.btn.add')}</Button>
      </Link> */}
      <hr />
      {/* <UsersFilterView {...props} filter={filter} />
      <hr /> */}
      <OrdersListView {...props} />
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

export default compose()(translate('order')(Orders));
