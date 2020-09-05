import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import MyReviewView from '../components/MyReviewView';
import MyReviewContainer from './MyReviewContainer';

const MyReview = props => {
  return (
    <PageLayout>
      <MyReviewContainer filter={{ modalId: 1, modalName: 'event' }} {...props}>
        <MyReviewView />
      </MyReviewContainer>
    </PageLayout>
  );
};

export default MyReview;
