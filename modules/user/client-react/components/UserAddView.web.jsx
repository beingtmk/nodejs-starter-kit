import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { Card, PageLayout, Heading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import UserForm from './UserForm';

const UserAddView = ({ t, onSubmit }) => {
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
    <Card className="form-card">
      <Link to="/users">Back</Link>
      <Heading type="2">
        {t('userEdit.form.titleCreate')} {t('userEdit.form.title')}
      </Heading>
      <UserForm onSubmit={onSubmit} initialValues={{}} shouldDisplayRole={true} shouldDisplayActive={true} />
    </Card>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData()}

      {renderContent()}
    </PageLayout>
  );
};

UserAddView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate('user')(UserAddView);
