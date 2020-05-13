import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';

export const useListingsWithSubscription = (subscribeToMore, filter) => {
  const [listingsUpdated, setListingsUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToListings();
    return () => subscribe();
  });

  const subscribeToListings = () => {
    return subscribeToMore({
      document: LISTINGS_SUBSCRIPTION,
      variables: { filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { listingsUpdated: newData }
          }
        }
      ) => {
        setListingsUpdated(newData);
      }
    });
  };

  return listingsUpdated;
};

export default Component => {
  const ListingsWithSubscription = props => {
    const { filter } = props;
    return (
      <Subscription subscription={LISTINGS_SUBSCRIPTION} variables={{ filter }}>
        {({ data, loading }) => {
          if (!loading && data.listingsUpdated) {
            return <Component {...props} listingsUpdated={data.listingsUpdated} />;
          }

          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  ListingsWithSubscription.propTypes = {
    filter: PropTypes.object
  };

  return ListingsWithSubscription;
};
