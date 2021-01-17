import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import { Icon, ModalDrawer, Col, Message, Button, Row, Input } from '@gqlapp/look-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import MailButtonForm from './MailButtonForm';

const SocialSharingButtonsSchema = {
  inviteVal: [required]
};

const Img = styled.img`
  &:hover {
    transform: scale(1.2);
  }
`;

const SocialSharingButtons = props => {
  const { twitterMessage, whatsappMessage, link, hideEmailButton, t } = props;
  const sharingMenu = (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <a href={`http://www.facebook.com/share.php?u=${link}`} target="_blank" rel="noopener noreferrer">
                <Button shape="circle" color="link" ghost size="lg" style={{ fontSize: '22px', paddingTop: '-0px' }}>
                  <Img
                    src={
                      'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-circle-64.png'
                    }
                    height="50"
                    width="50"
                    align="centre"
                    style={{ borderRadius: '90px' }}
                  />
                </Button>
              </a>
            </Col>
            <Col>
              <a
                href={`http://www.reddit.com/submit?url=${link}&title=Checkout%20this%20Listing`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button shape="circle" color="link" ghost size="lg" style={{ fontSize: '22px' }}>
                  <Img
                    src={
                      'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-reddit-circle-64.png'
                    }
                    height="50"
                    width="50"
                    align="centre"
                    style={{ borderRadius: '90px' }}
                  />
                </Button>
              </a>
            </Col>
            <Col>
              <a
                href={`https://twitter.com/share?url=${twitterMessage.link}&amp;text=${twitterMessage.text}&amp;hashtags=${twitterMessage.hashtag}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button shape="circle" color="link" ghost size="lg" style={{ fontSize: '22px' }}>
                  <Img
                    src={
                      'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-twitter-circle-64.png'
                    }
                    height="50"
                    width="50"
                    align="centre"
                    style={{ borderRadius: '90px' }}
                  />
                </Button>
              </a>
            </Col>
            <Col>
              <a
                href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
                dataAction="share/whatsapp/share"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button shape="circle" color="link" ghost size="lg" style={{ fontSize: '22px' }}>
                  <Img
                    src={
                      'https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-64.png'
                    }
                    height="50"
                    width="50"
                    align="centre"
                    style={{ borderRadius: '90px' }}
                  />
                </Button>
              </a>
            </Col>
            <Col>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button shape="circle" color="link" ghost size="lg" style={{ fontSize: '22px' }}>
                  <Img
                    src={
                      'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-linkedin-circle-64.png'
                    }
                    height="50"
                    width="50"
                    align="centre"
                    style={{ borderRadius: '90px' }}
                  />
                </Button>
              </a>
            </Col>
            {!hideEmailButton && (
              <>
                <Col>
                  <ModalDrawer
                    buttonText={
                      <Img
                        src={'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Mail-64.png'}
                        height="50"
                        width="50"
                        align="centre"
                        style={{ borderRadius: '90px' }}
                      />
                    }
                    type="link"
                    shape="circle"
                    modalTitle={t('socialSharingButton.title')}
                    height="auto"
                    ghost={true}
                    style={{ fontSize: '22px' }}
                    size="large"
                  >
                    <MailButtonForm {...props} />
                  </ModalDrawer>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
      <Row type="flex" justify="space-between" style={{ paddingTop: '15px' }}>
        <Col xs={0} lg={24}>
          <Row justify="space-between">
            <Col span={4}>
              <h5>FaceBook</h5>
            </Col>
            <Col span={4}>
              <h5 style={{ paddingLeft: '15px' }}>Reddit</h5>
            </Col>
            <Col span={4}>
              <h5 style={{ paddingLeft: '20px' }}>Twitter</h5>
            </Col>
            <Col span={4}>
              <h5 style={{ paddingLeft: '15px' }}>Whatsapp</h5>
            </Col>
            <Col span={4}>
              <h5 style={{ paddingLeft: '25px' }}>Linkedin</h5>
            </Col>
            <Col span={4}>
              <h5 style={{ paddingLeft: '40px' }}>Mail</h5>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row type="flex" style={{ paddingTop: '15px' }}>
        <Col span={24}>
          <Row type="flex" gutter={24}>
            <Col lg={20} xs={24}>
              <Input value={link} />
            </Col>
            <Col xs={24} lg={0}>
              <br />
            </Col>
            <Col lg={4} xs={24}>
              <div>
                <Button
                  color="primary"
                  ghost={true}
                  block
                  onClick={async () => {
                    await window.navigator.clipboard.writeText(link);
                    Message.success('Copied to clipboard!');
                  }}
                >
                  Copy
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

  return (
    <Col span={24} style={{ height: '50px' }}>
      <ModalDrawer
        buttonText={<Icon type="ShareAltOutlined" />}
        modalTitle="Share listing"
        height="auto"
        shape="circle"
        ghost={true}
        block={false}
        type="primary"
      >
        {sharingMenu}
      </ModalDrawer>
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
  values: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func
};

const SocialSharingButtonsWithFormik = withFormik({
  mapPropsToValues: () => ({
    inviteVal: []
  }),
  validate: values => validate(values, SocialSharingButtonsSchema),
  async handleSubmit(values, { props: { onShare, emailMessage } }) {
    if (!values.inviteVal.number && !values.inviteVal.email) {
      Message.warn('No One to Share with!');
    }

    if (values.inviteVal.number) {
      let x = values.inviteVal.number.toString();
      x.length >= 10 ? Message.warn('Function not defined yet!') : Message.warn('Enter a valid Phone Number');
    }

    if (values.inviteVal.email) {
      // delete values["inviteVal"];
      onShare({ email: values.inviteVal.email, Message: emailMessage });
      Message.warn('Sending email!');
    }
    console.log(values);
  },
  enableReinitialize: true,
  displayName: 'ShareForm' // helps with React DevTools
});

export default SocialSharingButtonsWithFormik(SocialSharingButtons);
