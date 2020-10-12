import React from 'react';
import { Steps, Spin } from 'antd';
import { PropTypes } from 'prop-types';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ListingFormComponent from './ListingFormComponent.web';

const { Step } = Steps;

const EditListingView = props => {
  const { t, listing, loading, onSubmit, currentUser } = props;
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      title: 'Details'
    },
    {
      title: 'Flags'
    },
    {
      title: 'Media'
    }
  ];

  return (
    <PageLayout type="forms">
      <MetaTags type={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      {loading ? (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin size="large" text={t('listing.loadMsg')} />
        </div>
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
              cardTitle="Edit Listing"
              t={t}
              listing={listing}
              onSubmit={onSubmit}
              currentUser={currentUser}
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
  onSubmit: PropTypes.func
};

export default EditListingView;
