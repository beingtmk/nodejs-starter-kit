import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import {
  Row,
  Col,
  Form,
  RenderCheckBox,
  Option,
  RenderField,
  RenderUpload,
  SubmitButton,
  RenderSelect
} from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';
import { IMG_ASPECT } from '@gqlapp/listing-common';

const DynamicCarouselFormSchema = {
  imageUrl: [required]
};

const DynamicCarouselFormComponent = props => {
  const [load, setLoad] = useState(false);
  const { t, values, handleSubmit, setFieldValue } = props;

  // console.log('props form component', props.values.imageUrl);
  return (
    <>
      <Field
        name="title"
        icon="FontSizeOutlined"
        component={RenderField}
        placeholder={t('dynamicCarousel.form.title')}
        type="text"
        label={t('dynamicCarousel.form.title')}
        value={values.title}
      />
      <Field
        name="description"
        icon="FileOutlined"
        component={RenderField}
        placeholder={t('dynamicCarousel.form.description')}
        type="textarea"
        label={t('dynamicCarousel.form.description')}
        value={values.description}
      />
      <Form onSubmit={handleSubmit}>
        <Row type="flex" gutter={24}>
          <Col span={12}>
            <Field
              name="label"
              component={RenderSelect}
              placeholder={t('dynamicCarousel.form.label')}
              defaultValue={values.label}
              onChange={e => setFieldValue('label', e)}
              label={t('dynamicCarousel.form.label')}
              style={{ width: '100px' }}
              value={values.label}
              selectStyle={{ width: '130px' }}
            >
              <Option key={1} value={''}>
                All
              </Option>
              {LABEL &&
                LABEL.map((l, i) => (
                  <Option key={i + 2} value={l}>
                    {l}
                  </Option>
                ))}
            </Field>
          </Col>
          <Col span={12}>
            <Field
              name="isActive"
              component={RenderCheckBox}
              type="checkbox"
              label={t('dynamicCarousel.form.isActive')}
              checked={values.isActive}
            />
          </Col>
        </Row>
        <Field
          name="link"
          component={RenderField}
          placeholder={t('dynamicCarousel.form.link')}
          type="text"
          label={t('dynamicCarousel.form.link')}
          value={values.link}
        />
        <Field
          name="imageUrl"
          value={values.imageUrl}
          setload={e => setLoad(e)}
          load={load}
          height={IMG_ASPECT.medium.height}
          width={IMG_ASPECT.medium.width}
          component={RenderUpload}
          label={t('dynamicCarousel.form.imageUrl')}
        />
        <SubmitButton color="primary" type="submit" disabled={load}>
          {t('dynamicCarousel.btn.submit')}
        </SubmitButton>
      </Form>
    </>
  );
};

DynamicCarouselFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object
};

const DynamicCarouselWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.dynamicCarousel && props.dynamicCarousel.id) || null,
      title: (props.dynamicCarousel && props.dynamicCarousel.title) || '',
      description: (props.dynamicCarousel && props.dynamicCarousel.description) || '',
      link: (props.dynamicCarousel && props.dynamicCarousel.link) || null,
      label: (props.dynamicCarousel && props.dynamicCarousel.label) || '',
      imageUrl: (props.dynamicCarousel && props.dynamicCarousel.imageUrl) || '',
      isActive: props.dynamicCarousel && (props.dynamicCarousel.isActive ? true : false)
    };
  },
  handleSubmit(values, { props: { onSubmit } }) {
    // console.log('on submit called', values);
    onSubmit(values);
  },
  validate: values => validate(values, DynamicCarouselFormSchema),
  displayName: 'DynamicCarouselForm' // helps with React DevTools
});

export default DynamicCarouselWithFormik(DynamicCarouselFormComponent);
