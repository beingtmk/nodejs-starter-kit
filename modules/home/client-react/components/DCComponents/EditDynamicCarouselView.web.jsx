import React from 'react';
import { Spin } from 'antd';
import { PropTypes } from 'prop-types';

import { MetaTags, Row, PageLayout } from '@gqlapp/look-client-react';

import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const EditDynamicCarouselView = props => {
  const { t, dynamicCarousel, loading, editDynamicCarousel, currentUser } = props;

  return (
    <PageLayout type="forms">
      <MetaTags title={t('title')} description={t('meta')} />

      {loading ? (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin size="large" />
        </div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <Row type="flex" justify="space-around" align="middle">
            <DynamicCarouselFormComponent
              cardTitle="Edit home banner"
              t={t}
              dynamicCarousel={dynamicCarousel}
              onSubmit={editDynamicCarousel}
              currentUser={currentUser}
            />
          </Row>
        </>
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
