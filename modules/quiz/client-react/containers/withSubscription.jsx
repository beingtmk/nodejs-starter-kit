import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import QUIZ_SUBSCRIPTION from '../graphql/QuizSubscription.graphql';

export const useQuizzesWithSubscription = (subscribeToMore, filter) => {
  const [quizzesUpdated, setQuizzesUpdated] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToQuizzes();
    return () => unsubscribe();
  });

  const subscribeToQuizzes = () => {
    return subscribeToMore({
      document: QUIZ_SUBSCRIPTION,
      variables: { filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { quizzesUpdated: newData }
          }
        }
      ) => {
        setQuizzesUpdated(newData);
      }
    });
  };

  return quizzesUpdated;
};

export default Component => {
  const QuizzesWithSubscription = props => {
    const { filter } = props;
    return (
      <Subscription subscription={QUIZ_SUBSCRIPTION} variables={{ filter }}>
        {({ data, loading }) => {
          if (!loading && data.quizzesUpdated) {
            return <Component {...props} quizzesUpdated={data.quizzesUpdated} />;
          }

          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  QuizzesWithSubscription.propTypes = {
    filter: PropTypes.object
  };

  return QuizzesWithSubscription;
};
