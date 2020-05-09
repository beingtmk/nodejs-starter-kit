import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import CurrentLocationComponent from "../components/CurrentLocationComponent";
import GEOLOCATION from "../graphql/GeolocationQuery.graphql";
import { useLocationWithSubscription } from "./withSubscription";
import {
  withFilterUpdating,
  withLocation,
  withLocationState,
  updateLocationState,
} from "./LocationOperations";

const CurrentLocation = (props) => {
  const { t, updateQuery, subscribeToMore } = props;
  const filter = { distance: 1 };
  const locationUpdated = useLocationWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (locationUpdated) {
      updateLocationState(locationUpdated, updateQuery);
    }
  });
  
  return <CurrentLocationComponent {...props} filter={filter} />;
};

CurrentLocation.propTypes = {
  subscribeToMore: PropTypes.func.isRequired,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  filter: PropTypes.object,
};

export default compose(
  withLocationState,
  withLocation,
  withFilterUpdating
)(CurrentLocation);
