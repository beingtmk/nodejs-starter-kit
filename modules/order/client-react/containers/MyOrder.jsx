import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import MyOrdersListView from '../components/MyOrdersListView';

import MY_ORDERS_QUERY from '../graphql/MyOrdersQuery.graphql';

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
  return (
    <PageLayout>
      {renderMetaData()}

      {props.loading ? <>Loading...</>
        : <MyOrdersListView orders={props.userOrders} {...props} />
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
  graphql(MY_ORDERS_QUERY, {
    props({ data: { loading, error, userOrders } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, userOrders };
    }
  }),translate('order'))(MyOrders);
