import React from 'react';
// import Grid from 'hedron';
// import PropTypes from 'prop-types';
// import { Table, Pagination, LayoutCenter } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';

const NotificationsDemoView = () => {
  return (
    <div>
      <h1>hello, world</h1>
    </div>
  );
};

NotificationsDemoView.propTypes = {};

export default translate('notification')(NotificationsDemoView);
