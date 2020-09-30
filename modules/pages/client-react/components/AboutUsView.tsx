import React from "react";

import { PageLayout } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import PagesComponent from "./PagesComponent";

interface AboutUsViewProps {
  t: TranslateFunction;
}

const AboutUsView = ({ t }: AboutUsViewProps) => {
  return (
    <PageLayout>
      <PagesComponent title={"About Us"} t={t} />
    </PageLayout>
  );
};

export default AboutUsView;
