import React from 'react';
import PropTypes from 'prop-types';

import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import CategoryFormComponent from './CategoryFormComponent';

const EditCategoryView = props => {
  const { loading, t, onSubmit, category } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('categoryEdit.title')} description={`${settings.app.name} - ${t('categoryEdit.meta')}`} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div align="center">
            <CategoryFormComponent
              category={category}
              cardTitle={t('categoryEdit.cardTitle')}
              onSubmit={onSubmit}
              t={t}
            />
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
  category: PropTypes.object
};

export default EditCategoryView;
