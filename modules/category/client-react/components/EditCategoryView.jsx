import React from 'react';
import PropTypes from 'prop-types';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import CategoryFormComponent from './CategoryFormComponent';

const EditCategoryView = props => {
  const { loading, t, onSubmit, category } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('listEdit.title')} description={`${settings.app.name} - ${t('listEdit.meta')}`} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div align="center">
            <CategoryFormComponent category={category} cardTitle={t('listEdit.cardTitle')} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditCategoryView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  category: PropTypes.object,
};

export default EditCategoryView;
