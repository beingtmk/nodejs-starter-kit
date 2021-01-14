import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { validate, required } from '@gqlapp/validation-common-react';
import { displayDataCheck } from '@gqlapp/listing-client-react';
import {
  Card,
  Icon,
  Form,
  RenderField,
  RenderSelect,
  Option,
  Row,
  Col,
  Image,
  Divider,
  RenderUpload,
  SubmitButton,
  Button
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { PLATFORM_TYPE } from '@gqlapp/setting-common';
import { NO_IMG } from '@gqlapp/listing-common';

const SettingFormSchema = {
  logo: [required],
  type: [required]
};

const SettingForm = props => {
  const { handleSubmit, t, values, dirty } = props;
  const [load, setLoad] = useState(false);
  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={24}>
        <Col span={24}>
          <h1>
            <Icon type="SettingOutlined" />
            &nbsp;
            <strong>{displayDataCheck('Platform Settings')}</strong>
          </h1>
          <div key="line" className="title-line-wrapper" align="left">
            <div
              className="title-line"
              // style={{ transform: "translateX(-64px)" }}
            />
          </div>
        </Col>
        <Col lg={10}>
          <Image width={'100%'} src={values.logo || NO_IMG} />
          <div style={{ paddingTop: '24px' }} />
          <Card
            title={
              <>
                <h3>
                  <Icon type="ContactsOutlined" />
                  &nbsp;
                  <strong>{displayDataCheck('Plarform Setting')}</strong>
                </h3>
                <div key="line" className="title-line-wrapper" align="left">
                  <div
                    className="title-line"
                    // style={{ transform: "translateX(-64px)" }}
                  />
                </div>
              </>
            }
          >
            <Field
              name="name"
              icon="LaptopOutlined"
              component={RenderField}
              placeholder={t('settingForm.name')}
              type="text"
              label={t('settingForm.name')}
              value={values.name}
            />
            <Field
              name="type"
              icon="SubnodeOutlined"
              component={RenderSelect}
              placeholder={t('settingForm.type')}
              defaultValue={values.type}
              label={t('settingForm.type')}
              value={values.type}
            >
              {PLATFORM_TYPE.map((m, i) => (
                <Option key={i} value={m}>
                  {m}
                </Option>
              ))}
            </Field>
            <Field
              name="logo"
              component={RenderUpload}
              type="text"
              setload={setLoad}
              label={t('settingForm.logo')}
              value={values.logo}
            >
              <Button block color="primary">
                <Icon type="UploadOutlined" /> Upload Logo
              </Button>
            </Field>
          </Card>
        </Col>
        <Col lg={14}>
          <Card
            title={
              <>
                <h3>
                  <Icon type="ContactsOutlined" />
                  &nbsp;
                  <strong>{displayDataCheck('Contact Info')}</strong>
                </h3>
                <div key="line" className="title-line-wrapper" align="left">
                  <div
                    className="title-line"
                    // style={{ transform: "translateX(-64px)" }}
                  />
                </div>
              </>
            }
          >
            <Row gutter={24}>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformInfo.email"
                  icon="MailOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.email')}
                  type="text"
                  label={t('settingForm.email')}
                  value={values.platformInfo.email}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformInfo.mobile"
                  icon="MobileOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.mobile')}
                  type="text"
                  label={t('settingForm.mobile')}
                  value={values.platformInfo.mobile}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformInfo.address"
                  icon="HomeOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.address')}
                  type="text"
                  label={t('settingForm.address')}
                  value={values.platformInfo.address}
                />
              </Col>
            </Row>
          </Card>
          <Divider />
          <Card
            title={
              <>
                <h3>
                  <Icon type="AndroidOutlined" />
                  &nbsp;
                  <strong>{displayDataCheck('Social Info')}</strong>
                </h3>
                <div key="line" className="title-line-wrapper" align="left">
                  <div
                    className="title-line"
                    // style={{ transform: "translateX(-64px)" }}
                  />
                </div>
              </>
            }
          >
            <Row gutter={24}>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformSocial.youtube"
                  icon="YoutubeOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.youtube')}
                  type="text"
                  label={t('settingForm.youtube')}
                  value={values.platformSocial.youtube}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformSocial.facebook"
                  icon="FacebookOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.facebook')}
                  type="text"
                  label={t('settingForm.facebook')}
                  value={values.platformSocial.facebook}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformSocial.instagram"
                  icon="InstagramOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.instagram')}
                  type="text"
                  label={t('settingForm.instagram')}
                  value={values.platformSocial.instagram}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformSocial.linkedIn"
                  icon="LinkedinOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.linkedIn')}
                  type="text"
                  label={t('settingForm.linkedIn')}
                  value={values.platformSocial.linkedIn}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="platformSocial.twitter"
                  icon="TwitterOutlined"
                  component={RenderField}
                  placeholder={t('settingForm.twitter')}
                  type="text"
                  label={t('settingForm.twitter')}
                  value={values.platformSocial.twitter}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} align="right">
          <Divider />
          <SubmitButton type="submit" disabled={load && !dirty} block={false}>
            SAVE CHANES
          </SubmitButton>
        </Col>
      </Row>
    </Form>
  );
};

SettingForm.propTypes = {
  handleSubmit: PropTypes.func,
  t: PropTypes.func,
  dirty: PropTypes.bool,
  cardTitle: PropTypes.string,
  values: PropTypes.object
};

const SettingWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.platform && props.platform.id) || null,
      name: (props.platform && props.platform.name) || '',
      logo: (props.platform && props.platform.logo) || '',
      type: (props.platform && props.platform.type) || '',
      platformInfo: (props.platform && {
        id: props.platform.platformInfo && props.platform.platformInfo.id,
        mobile: props.platform.platformInfo && props.platform.platformInfo.mobile,
        email: props.platform.platformInfo && props.platform.platformInfo.email,
        address: props.platform.platformInfo && props.platform.platformInfo.address,
        isActive: props.platform.platformInfo && props.platform.platformInfo.isActive
      }) || {
        id: null,
        mobile: '',
        email: '',
        address: '',
        isActive: ''
      },
      platformSocial: (props.platform && {
        id: props.platform.platformSocial && props.platform.platformSocial.id,
        youtube: props.platform.platformSocial && props.platform.platformSocial.youtube,
        facebook: props.platform.platformSocial && props.platform.platformSocial.facebook,
        instagram: props.platform.platformSocial && props.platform.platformSocial.instagram,
        linkedIn: props.platform.platformSocial && props.platform.platformSocial.linkedIn,
        twitter: props.platform.platformSocial && props.platform.platformSocial.twitter
      }) || {
        id: null,
        youtube: '',
        facebook: '',
        instagram: '',
        linkedIn: '',
        twitter: ''
      },
      isActive: (props.platform && props.platform.isActive) || null
    };
  },
  async handleSubmit(values, { props: { onSubmit } }) {
    await onSubmit(values);
  },
  validate: values => validate(values, SettingFormSchema),
  displayName: 'Setting Form' // helps with React DevTools
});

export default SettingWithFormik(SettingForm);
