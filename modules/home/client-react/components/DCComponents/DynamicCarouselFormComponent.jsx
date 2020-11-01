import React from 'react';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import {
  Row,
  Col,
  Form,
  RenderCheckBox,
  FormItem,
  Select,
  Option,
  RenderField,
  RenderUpload,
  SubmitButton
} from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';

const DynamicCarouselFormSchema = {
  imageUrl: [required]
};

class DynamicCarouselFormComponent extends React.Component {
  state = {
    load: false
  };
  render() {
    const { t, values, handleSubmit, setFieldValue } = this.props;

    // console.log('props form component', this.props.values);
    return (
      <>
        <Field
          name="title"
          component={RenderField}
          placeholder={t('dynamicCarousel.form.title')}
          type="text"
          label={t('dynamicCarousel.form.title')}
          value={values.title}
        />
        <Field
          name="description"
          component={RenderField}
          placeholder={t('dynamicCarousel.form.description')}
          type="textarea"
          label={t('dynamicCarousel.form.description')}
          value={values.description}
        />
        <Form onSubmit={handleSubmit}>
          <Row type="flex" gutter={24}>
            <Col span={12}>
              <FormItem label={t('dynamicCarousel.form.label')}>
                <Select
                  name="label"
                  defaultValue={values.label}
                  style={{ width: '130px' }}
                  onChange={e => setFieldValue('label', e)}
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
                </Select>
              </FormItem>
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
            component={RenderUpload}
            type="text"
            setload={e => this.setState({ load: e })}
            label={t('dynamicCarousel.form.imageUrl')}
            value={values.imageUrl}
          />
          <SubmitButton color="primary" type="submit" disabled={this.state.load}>
            {t('dynamicCarousel.btn.submit')}
          </SubmitButton>
        </Form>
      </>
    );
  }
}

DynamicCarouselFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object
};

const DynamicCarouselWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: (props.dynamicCarousel && props.dynamicCarousel.id) || null,
    title: (props.dynamicCarousel && props.dynamicCarousel.title) || '',
    description: (props.dynamicCarousel && props.dynamicCarousel.description) || '',
    link: (props.dynamicCarousel && props.dynamicCarousel.link) || null,
    label: (props.dynamicCarousel && props.dynamicCarousel.label) || '',
    imageUrl: (props.dynamicCarousel && props.dynamicCarousel.imageUrl) || '',
    isActive: props.dynamicCarousel && (props.dynamicCarousel.isActive ? true : false)
  }),

  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    console.log('on submit called', values);
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, DynamicCarouselFormSchema),
  displayName: 'DynamicCarouselForm' // helps with React DevTools
});

export default DynamicCarouselWithFormik(DynamicCarouselFormComponent);
