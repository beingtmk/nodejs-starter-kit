import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, PageLayout, Card, Heading, MetaTags, Row, Col } from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { USER_ROUTES } from '@gqlapp/user-client-react';

import UserForm from './UserForm';

const UserEditView = ({ loading, user, t, currentUser, onSubmit }) => {
  const isNotSelf = !user || (user && user.id !== currentUser.id);

  const renderContent = () => (
    <Card>
      <Link to={currentUser && currentUser.role === 'admin' ? `${USER_ROUTES.adminPanel}` : `${USER_ROUTES.profile}`}>
        Back
      </Link>
      <Heading type="2">
        {t('userEdit.form.titleEdit')} {t('userEdit.form.title')}
      </Heading>
      <UserForm
        onSubmit={onSubmit}
        shouldDisplayRole={isNotSelf}
        shouldDisplayActive={isNotSelf}
        initialValues={user}
      />
    </Card>
  );

  return (
    <PageLayout type="forms">
      <MetaTags title={t('userEdit.title')} description={t('userEdit.meta')} />
      {loading && !user ? (
        <div className="text-center">{t('userEdit.loadMsg')}</div>
      ) : (
        <Row>
          <Col md={0} sm={24} xs={24} lg={0}>
            {renderContent()}
          </Col>
          <Col xs={0} md={24} lg={24}>
            <LayoutCenter>
              <br />
              <br />
              <br />
              <br />
              {renderContent()}
            </LayoutCenter>
          </Col>
        </Row>
      )}
    </PageLayout>
  );
};

UserEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate('user')(UserEditView);
