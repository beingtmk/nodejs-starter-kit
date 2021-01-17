import React from 'react';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';

import DiscountFormComponent from './DiscountFormComponent.web';

const EditDiscountView = ({ t, loading, onSubmit, modalDiscount }) => {
  return (
    <PageLayout type="forms">
      <MetaTags title={t('discountEdit.title')} description={`${settings.app.name} - ${t('discountEdit.meta')}`} />

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
            <DiscountFormComponent
              cardTitle={t('discountEdit.cardTitle')}
              t={t}
              onSubmit={onSubmit}
              modalDiscount={modalDiscount}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditDiscountView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  modalDiscount: PropTypes.object,
  onSubmit: PropTypes.func
};

export default EditDiscountView;
