import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, PageLayout } from '@gqlapp/look-client-react';
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
    <>
      <Link to={currentUser && currentUser.role === 'admin' ? '/users' : '/profile'}>Back</Link>
      <h2>
        {t('userEdit.form.titleEdit')} {t('userEdit.form.title')}
      </h2>
      <UserForm
        onSubmit={onSubmit}
        shouldDisplayRole={isNotSelf}
        shouldDisplayActive={isNotSelf}
        initialValues={user}
      />
    </>
  );

  return (
    <PageLayout>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          {renderMetaData()}
          {loading && !user ? (
            <div className="text-center">{t('userEdit.loadMsg')}</div>
          ) : (
            <>
              <Grid.Box sm={{ hidden: 'true' }}>
                <LayoutCenter>{renderContent()}</LayoutCenter>
              </Grid.Box>
              <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
                {renderContent()}
              </Grid.Box>
            </>
          )}
        </Grid.Bounds>
      </Grid.Provider>
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
