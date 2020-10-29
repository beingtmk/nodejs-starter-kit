import React from 'react';
import { PropTypes } from 'prop-types';

import { MetaTags, Row, PageLayout, Col, LayoutCenter } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import settings from '@gqlapp/config';
import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const EditDynamicCarouselView = props => {
  const { t, dynamicCarousel, loading, editDynamicCarousel, currentUser } = props;
  const renderContent = () => (
    <DynamicCarouselFormComponent
      cardTitle={t('dynamicCarousel.editBanner')}
      t={t}
      dynamicCarousel={dynamicCarousel}
      onSubmit={editDynamicCarousel}
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
            <LayoutCenter>
              <br />
              <br />
              <br />
              <br />
              {renderContent()}
            </LayoutCenter>
          </Col>
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
  editDynamicCarousel: PropTypes.func
};

export default EditDynamicCarouselView;
