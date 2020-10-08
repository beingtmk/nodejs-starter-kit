import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, PageLayout, Card, Heading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import UserForm from './UserForm';

const UserEditView = ({ loading, user, t, currentUser, onSubmit }) => {
  const isNotSelf = !user || (user && user.id !== currentUser.id);

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('userEdit.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('userEdit.meta')}`
        }
      ]}
    />
  );

  const renderContent = () => (
    <Card>
      <Link to={currentUser && currentUser.role === 'admin' ? '/users' : '/profile'}>Back</Link>
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
      {renderMetaData()}
      {loading && !user ? (
        <div className="text-center">{t('userEdit.loadMsg')}</div>
      ) : (
        <Row>
          <Col md={0} lg={0}>
            {renderContent()}
          </Col>
          <Col xs={0} md={24} lg={24}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
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
