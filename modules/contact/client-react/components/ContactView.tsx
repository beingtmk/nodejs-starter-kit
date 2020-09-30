import React from "react";
import Grid from "hedron";
import Helmet from "react-helmet";

import { TranslateFunction } from "@gqlapp/i18n-client-react";
import {
  LayoutCenter,
  PageLayout,
  Card,
  CardTitle,
  Icon,
} from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

import ContactForm from "./ContactForm";
import { ContactForm as IContactForm } from "../types";
import { ContactFormConditions } from "../constants";

interface ContactViewProps {
  t: TranslateFunction;
  onSubmit: (values: IContactForm) => void;
  conditionParams: string;
}

const ContactView = (props: ContactViewProps) => {
  const { t, conditionParams } = props;

  var formTitle:string;
  var formSubject:string;
  var formLabel:string;
  if (conditionParams) {
    formTitle = ContactFormConditions[conditionParams].HEADING;
    formSubject = ContactFormConditions[conditionParams].SUBJECT;
    formLabel = ContactFormConditions[conditionParams].LABEL;
  }
  const renderContent = () => (
    <Card>
      <CardTitle>
        <Icon type="global" /> {formTitle || t("form.title")}
      </CardTitle>
      <ContactForm {...props} formSubject={formSubject} formLabel={formLabel} />
    </Card>
  );
  return (
    <PageLayout type="forms">
      <Grid.Provider breakpoints={{ sm: "-500", md: "501-768", lg: "+769" }}>
        <Grid.Bounds direction="vertical">
          <Helmet
            title={`${settings.app.name} - ${t("title")}`}
            meta={[
              {
                name: "description",
                content: `${settings.app.name} - ${t("meta")}`,
              },
            ]}
          />
          <Grid.Box sm={{ hidden: "true" }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: "true" }} lg={{ hidden: "true" }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

export default ContactView;
