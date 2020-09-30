import React from 'react';
import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import queryString from 'query-string';

import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import ContactView from '../components/ContactView';
import CONTACT from '../graphql/Contact.graphql';
import { ContactForm } from '../types';

interface ContctProps {
  t: TranslateFunction;
  location: any
}

const Contact = (props: ContctProps): any => {
  const onSubmit = (sendContact: any) => async (values: ContactForm) => {
    const { t } = props;

    try {
      await sendContact(values);
    } catch (e) {
      throw new FormError(t('serverError'), e);
    }
  };
  const {location} = props;
  const cParams = queryString.parse(location.search);
  const conditionParams = cParams && cParams.condition;
  return (
    <Mutation mutation={CONTACT}>
      {(mutate: MutationFn) => {
        const sendContact = async (values: ContactForm) => {
          const {
            data: { contact }
          } = (await mutate({ variables: { input: values } })) as FetchResult;
          return contact;
        };
        return <ContactView conditionParams={conditionParams} {...props} onSubmit={onSubmit(sendContact)} />;
      }}
    </Mutation>
  );
};

export default translate('contact')(Contact);
