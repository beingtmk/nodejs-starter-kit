import React from 'react';
import { PropTypes } from 'prop-types';

import { Row, PageLayout, MetaTags, Col, LayoutCenter } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import settings from '@gqlapp/config';
import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const AddDynamicCarouselView = ({ t, loading, addDynamicCarousel, currentUser }) => {
  const renderContent = () => (
    <DynamicCarouselFormComponent
      cardTitle={t('dynamicCarousel.addBanner')}
      t={t}
      dynamicCarousel={{ isActive: true }}
      onSubmit={addDynamicCarousel}
      currentUser={currentUser}
    />
  );
  return (
    <PageLayout type="forms">
      <MetaTags title={t('banner')} description={`${settings.app.name} - ${t('meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <Row>
          <Col md={0} lg={0}>
            {renderContent()}
          </Col>
          <Col xs={0} md={24} lg={24}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Col>
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
