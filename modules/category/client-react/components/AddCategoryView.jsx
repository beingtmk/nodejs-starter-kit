import React from 'react';
import PropTypes from 'prop-types';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import CategoryFormComponent from './CategoryFormComponent';

const AddCategoryView = props => {
  const { loading, t, onSubmit } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('listAdd.title')} description={`${settings.app.name} - ${t('listAdd.meta')}`} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div align="center">
            <CategoryFormComponent cardTitle={t('listAdd.cardTitle')} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddCategoryView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddCategoryView;
