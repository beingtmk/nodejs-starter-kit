import React from 'react';
import { Row, Col } from 'antd';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { Card, CardTitle, Icon, Underline, MetaTags, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { GlobalOutlined } from '@ant-design/icons';

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
            <GlobalOutlined /> {t('form.title')}
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
        <Col xs={0} md={0} lg={6} />
        <Col xs={24} lg={12}>
          <Col xs={0} md={0} lg={24}>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
          {renderContent()}
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ContactView;
