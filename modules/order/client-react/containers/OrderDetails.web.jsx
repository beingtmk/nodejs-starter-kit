import React from 'react';
import { message } from 'antd';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

import ORDER_QUERY from '../graphql/OrderQuery.graphql';

import OrderDetailsView from '../components/OrderDetailsView';

const OrderDetails = props => {
  // console.log('props', props);
  return <OrderDetailsView {...props} />;
};

export default compose(
  graphql(ORDER_QUERY, {
    options: props => {
      // console.log(props);
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, order, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, order, subscribeToMore, updateQuery };
    }
  })
)(OrderDetails);
