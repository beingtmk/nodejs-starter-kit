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
                      'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170780/ypoeagxzxrcwfnhxydir.svg'
                    }
                    height="60"
                    width="60"
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
                      'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170934/lfibgc3woiwkbeubo6w5.svg'
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
                      'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170822/ieq0oplvvympjnwqdhvm.svg'
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
                // href={`https://api.whatsapp.com/send?phone=${phone_number}&text=${title}%20${url}`}
                dataAction="share/whatsapp/share"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button shape="circle" type="link" ghost size="lg" style={{ fontSize: '22px' }}>
                  <Img
                    src={
                      'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602171220/gtd0x3gg3vcmirxdwr19.jpg'
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
                      'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170837/q0hfnknlfdrsnlfq6chx.svg'
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
                        src={
                          'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602171054/pueo2x3cpojocidoeou8.svg'
                        }
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
            <h5 align="center">FaceBook</h5>
            <h5 align="center" style={{ marginLeft: '5px' }}>
              Reddit
            </h5>
            <h5 align="center">Twitter</h5>
            <h5 align="center">Whatsapp</h5>
            <h5 align="center">Linkedin</h5>
            <h5 align="center" style={{ paddingRight: '15px' }}>
              Mail
            </h5>
          </Row>
        </Col>
      </Row>
      <Row type="flex" style={{ paddingTop: '15px' }}>
        <Col span={24}>
          <Row type="flex" gutter={24}>
            <Col lg={{ span: 16, offset: 0 }} xs={24}>
              <Input value={link} />
            </Col>
            <Col xs={24} lg={0}>
              <br />
            </Col>
            <Col lg={{ span: 4, offset: 4 }} xs={24}>
              <div>
                <Button
                  color="primary"
                  ghost={true}
                  block
                  onClick={async () => {
                    await window.navigator.clipboard.writeText(link);
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
