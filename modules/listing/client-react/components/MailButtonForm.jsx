import React from 'react';
import PropTypes from 'prop-types';

import { Form, RenderField, Alert, Card, Button } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

const MailButtonForm = props => {
  const inputForm = 'email';
  const { values, handleSubmit, submitting, errors, whatsappMessage, t, hideModal } = props;
  const handleForm = () => {
    handleSubmit();
    hideModal();
  };
  return (
    <Form name="invite" onShare={handleForm}>
      {inputForm === 'email' ? (
        <Field
          name="inviteVal.email"
          component={RenderField}
          type="email"
          placeholder={t('socialSharingButton.email')}
          label={t('socialSharingButton.email')}
          value={values.inviteVal.email}
        />
      ) : (
        <Field
          name="inviteVal.number"
          component={RenderField}
          type="number"
          placeholder={t('socialSharingButton.number')}
          label={t('socialSharingButton.number')}
          value={values.inviteVal.number}
        />
      )}
      <h3>{t('socialSharingButton.text')}</h3>
      <br />
      <Card>{whatsappMessage}</Card>
      <br />
      <div align="right">
        <Button disabled={submitting} color="primary" onClick={() => handleSubmit(values)}>
          {t('socialSharingButton.btn.share')}
        </Button>
      </div>
      <div>{errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}</div>
    </Form>
  );
};
export default MailButtonForm;

MailButtonForm.propTypes = {
  twitterMessage: PropTypes.object,
  whatsappMessage: PropTypes.string,
  emailMessage: PropTypes.string,
  link: PropTypes.string,
  handleSubmit: PropTypes.func,
  onShare: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  hideEmailButton: PropTypes.bool,
  values: PropTypes.object,
  t: PropTypes.func,
  hideModal: PropTypes.func
};
