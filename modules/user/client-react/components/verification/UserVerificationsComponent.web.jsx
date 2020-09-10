import React from 'react';

import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import { Card } from '@gqlapp/look-client-react';
// To Do Abstract Out
import { Icon } from 'antd';
// import DLVerification from '../../containers/verification/DLVerification';
import MobileVerification from '../../containers/verification/MobileVerification';
// import EmailVerification from '../../containers/verification/EmailVerification';
// import PhotoVerification from '../../containers/verification/PhotoVerification';
// import ReferralVerification from '@gqlapp/referral-client-react/containers/ReferralVerification';

import settings from '../../../../../settings';

const VerificationView = ({ data, verification, t }) => {
  const mobile = verification.mobileVerification;
  const email = verification.emailVerification;
  //   const identification = verification.dlVerification.identification;
  //   const photoId = verification.photoIdVerification.photoId;
  console.log(data);
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
      <MobileVerification mobile={mobile} />
      {/* <PhotoVerification photoId={photoId} /> */}
      {/* <ReferralVerification /> */}
    </Card>
  );
};

export default translate('user')(VerificationView);
