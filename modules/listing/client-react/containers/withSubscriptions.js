import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';

const useListingsWithSubscription = (subscribeToMore, filter) => {
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

// const subscribeToListingList = (subscribeToMore) =>
//   subscribeToMore({
//     document: LISTINGS_SUBSCRIPTION,
//     updateQuery: (
//       prev,
//       {
//         subscriptionData: {
//           data: {
//             listingsUpdated: { mutation, node }
//           }
//         }
//       }
//     ) => {
//       let newResult = prev;
//       console.log('PREVVVV', prev, node);
//       if (mutation === 'CREATED') {
//         newResult = onAddListing(prev, node.id);
//       } else if (mutation === 'UPDATED') {
//         newResult = onDeleteListing(prev, node.id);
//       } else if (mutation === 'DELETED') {
//         newResult = onDeleteListing(prev, node.id);
//       }

//       return newResult;
//     }
//   });
const useListingListWithSubscription = subscribeToMore => {
  const [listingsUpdated, setListingsUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToListings();
    return () => subscribe();
  });

  const subscribeToListings = () => {
    return subscribeToMore({
      document: LISTINGS_SUBSCRIPTION,
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
export { useListingListWithSubscription, useListingsWithSubscription };
