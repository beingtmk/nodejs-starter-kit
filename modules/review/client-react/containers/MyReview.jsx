import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { PageLayout } from '@gqlapp/look-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import MyReviewView from '../components/MyReviewView';
import MyReviewContainer from './MyReviewContainer';

const MyReview = props => {
  const [modalName, setModalName] = React.useState('');
  const { currentUser } = props;
  return (
    <PageLayout>
      <MyReviewContainer
        filter={{ isActive: true, userId: currentUser && currentUser.id, modalName }}
        setModalName={setModalName}
        modalName={modalName}
        {...props}
      >
        <MyReviewView />
      </MyReviewContainer>
    </PageLayout>
  );
};

MyReview.propTypes = {
  currentUser: PropTypes.object
};

export default compose(withCurrentUser)(MyReview);
