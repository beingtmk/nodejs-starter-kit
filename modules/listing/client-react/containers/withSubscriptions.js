import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import LISTINGS_BOOKMARK_SUBSCRIPTION from '../graphql/MyListingsBookmarkSubscription.graphql';
import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';
import LISTING_SUBSCRIPTION from '../graphql/ListingSubscription.graphql';

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

const useListingWithSubscription = (subscribeToMore, listingId) => {
  const [listingUpdated, setListingUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToListings();
    return () => subscribe();
  });

  const subscribeToListings = () => {
    return subscribeToMore({
      document: LISTING_SUBSCRIPTION,
      variables: { id: listingId },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { listingUpdated: newData }
          }
        }
      ) => {
        setListingUpdated(newData);
      }
    });
  };

  return listingUpdated;
};

// export default Component => {
//   const ListingsWithSubscription = props => {
//     const { filter } = props;
//     return (
//       <Subscription subscription={LISTINGS_SUBSCRIPTION} variables={{ filter }}>
//         {({ data, loading }) => {
//           if (!loading && data.listingsUpdated) {
//             return <Component {...props} listingsUpdated={data.listingsUpdated} />;
//           }

//           return <Component {...props} />;
//         }}
//       </Subscription>
//     );
//   };

//   ListingsWithSubscription.propTypes = {
//     filter: PropTypes.object
//   };

//   return ListingsWithSubscription;
// };

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

const useMyListingBookmarkWithSubscription = subscribeToMore => {
  const [listingsUpdated, setListingsUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToListings();
    return () => subscribe();
  });

  const subscribeToListings = () => {
    return subscribeToMore({
      document: LISTINGS_BOOKMARK_SUBSCRIPTION,
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { listingsBookmarkUpdated: newData }
          }
        }
      ) => {
        setListingsUpdated(newData);
      }
    });
  };

  return listingsUpdated;
};
export {
  useListingListWithSubscription,
  useListingsWithSubscription,
  useListingWithSubscription,
  useMyListingBookmarkWithSubscription
};
