import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Subscription } from 'react-apollo';

import QUIZZES_SUBSCRIPTION from '../graphql/QuizzesSubscription.graphql';
import QUIZ_SUBSCRIPTION from '../graphql/QuizSubscription.graphql';

export const useQuizzesWithSubscription = (subscribeToMore, filter) => {
  const [quizzesUpdated, setQuizzesUpdated] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToQuizzes();
    return () => unsubscribe();
  });

  const subscribeToQuizzes = () => {
    return subscribeToMore({
      document: QUIZZES_SUBSCRIPTION,
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

export const useQuizWithSubscription = (subscribeToMore, quizId) => {
  const [quizUpdated, setQuizUpdated] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToQuiz();
    return () => unsubscribe();
  });

  const subscribeToQuiz = () => {
    return subscribeToMore({
      document: QUIZ_SUBSCRIPTION,
      variables: { id:quizId },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { quizUpdated: newData }
          }
        }
      ) => {
        setQuizUpdated(newData);
      }
    });
  };
  return quizUpdated;
};

export default Component => {
  const QuizzesWithSubscription = props => {
    const { filter } = props;
    return (
      <Subscription subscription={QUIZZES_SUBSCRIPTION} variables={{ filter }}>
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
