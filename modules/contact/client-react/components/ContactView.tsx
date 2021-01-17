import React from 'react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { Card, CardTitle, Underline, Icon, MetaTags, PageLayout, Row, Col } from '@gqlapp/look-client-react';
// import { GlobalOutlined } from '@ant-design/icons';

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
            <Icon type="GlobalOutlined" />
            {t('form.title')}
          </CardTitle>
        </Underline>
        <ContactForm {...props} />
      </Card>
    </>
  );
  return (
    <PageLayout type="forms">
      <MetaTags title={t('title')} description={t('meta')} />
      <Row justify="center">
        <Col xs={24} md={12} lg={12}>
          <Row>
            <Col xs={0} md={0} lg={24}>
              <br />
              <br />
              <br />
              <br />
              <br />
            </Col>
          </Row>
          {renderContent()}
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ContactView;
