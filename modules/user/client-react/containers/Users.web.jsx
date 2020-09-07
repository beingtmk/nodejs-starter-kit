import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, AddButton, Row, Col } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import UsersFilterView from '../components/UsersFilterView';
import UsersListView from '../components/UsersListView';
import { useUsersWithSubscription } from './withSubscription';
import {
  withFilterUpdating,
  withOrderByUpdating,
  withUsers,
  withUsersDeleting,
  withUsersState,
  updateUsersState
} from './UserOperations';

const Users = props => {
  const { t, updateQuery, subscribeToMore } = props;
  const filter = { isActive: true };
  const usersUpdated = useUsersWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (usersUpdated) {
      updateUsersState(usersUpdated, updateQuery);
    }
  });

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('users.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('users.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <Row>
        <Col span={20}>
          <h2>{t('users.list.title')}</h2>
        </Col>
        <Col span={4}>
          <Row type="flex" justify="end">
            <Link to="/users/new">
              <AddButton color="primary">{t('users.btn.add')}</AddButton>
            </Link>
          </Row>
        </Col>
      </Row>
      <hr />
      <UsersFilterView {...props} filter={filter} />
      <hr />
      <UsersListView {...props} filter={filter} />
    </PageLayout>
  );
};

Users.propTypes = {
  usersUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};

export default compose(
  withUsersState,
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating
)(translate('user')(Users));
