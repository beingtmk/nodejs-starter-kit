import React from 'react';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';

import DiscountFormComponent from './DiscountFormComponent.web';

const AddDiscountView = ({ t, loading, onSubmit }) => {
  return (
    <PageLayout type="forms">
      <MetaTags title={t('listAdd.title')} description={`${settings.app.name} - ${t('listAdd.meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div align="center">
            <DiscountFormComponent cardTitle={t('listAdd.cardTitle')} t={t} onSubmit={onSubmit} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddDiscountView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default AddDiscountView;
