import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import Notifications from '../components/Notifications';

const PaginationDemo = ({ t }) => {
  const renderMetaData = () => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('meta')}`
          }
        ]}
      />
    );
  };

  const renderContent = () => {
    return <Notifications />;
  };

  return (
    <PageLayout>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          {renderMetaData()}
          <Grid.Box sm={{ hidden: 'true' }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
        {/* {renderContent()} */}
      </Grid.Provider>
    </PageLayout>
  );
};

PaginationDemo.propTypes = {
  t: PropTypes.func
};

export default translate('pagination')(PaginationDemo);
