import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import DynamicCarouselFormComponent from './DynamicCarouselFormComponent';

const EditDynamicCarouselView = props => {
  const renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );
  const { t, dynamicCarousel, loading, editDynamicCarousel, currentUser } = props;

  return (
    <>
      <PageLayout>
        {renderMetaData(t)}
        {loading ? (
          <Spin />
        ) : (
          <>
            <LayoutCenter>
              <DynamicCarouselFormComponent
                cardTitle="Edit home banner"
                t={t}
                dynamicCarousel={dynamicCarousel}
                onSubmit={editDynamicCarousel}
                currentUser={currentUser}
              />
            </LayoutCenter>
          </>
        )}
      </PageLayout>
    </>
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
