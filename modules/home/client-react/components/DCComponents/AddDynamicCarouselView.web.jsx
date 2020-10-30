import React from 'react';
import { PropTypes } from 'prop-types';

import { Row, PageLayout, MetaTags, Card, Heading } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import settings from '@gqlapp/config';
import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const AddDynamicCarouselView = ({ t, loading, addDynamicCarousel, currentUser }) => {
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
              onSubmit={addDynamicCarousel}
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
  addDynamicCarousel: PropTypes.func
};

export default AddDynamicCarouselView;
