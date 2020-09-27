import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import FAQS_SUBSCRIPTION from '../graphql/FaqsSubscription.graphql';

export const useFaqWithSubscription = (subscribeToMore, filter) => {
  const [faqsUpdated, setFaqsUpdated] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToFaq();
    return () => unsubscribe();
  });
  const subscribeToFaq = () => {
    return subscribeToMore({
      document: FAQS_SUBSCRIPTION,
      variables: { filter },

      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { faqsUpdated: newData }
          }
        }
      ) => {
        setFaqsUpdated(newData);
      }
    });
  };

  return faqsUpdated;
};

export default Component => {
  const FaqWithSubscription = props => {
    const { filter } = props;
    return (
      <Subscription subscription={FAQS_SUBSCRIPTION} variables={{ filter }}>
        {({ data, loading }) => {
          if (!loading && data.faqsUpdated) {
            return <Component {...props} faqsUpdated={data.faqsUpdated} />;
          }

          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  FaqWithSubscription.propTypes = {
    filter: PropTypes.object
  };

  return FaqWithSubscription;
};
