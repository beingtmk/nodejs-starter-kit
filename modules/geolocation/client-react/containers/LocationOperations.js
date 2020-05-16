import { graphql } from 'react-apollo';
import {
  // PLATFORM,
  removeTypename
  // log
} from '@gqlapp/core-common';
import update from 'immutability-helper';
// import { message } from 'antd';

import LOCATION_QUERY from '../graphql/GeolocationQuery.graphql';
import UPDATE_FILTER from '../graphql/UpdateLocationFilter.client.graphql';
import LOCATION_STATE_QUERY from '../graphql/LocationStateQuery.client.graphql';

// import settings from '../../../../settings';

// const limit =
//   PLATFORM === 'web' || PLATFORM === 'server'
//     ? settings.pagination.web.itemsNumber
//     : settings.pagination.mobile.itemsNumber;

const withLocationState = Component =>
  graphql(LOCATION_STATE_QUERY, {
    props({ data: { locationState } }) {
      return removeTypename(locationState);
    }
  })(Component);

const withLocation = Component =>
  graphql(LOCATION_QUERY, {
    options: props => {
      const { filter, currentLocation } = props;
      let fil = filter;
      if (!fil) fil = { distance: 10 };
      return {
        // eslint-disable-next-line prettier/prettier
                variables: { input: currentLocation, filter: fil },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, locations, updateQuery, subscribeToMore } = data;
      if (error) throw new Error(error);
      return { loading, locations, updateQuery, subscribeToMore };
    }
  })(Component);

const withFilterUpdating = Component =>
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onDistanceChange(distance) {
        mutate({ variables: { filter: { distance } } });
      }
    })
  })(Component);

const updateLocationState = (locationUpdated, updateQuery) => {
  const { mutation, node } = locationUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'UPDATED':
        return onUpdateLocation(prev, node.id);
      default:
        return prev;
    }
  });
};

const onUpdateLocation = (prev, id) => {
  const index = prev.locations.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    locations: {
      $splice: [[index, 1]]
    }
  });
};

export { withLocationState, withLocation, updateLocationState, withFilterUpdating };
