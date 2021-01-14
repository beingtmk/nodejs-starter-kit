import React from 'react';
import PropTypes from 'prop-types';

import { CategoryTreeComponent } from '@gqlapp/category-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import {
  Space,
  Tooltip,
  FormItem,
  NextButton,
  AddButton,
  Button,
  Icon,
  Row,
  Col,
  RenderField
} from '@gqlapp/look-client-react';
import { MODAL } from '@gqlapp/review-common';

const DetailsFormFields = props => {
  const { values, listingHighlight, t, setFieldValue } = props;
  let formItemsListingHighlight = null;

  if (listingHighlight.length > 0) {
    formItemsListingHighlight = listingHighlight.map((v, index) => (
      <Col span={12}>
        <FormItem required={false} key={index} style={{ margin: '0 5px' }}>
          <Row type="flex" align="middle">
            <Col span={20}>
              <FormItem
                //  style={{ display: 'inline-block', margin: '0px 5px' }}
                key={index}
              >
                <Field
                  name={`listingHighlight[${index}].highlight`}
                  icon={'MenuOutlined'}
                  component={RenderField}
                  placeholder={`Hightlight ${index + 1}`}
                  type="text"
                  label={`Hightlight ${index + 1}`}
                  value={v.highlight}
                  key={index}
                />
              </FormItem>
            </Col>
            <Col span={4} align="right">
              <Button
                color={'danger'}
                shape="circle"
                icon={<Icon type={'DeleteOutlined'} />}
                onClick={() => setFieldValue('listingHighlight', listingHighlight.splice(index, 1) && listingHighlight)}
                style={{ marginBottom: '25px' }}
              />
            </Col>
          </Row>
        </FormItem>
      </Col>
    ));
  }
  const addHighlight = () => {
    const obj = {
      highlight: ''
    };
    setFieldValue('listingHighlight', [...values.listingHighlight, obj]);
  };

  return (
    <Row type="flex" gutter={24}>
      <Col md={12} xs={24} align="left">
        <Field
          name="title"
          icon="FontSizeOutlined"
          component={RenderField}
          placeholder={t('listingForm.title')}
          type="text"
          label={t('listingForm.title')}
          value={values.title}
        />
        <Field
          icon="FileOutlined"
          name="description"
          component={RenderField}
          placeholder={t('listingForm.description')}
          type="textarea"
          label={t('listingForm.description')}
          value={values.description}
        />
      </Col>
      <Col md={12} xs={24} align="left">
        <Field
          name="sku"
          icon={'BarcodeOutlined'}
          component={RenderField}
          placeholder={t('listingForm.SKU')}
          type="text"
          label={t('listingForm.SKU')}
          value={values.sku}
        />
        <Field
          name="listingCostArray[0].cost"
          component={RenderField}
          placeholder={t('listingForm.cost')}
          type="number"
          label={<>&#8377;{t('listingForm.cost')}</>}
          min={0}
          value={values.listingCostArray[0].cost}
        />
        <Field
          component={CategoryTreeComponent}
          // disableParent={true}
          nullable={false}
          filter={{ modalName: MODAL[1].value }}
          type="number"
          name="categoryId"
          placeholder="category"
          label="Select a category"
          value={values.categoryId}
        />
      </Col>
      <Col md={8} xs={24} align="left">
        <Field
          name="brand"
          icon="FireOutlined"
          component={RenderField}
          placeholder={t('listingForm.brand')}
          type="text"
          label={t('listingForm.brand')}
          value={values.brand}
        />
      </Col>
      <Col md={8} xs={24} align="left">
        <Field
          icon="ProjectOutlined"
          name="listingDetail.inventoryCount"
          component={RenderField}
          placeholder={t('listingForm.invontoryCount')}
          type="number"
          label={t('listingForm.invontoryCount')}
          min={0}
          value={values.listingDetail.inventoryCount}
        />
      </Col>
      <Col md={8} xs={24} align="left">
        <Field
          name="listingOptions.fixedQuantity"
          icon="NodeIndexOutlined"
          component={RenderField}
          placeholder={`${t('listingForm.fixedQuantity')} ${t('listingForm.tooltip')}`}
          type="number"
          // tooltip={{ title: t('listingForm.tooltip'), icon: <InfoCircleOutlined /> }}
          label={
            <>
              {t('listingForm.fixedQuantity')}
              <Tooltip title={t('listingForm.tooltip')}>
                <Icon type="InfoCircleOutlined" />
              </Tooltip>
            </>
          }
          min={-1}
          max={values.listingDetail.inventoryCount}
          value={values.listingOptions.fixedQuantity}
        />
      </Col>
      <Col span={24} align="left">
        <Row>
          <Col span={18}>
            <FormItem
              label={
                <Space align="center">
                  <Icon type="MenuOutlined" />
                  {'Add Highlight'}
                </Space>
              }
            ></FormItem>
          </Col>
          <Col span={6} align="right">
            <AddButton color="primary" onClick={addHighlight} block={false}>
              Add
            </AddButton>
          </Col>
        </Row>
        <Col span={24}>
          <Row type="flex" gutter={24}>
            {formItemsListingHighlight}
          </Row>
        </Col>
      </Col>

      <Col span={24} align="right">
        <br />
        <NextButton style={{ width: 'auto' }} type="submit">
          {t('listingForm.btn.next')}
        </NextButton>
      </Col>
    </Row>
  );
};

DetailsFormFields.propTypes = {
  values: PropTypes.object,
  listingHighlight: PropTypes.object,
  t: PropTypes.func,
  setFieldValue: PropTypes.func
};

export default DetailsFormFields;
