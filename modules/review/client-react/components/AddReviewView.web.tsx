import React from 'react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { PageLayout, MetaTags, Heading, Row, Card, Spinner } from '@gqlapp/look-client-react';

import ReviewFormComponent from './ReviewFormComponent';
import settings from '@gqlapp/config';

export interface AddReviewViewProps {
  t: TranslateFunction;
  loading: boolean;
  addReview: () => null;
}

const AddReviewView: React.FC<AddReviewViewProps> = props => {
  const { t, loading, addReview } = props;
  // console.log(props);
  return (
    <PageLayout type="forms">
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      {loading ? (
        <Spinner size="small" />
      ) : (
        <>
          <Row type="flex" justify="center">
            <Card
              title={
                <Heading type="1">
                  <strong>{t('addReview')}</strong>
                </Heading>
              }
            >
              <ReviewFormComponent t={t} onSubmit={addReview} showModal={true} />
            </Card>
          </Row>
        </>
      )}
    </PageLayout>
  );
};

export default AddReviewView;
