import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { Card, ModalDrawer } from '@gqlapp/look-client-react';
// import DLVerification from '../../containers/verification/DLVerification';
import MobileVerification from '../../containers/verification/MobileVerification';
// import EmailVerification from '../../containers/verification/EmailVerification';
// import PhotoVerification from '../../containers/verification/PhotoVerification';
// import ReferralVerification from '@gqlapp/referral-client-react/containers/ReferralVerification';

import VerificationIconComponent from './VerificationIconComponent.web';

const VerificationView = ({ data, verification, t }) => {
  const mobile = verification.mobileVerification;
  // const email = verification.emailVerification;
  //   const identification = verification.dlVerification.identification;
  //   const photoId = verification.photoIdVerification.photoId;
  console.log(data);
  const [vStatus, setvStatus] = React.useState(mobile && mobile.isVerified);
  return (
    <Card>
      <h3>{t('profile.card.group.verification.title')}</h3>
      {/*
        <CardText>
        {t("profile.card.group.verification.address")}
        {renderVarificationIcon(data && data.isAddressVerified)}
      </CardText>
      */}

      {/* <EmailVerification email={email} /> */}
      {/* <DLVerification vStatus={data && data.isIdVerified} identification={identification} /> */}
      <ModalDrawer
        buttonText={
          <>
            {'Mobile'}&nbsp;
            <VerificationIconComponent vStatus={vStatus} setvStatus={setvStatus} />
          </>
        }
        type="dashed"
        modalTitle="Mobile Verification"
      >
        <MobileVerification mobile={mobile} />
      </ModalDrawer>
      {/* <PhotoVerification photoId={photoId} /> */}
      {/* <ReferralVerification /> */}
    </Card>
  );
};
VerificationView.propTypes = {
  t: PropTypes.func,
  data: PropTypes.object,
  verification: PropTypes.object
};

export default translate('user')(VerificationView);
