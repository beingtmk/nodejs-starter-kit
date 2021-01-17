import React from 'react';
import { PropTypes } from 'prop-types';

import { MetaTags, Row, PageLayout, Card, Heading, Spinner } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const EditDynamicCarouselView = props => {
  const { t, dynamicCarousel, loading, onSubmit, currentUser } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('banner')} description={`${settings.app.name} - ${t('meta')}`} />
      <br />
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <Row type="flex" justify="center">
          {dynamicCarousel ? (
            <Card
              title={
                <Heading type="1">
                  <strong>{t('dynamicCarousel.editBanner')}</strong>
                </Heading>
              }
            >
              <DynamicCarouselFormComponent
                t={t}
                dynamicCarousel={dynamicCarousel}
                onSubmit={onSubmit}
                currentUser={currentUser}
              />
            </Card>
          ) : (
            <Spinner size="small" />
          )}
        </Row>
      )}
    </PageLayout>
  );
};

EditDynamicCarouselView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  dynamicCarousel: PropTypes.object,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default EditDynamicCarouselView;
