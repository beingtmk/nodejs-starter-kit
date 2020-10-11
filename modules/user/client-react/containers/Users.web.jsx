import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, AddButton, Row, Col, Heading, MetaTags } from '@gqlapp/look-client-react';
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

  return (
    <PageLayout>
      <MetaTags title={t('users.title')} description={t('users.meta')} />
      <Row>
        <Col span={20}>
          <Heading type="2">{t('users.list.title')}</Heading>
        </Col>
        <Col span={4}>
          <Row type="flex" justify="end">
            <Link to="/users/new">
              <AddButton color="primary">{t('users.btn.add')}</AddButton>
            </Link>
          </Row>
        </Col>
      </Row>
      <br />
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
