import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import MODEL_SUBSCRIPTION from '../graphql/ModelsSubscription.graphql';

export const useModelsWithSubscription = (
  subscribeToMore
  // filter
) => {
  const [modelUpdated, setModelsUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToModels();
    return () => subscribe();
  });

  const subscribeToModels = () => {
    return subscribeToMore({
      document: MODEL_SUBSCRIPTION,
      // variables: { filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { modelUpdated: newData }
          }
        }
      ) => {
        setModelsUpdated(newData);
      }
    });
  };

  return modelUpdated;
};

export default Component => {
  const ModelsWithSubscription = props => {
    // const { filter } = props;
    return (
      <Subscription
        subscription={MODEL_SUBSCRIPTION}
        // variables={{ filter }}
      >
        {({ data, loading }) => {
          if (!loading && data.modelUpdated) {
            return <Component {...props} modelUpdated={data.modelUpdated} />;
          }

          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  // ModelsWithSubscription.propTypes = {
  //   filter: PropTypes.object
  // };

  return ModelsWithSubscription;
};
