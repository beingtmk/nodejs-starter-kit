import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Col, message, Modal, Card, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import { Form, RenderField, Alert } from '@gqlapp/look-client-react';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

const SocialSharingButtonsSchema = {
  inviteVal: [required]
};

const Img = styled.img`
  &:hover {
    transform: scale(1.2);
  }
`;

const SocialSharingButtons = props => {
  const { values, handleSubmit, submitting, errors, twitterMessage, whatsappMessage, link, hideEmailButton } = props;
  const [visible, setVisible] = useState(false);
  const inputForm = 'email';

  const sharingMenu = (
    <Card bodyStyle={{ padding: '5px' }}>
      <a href={`http://www.facebook.com/share.php?u=${link}`} target="_blank" rel="noopener noreferrer">
        <Button shape="circle" type="link" ghost size="large" style={{ fontSize: '22px' }}>
          <Img src={require('./assets/facebook.svg')} height="30" width="30" align="centre" />
        </Button>
      </a>
      <a
        href={`http://www.reddit.com/submit?url=${link}&title=Checkout%20this%20Listing`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button shape="circle" type="link" ghost size="large" style={{ fontSize: '22px' }}>
          <Img src={require('./assets/reddit.svg')} height="30" width="30" align="centre" />
        </Button>
      </a>
      <a
        href={`https://twitter.com/share?url=${twitterMessage.link}&amp;text=${twitterMessage.text}&amp;hashtags=${twitterMessage.hashtag}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button shape="circle" type="link" ghost size="large" style={{ fontSize: '22px' }}>
          <Img src={require('./assets/twitter.svg')} height="30" width="30" align="centre" />
        </Button>
      </a>
      <a href={`https://web.whatsapp.com/send?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
        <Button shape="circle" type="link" ghost size="large" style={{ fontSize: '22px' }}>
          <Img src={require('./assets/whatsapp.svg')} height="30" width="30" align="centre" />
        </Button>
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`} target="_blank" rel="noopener noreferrer">
        <Button shape="circle" type="link" ghost size="large" style={{ fontSize: '22px' }}>
          <Img src={require('./assets/linkedin.svg')} height="30" width="30" align="centre" />
        </Button>
      </a>
      {!hideEmailButton && (
        <Button
          shape="circle"
          onClick={() => setVisible(true)}
          type="link"
          size="large"
          ghost
          style={{ fontSize: '22px' }}
        >
          <Img src={require('./assets/mail.svg')} height="30" width="30" align="centre" />
        </Button>
      )}
    </Card>
  );
  return (
    <Col span={24} style={{ height: '50px' }}>
      <Dropdown overlay={sharingMenu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          <Button shape="circle" type="primary" ghost size="large" style={{ fontSize: '22px' }} icon="share-alt" />
        </a>
      </Dropdown>

      <Modal title="Share listing by mail" centered footer={null} visible={visible} onCancel={() => setVisible(false)}>
        <Form name="invite" onShare={handleSubmit}>
          {inputForm === 'email' ? (
            <Field
              name="inviteVal.email"
              component={RenderField}
              type="email"
              placeholder="Enter E-mail to invite"
              value={values.inviteVal.email}
            />
          ) : (
            <Field
              name="inviteVal.number"
              component={RenderField}
              type="number"
              placeholder="Enter Number to invite"
              value={values.inviteVal.number}
            />
          )}
          <h3>
            <strong>Text:</strong>
          </h3>
          <br />
          <Card>{whatsappMessage}</Card>
          <br />
          <div align="right">
            <Button disabled={submitting} type="primary" onClick={() => handleSubmit(values)}>
              Share
            </Button>
          </div>
          <div>{errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}</div>
        </Form>
      </Modal>
    </Col>
  );
};

SocialSharingButtons.propTypes = {
  twitterMessage: PropTypes.object,
  whatsappMessage: PropTypes.string,
  emailMessage: PropTypes.string,
  link: PropTypes.string,
  handleSubmit: PropTypes.func,
  onShare: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  hideEmailButton: PropTypes.bool,
  values: PropTypes.object
};

const SocialSharingButtonsWithFormik = withFormik({
  mapPropsToValues: () => ({
    inviteVal: []
  }),
  validate: values => validate(values, SocialSharingButtonsSchema),
  async handleSubmit(values, { props: { onShare, emailMessage } }) {
    if (!values.inviteVal.number && !values.inviteVal.email) {
      message.warn('No One to Share with!');
    }

    if (values.inviteVal.number) {
      let x = values.inviteVal.number.toString();
      x.length >= 10 ? message.warn('Function not defined yet!') : message.warn('Enter a valid Phone Number');
    }

    if (values.inviteVal.email) {
      // delete values["inviteVal"];
      onShare({ email: values.inviteVal.email, message: emailMessage });
      message.warn('Sending email!');
    }
    console.log(values);
  },
  enableReinitialize: true,
  displayName: 'ShareForm' // helps with React DevTools
});

export default SocialSharingButtonsWithFormik(SocialSharingButtons);
