import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import {
  Row,
  Col,
  Button,
  RenderCheckBox,
  Option,
  RenderUpload,
  RenderSelect,
  Icon,
  Card,
  RenderField,
  Form
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { displayDataCheck } from '@gqlapp/listing-client-react';
import { MODAL } from '@gqlapp/review-common';

import CategoryTreeComponent from '../containers/CategoryTreeComponent';
// import RendersubCategories from './RendersubCategories';

const CategoryFormSchema = {
  title: [required],
  modalName: [required]
};

const CategoryFormComponent = props => {
  const { cardTitle, handleSubmit, values, t } = props;
  const [load, setLoad] = useState(false);

  // console.log('props form component', props.values.imageUrl);
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
      {/* {console.log(values)} */}
      <Form onSubmit={handleSubmit} align="left">
        <Row type="flex" gutter={24}>
          <Col md={12} xs={24} align="left">
            <Field
              name="title"
              icon="FontSizeOutlined"
              component={RenderField}
              placeholder={t('categoryForm.title')}
              type="text"
              label={t('categoryForm.title')}
              value={values.title}
            />
          </Col>
          <Col md={12} xs={24} align="left">
            <Field
              name="modalName"
              icon="SafetyCertificateOutlined"
              component={RenderSelect}
              placeholder={t('categoryForm.modalName')}
              defaultValue={values.modalName}
              label={t('categoryForm.modalName')}
              style={{ width: '100px' }}
              value={values.modalName}
            >
              {MODAL.map((m, i) => (
                <Option key={i} value={m.value}>
                  {m.label}
                </Option>
              ))}
            </Field>
          </Col>
          <Col md={12} xs={24} align="left">
            <Field
              name="description"
              icon="FileOutlined"
              component={RenderField}
              placeholder={t('categoryForm.description')}
              type="textarea"
              label={t('categoryForm.description')}
              value={values.description}
            />
          </Col>
          <Col md={12} xs={24} align="left">
            <Field
              component={CategoryTreeComponent}
              nullable={true}
              // disableParent={false}
              filter={{ modalName: values.modalName }}
              type="number"
              name="parentCategoryId"
              placeholder="category"
              label={t('categoryForm.select')}
              value={values.parentCategoryId}
            />
            <Row type="flex">
              <Col md={12} xs={24} align="left">
                <Field
                  name="isNavbar"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('categoryForm.isNavbar')}
                  checked={values.isNavbar}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="imageUrl"
                  component={RenderUpload}
                  type="text"
                  setload={setLoad}
                  label={t('categoryForm.imageUrl')}
                  value={values.imageUrl}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} align="right">
            <Button color="primary" type="submit" disabled={load}>
              {t('categoryForm.btn.submit')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

CategoryFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  t: PropTypes.func,
  cardTitle: PropTypes.string,
  showAdditional: PropTypes.bool
};

const CategoryWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.category && props.category.id) || null,
      title: (props.category && props.category.title) || '',
      modalName: (props.category && props.category.modalCategory && props.category.modalCategory.modalName) || '',
      parentCategoryId: (props.category && props.category.parentCategoryId) || null,
      description: (props.category && props.category.description) || '',
      isNavbar: (props.category && props.category.isNavbar) || false,
      imageUrl: (props.category && props.category.imageUrl) || ''
      // subCategories: (props.category && props.category.subCategories) || [],
    };
  },
  async handleSubmit(values, { props: { onSubmit } }) {
    await onSubmit(values);
  },
  validate: values => validate(values, CategoryFormSchema),
  displayName: 'Category Form' // helps with React DevTools
});

export default CategoryWithFormik(CategoryFormComponent);
