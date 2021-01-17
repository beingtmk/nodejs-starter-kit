import React from 'react';
import { PropTypes } from 'prop-types';

import { Row, PageLayout, MetaTags, Card, Heading, Spinner } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const AddDynamicCarouselView = ({ t, loading, onSubmit, currentUser }) => {
  return (
    <PageLayout type="forms">
      <MetaTags title={t('banner')} description={`${settings.app.name} - ${t('meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <Row type="flex" justify="center">
          <Card
            title={
              <Heading type="1">
                <strong>{t('dynamicCarousel.addBanner')}</strong>
              </Heading>
            }
          >
            <DynamicCarouselFormComponent
              t={t}
              dynamicCarousel={{ isActive: true }}
              onSubmit={onSubmit}
              currentUser={currentUser}
            />
          </Card>
        </Row>
      )}
    </PageLayout>
  );
};

AddDynamicCarouselView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default AddDynamicCarouselView;
