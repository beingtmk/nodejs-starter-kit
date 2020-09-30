import React from "react";

import { PageLayout } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import PagesComponent from "./PagesComponent";

interface PrivacyPolicyViewProps {
  t: TranslateFunction;
}

const PrivacyPolicyView = ({ t }: PrivacyPolicyViewProps) => {
  return (
    <PageLayout>
      <PagesComponent title={"Privacy Policy"} t={t} />
    </PageLayout>
  );
};

export default PrivacyPolicyView;
