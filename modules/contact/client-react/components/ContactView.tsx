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

  var formTitle: string;
  var formSubject: string;
  var formLabel: string;
  if (conditionParams) {
    formTitle = ContactFormConditions[conditionParams].HEADING;
    formSubject = ContactFormConditions[conditionParams].SUBJECT;
    formLabel = ContactFormConditions[conditionParams].LABEL;
  }
  const renderContent = () => (
    <Card style={{maxWidth:'700px', width:'100%', margin:'0 10px'}}>
      <CardTitle>
        <Icon type="global" /> {formTitle || t("form.title")}
      </CardTitle>
      <ContactForm {...props} formSubject={formSubject} formLabel={formLabel} />
    </Card>
  );
  return (
    <PageLayout type="forms">
      <Helmet
        title={`${settings.app.name} - ${formTitle || t("title")}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${formLabel || t("meta")}`,
          },
        ]}
      />

      {renderContent()}
    </PageLayout>
  );
};

export default ContactView;
