import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik, FieldArray } from 'formik';

import { Button, RenderCheckBox, RenderUpload, Icon, Card, RenderField, Form } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';

import RendersubCategories from './RendersubCategories';

const CategoryFormSchema = {
  title: [required],
};

const CategoryFormComponent = props => {
  const { cardTitle, handleSubmit, values, t, showAdditional = false } = props;
  const [load, setLoad] = useState(false);
  return (
    <Card
      title={
        <>
          <h3>
            <Icon type="SolutionOutlined" />
            &nbsp;
            <strong>{displayDataCheck(cardTitle)}</strong>
          </h3>
          <div align="center">
            <div key="line" className="title-line-wrapper" align="left">
              <div
                className="title-line"
                // style={{ transform: "translateX(-64px)" }}
              />
            </div>
          </div>
        </>
      }
    >
      <Form onSubmit={handleSubmit} align="left">
        <Field
          name="title"
          component={RenderField}
          placeholder={t('categoryForm.title')}
          type="text"
          label={t('categoryForm.title')}
          value={values.title}
        />
        <Field
          name="description"
          component={RenderField}
          placeholder={t('categoryForm.description')}
          type="textarea"
          label={t('categoryForm.description')}
          value={values.description}
        />
        <Field name="isNavbar" component={RenderCheckBox} type="checkbox" label={'Is Navbar'} checked={values.isNavbar} />
        <Field
          name="imageUrl"
          component={RenderUpload}
          type="text"
          setload={setLoad}
          label={'Image url'}
          value={values.imageUrl}
        />
        {showAdditional && (
          <FieldArray
            name={'subCategories'}
            render={arrayHelpers => (
              <RendersubCategories
                name={'subCategories'}
                arrayHelpers={arrayHelpers}
                values={values.subCategories}
                // label={"Add Choices"}
                setload={setLoad}
              />
            )}
          />
        )}
        <Button color="primary" type="submit" disabled={load}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

CategoryFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  t: PropTypes.func,
  cardTitle: PropTypes.string,
  showAdditional: PropTypes.bool,
};

const CategoryWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.category && props.category.id) || null,
      title: (props.category && props.category.title) || '',
      description: (props.category && props.category.description) || '',
      isNavbar: (props.category && props.category.isNavbar) || false,
      imageUrl: (props.category && props.category.imageUrl) || '',
      subCategories: (props.category && props.category.subCategories) || [],
    };
  },
  async handleSubmit(values, { props: { onSubmit } }) {
    await onSubmit(values);
  },
  validate: values => validate(values, CategoryFormSchema),
  displayName: 'Category Form', // helps with React DevTools
});

export default CategoryWithFormik(CategoryFormComponent);
