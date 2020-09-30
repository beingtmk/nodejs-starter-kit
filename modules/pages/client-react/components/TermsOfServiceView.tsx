import React from "react";

import { PageLayout } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import PagesComponent from "./PagesComponent";

interface TermsOfServiceViewProps {
  t: TranslateFunction;
}

const TermsOfServiceView = ({ t }: TermsOfServiceViewProps) => {
  return (
    <PageLayout>
      <PagesComponent title={"Terms Of Service"} t={t} />
    </PageLayout>
  );
};

export default TermsOfServiceView;
