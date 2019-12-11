import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'hedron';

import { translate } from '@gqlapp/i18n-client-react';

// import { Page, Row, Column } from 'hedron';

// Here breakpoints props in Grid.Provider allows for custom breakpoints.
// Grid.Bounds acts just like Row and Grid.Box is Column.

const ProfileView = () => {
  return (
    <Grid.Provider breakpoints={{ mobile: '-500', tablet: '501-750', wide: '+750' }}>
      <Grid.Bounds direction="vertical">
        <Grid.Box style={{ background: 'red', height: '45px' }} mobile={{ hidden: true }}>
          Header
        </Grid.Box>
        <Grid.Box style={{ background: 'blue', minHeight: '100vh' }}>Content</Grid.Box>
        <Grid.Bounds direction="vertical" wide={{ direction: 'horizontal' }}>
          <Grid.Box>These boxes render side by side on wide screens</Grid.Box>
          <Grid.Box>These boxes render side by side on wide screens</Grid.Box>
        </Grid.Bounds>
      </Grid.Bounds>
    </Grid.Provider>
  );
};

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func
};

export default translate('user')(ProfileView);
