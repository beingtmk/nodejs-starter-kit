import React from 'react';
import Grid from 'hedron';
import Helmet from 'react-helmet';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { LayoutCenter, PageLayout, Underline } from '@gqlapp/look-client-react';
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
      <h1 className="text-center">{t('form.title')}</h1>
      <Underline length="100px" />
      <ContactForm {...props} />
    </>
  );
  return (
    <PageLayout>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          <Helmet
            title={`${settings.app.name} - ${t('title')}`}
            meta={[
              {
                name: 'description',
                content: `${settings.app.name} - ${t('meta')}`
              }
            ]}
          />
          <Grid.Box sm={{ hidden: 'true' }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

export default ContactView;
