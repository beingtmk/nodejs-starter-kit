import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ADD_FAQ from '../graphql/AddFaq.graphql';

import AddFaqView from '../components/AddFaqView.web';

class AddFaq extends React.Component {
  render() {
    // console.log('props', this.props);
    return <AddFaqView {...this.props} />;
  }
}

export default compose(
  graphql(ADD_FAQ, {
    props: ({ ownProps: { history }, mutate }) => ({
      addFaq: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addFaq: {
                __typename: 'Faq',
                // id: null,
                ...values
              }
            }
          });

          message.destroy();
          message.success('Faq added.');
          history.push('/faqs');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  translate('events')
)(AddFaq);
