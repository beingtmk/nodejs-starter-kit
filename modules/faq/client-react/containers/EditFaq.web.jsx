import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import FAQ_QUERY from '../graphql/FaqQuery.graphql';
import EDIT_FAQ from '../graphql/EditFaq.graphql';

import EditFaqView from '../components/EditFaqView.web';
import FAQ_SUBSCRIPTION from '../graphql/FaqsSubscription.graphql';

import { removeTypename } from '../constants';

const EditFaq = props => {
  const { updateQuery, subscribeToMore, faq, history } = props;

  const useFaqWithSubscription = (subscribeToMore, faqId) => {
    const [faqUpdated, setFaqUpdated] = useState(null);

    useEffect(() => {
      const subscribe = subscribeToFaq();
      return () => subscribe();
    });

    const subscribeToFaq = () => {
      return subscribeToMore({
        document: FAQ_SUBSCRIPTION,
        variables: { id: faqId },
        updateQuery: (
          prev,
          {
            subscriptionData: {
              data: { faqUpdated: newData }
            }
          }
        ) => {
          setFaqUpdated(newData);
        }
      });
    };

    return faqUpdated;
  };

  const updateFaqState = (faqUpdated, updateQuery, history) => {
    const { mutation, node } = faqUpdated;
    updateQuery(prev => {
      switch (mutation) {
        case 'UPDATED':
          return onAddFaq(prev, node);
        case 'DELETED':
          return onDeleteFaq(history);
        default:
          return prev;
      }
    });
  };

  function onAddFaq(prev, node) {
    // check if it is duplicate
    return update(prev, {
      faq: {
        $set: node
      }
    });
  }
  const onDeleteFaq = history => {
    message.info('This faq has been deleted!');
    message.warn('Redirecting to all faqs');
    // history.push('/faqs_catalogue');
    return true;
  };

  const faqUpdated = useFaqWithSubscription(subscribeToMore, faq && faq.id);

  useEffect(() => {
    if (faqUpdated) {
      updateFaqState(faqUpdated, updateQuery, history);
    }
  });
  return <EditFaqView {...props} />;
};
// return <h1>Edit Faq</h1>

EditFaq.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.fucn,
  faq: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(FAQ_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, faq, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { faqLoading: loading, faq, subscribeToMore, updateQuery };
    }
  }),
  graphql(EDIT_FAQ, {
    props: ({ ownProps: { history }, mutate }) => ({
      editFaq: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const input = removeTypename(values);
          await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          // this.props.refetch();
          return history.push('/faqs');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  translate('faqs')
)(EditFaq);
