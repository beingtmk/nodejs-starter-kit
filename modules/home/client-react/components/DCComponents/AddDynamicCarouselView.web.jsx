import React from 'react';
import { Spin } from 'antd';
import { PropTypes } from 'prop-types';

import { Row, PageLayout, MetaTags } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const AddDynamicCarouselView = ({ t, loading, addDynamicCarousel, currentUser }) => {
  return (
    <PageLayout type="forms">
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

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
              cardTitle="Add banner"
              t={t}
              onSubmit={addDynamicCarousel}
              currentUser={currentUser}
            />
          </Row>
        </>
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
