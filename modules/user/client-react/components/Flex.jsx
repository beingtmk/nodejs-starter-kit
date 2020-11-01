import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { Row, Col } from '@gqlapp/look-client-react';

// import { Page, Row, Column } from 'hedron';

// Here breakpoints props in Grid.Provider allows for custom breakpoints.
// Grid.Bounds acts just like Row and Grid.Box is Column.

const ProfileView = () => {
  return (
    <>
      <Col xs={0} lg={24}>
        <Row style={{ backgroundColor: 'red', height: '45px' }}>Header</Row>
      </Col>
      <Col>
        <Row style={{ backgroundColor: 'blue', minHeight: '100vh' }}>Centent</Row>
      </Col>
      <Row>These boxes render side by side on wide screens</Row>
      <Row>These boxes render side by side on wide screens</Row>
    </>
  );
};

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func
};

export default translate('user')(ProfileView);
