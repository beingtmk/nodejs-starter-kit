import React from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { withModalDiscount } from '@gqlapp/discount-client-react/containers/DiscountOperations';
import { PageLayout, MetaTags, Spinner, Steps, Step } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ListingFormComponent from './ListingFormComponent.web';

const EditListingView = props => {
  const { t, listing, loading, onSubmit, currentUser, modalDiscount } = props;
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      title: t('listing.steps.title1')
    },
    {
      title: t('listing.steps.title2')
    },
    {
      title: t('listing.steps.title3')
    }
  ];

  return (
    <PageLayout type="forms">
      <MetaTags title={t('listing.title')} description={`${settings.app.name} - ${t('listing.meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <br />
          <br />
          <Steps current={step}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <br />
          <br />
          <div align="center">
            <ListingFormComponent
              step={step}
              setStep={setStep}
              cardTitle={t('listing.cardTitle')}
              t={t}
              listing={listing}
              onSubmit={onSubmit}
              currentUser={currentUser}
              modalDiscount={modalDiscount}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditListingView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  modalDiscount: PropTypes.object,
  onSubmit: PropTypes.func
};

export default compose(withModalDiscount)(EditListingView);
