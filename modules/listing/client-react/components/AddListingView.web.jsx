import React from 'react';
import { Steps, Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout } from '@gqlapp/look-client-react';

import ListingFormComponent from './ListingFormComponent.web';

const { Step } = Steps;

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddListingView = ({ t, loading, onSubmit, currentUser }) => {
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
      {renderMetaData(t)}
      {loading ? (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin size="large" />
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
              cardTitle="Add Listing"
              t={t}
              onSubmit={onSubmit}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddListingView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default AddListingView;
