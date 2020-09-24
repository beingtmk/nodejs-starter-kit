import React from 'react';
import { Row, Col } from 'antd';
import Helmet from 'react-helmet';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { Card, CardTitle, Icon, Underline, LayoutCenter, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ContactForm from './ContactForm';
import { ContactForm as IContactForm } from '../types';

interface ContactViewProps {
  t: TranslateFunction;
  onSubmit: (values: IContactForm) => void;
}

const ContactView = (props: ContactViewProps) => {
  const { t } = props;
  const renderContent = () => (
    <>
      <Card>
        <Underline>
          <CardTitle>
            <Icon type="global" /> {t('form.title')}
          </CardTitle>
        </Underline>
        <ContactForm {...props} />
      </Card>
    </>
  );
  return (
    <PageLayout>
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('meta')}`
          }
        ]}
      />
      <Row>
        <Col md={0} lg={0}>
          {renderContent()}
        </Col>
        <Col xs={0} md={24} lg={24}>
          <LayoutCenter>{renderContent()}</LayoutCenter>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ContactView;
