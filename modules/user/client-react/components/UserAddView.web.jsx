import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { Card, PageLayout, Heading, MetaTags } from '@gqlapp/look-client-react';
import ROUTES from '../routes';

import UserForm from './UserForm';

const UserAddView = ({ t, onSubmit }) => {
  const renderContent = () => (
    <Card className="form-card">
      <Link to={`${ROUTES.adminPanel}`}>Back</Link>
      <Heading type="2">
        {t('userEdit.form.titleCreate')} {t('userEdit.form.title')}
      </Heading>
      <UserForm onSubmit={onSubmit} initialValues={{}} shouldDisplayRole={true} shouldDisplayActive={true} />
    </Card>
  );

  return (
    <PageLayout type="forms">
      <MetaTags title={t('userAdd.title')} description={t('userAdd.meta')} />

      {renderContent()}
    </PageLayout>
  );
};

UserAddView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate('user')(UserAddView);
