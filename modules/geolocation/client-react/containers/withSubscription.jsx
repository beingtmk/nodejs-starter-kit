import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Subscription } from "react-apollo";

import LOCATION_SUBSCRIPTION from "../graphql/LocationSubscription.graphql";

export const useLocationWithSubscription = (subscribeToMore, filter) => {
  const [locationUpdated, setLocationUpdated] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToLocation();
    return () => unsubscribe();
  });

  const subscribeToLocation = () => {
    return subscribeToMore({
      document: LOCATION_SUBSCRIPTION,
      variables: { filter },

      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { locationUpdated: newData },
          },
        }
      ) => {
        setLocationUpdated(newData);
      },
    });
  };
  return locationUpdated;
};

export default (Component) => {
  const LocationWithSubscription = (props) => {
    const { filter } = props;
    return (
      <Subscription subscription={LOCATION_SUBSCRIPTION} variables={{ filter }}>
        {({ data, loading }) => {
          if (!loading && data.locationUpdated) {
            return (
              <Component {...props} locationUpdated={data.locationUpdated} />
            );
          }
          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  LocationWithSubscription.propTypes = {
    filter: PropTypes.object,
  };

  return LocationWithSubscription;
};
