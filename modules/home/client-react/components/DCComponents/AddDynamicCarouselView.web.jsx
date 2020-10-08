import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { Row, PageLayout } from '@gqlapp/look-client-react';

import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddDynamicCarouselView = ({ t, loading, addDynamicCarousel, currentUser }) => {
  return (
    <PageLayout type="forms">
      {renderMetaData(t)}
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
