import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Card } from 'antd';
import { withFormik } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField, Button, RenderUpload } from '@gqlapp/look-client-react';

const DynamicCarouselFormSchema = {
  imageUrl: [required]
};

class DynamicCarouselFormComponent extends React.Component {
  state = {
    load: false
  };
  render() {
    const { cardTitle, values, handleSubmit } = this.props;

    // console.log('load', load);

    console.log('props form component', this.props.values);
    return (
      <Card
        title={
          <h1>
            <strong>{cardTitle}</strong>
          </h1>
        }
      >
        <Form onSubmit={handleSubmit}>
          <Field
            name="label"
            component={RenderField}
            placeholder="Label"
            type="text"
            label="Label"
            value={values.label}
          />
          <Field name="link" component={RenderField} placeholder="Link" type="text" label="Link" value={values.link} />
          <Field
            name="imageUrl"
            component={RenderUpload}
            type="text"
            setload={e => this.setState({ load: e })}
            label={'Image url'}
            value={values.imageUrl}
          />
          <Button color="primary" type="submit" disabled={this.state.load}>
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}

DynamicCarouselFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const DynamicCarouselWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: (props.dynamicCarousel && props.dynamicCarousel.id) || null,
    link: (props.dynamicCarousel && props.dynamicCarousel.link) || null,
    label: (props.dynamicCarousel && props.dynamicCarousel.label) || '',
    imageUrl: (props.dynamicCarousel && props.dynamicCarousel.imageUrl) || ''
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
