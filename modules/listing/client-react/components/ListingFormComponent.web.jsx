import React, { useState } from 'react';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';
import { Tooltip, message, Card, Button } from 'antd';
import { withFormik, FieldArray } from 'formik';
import moment from 'moment';

import { NO_IMG } from '@gqlapp/listing-common';
import {
  Form,
  Row,
  Col,
  RenderField,
  RenderUploadMultiple,
  FormItem,
  RenderCheckBox,
  NextButton,
  SubmitButton,
  Icon,
  RenderDatePicker
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import { MODAL } from '@gqlapp/review-common';

const VIDEO = 'video';
const LAST_STEP = 3;

const ListingFormSchema = [
  Yup.object().shape({
    title: Yup.string()
      .min(5)
      .required(),
    // .when(['listingCostArray', 'listingDetail'], (listingCostArray, listingDetail, schema) => {
    //   console.log('listingCostArray', listingCostArray, listingDetail);
    //   return schema.required('bleh');
    // }),
    listingCostArray: Yup.array().of(
      Yup.object().shape({
        cost: Yup.number()
          .required()
          .typeError('Cost is required field')
      })
    ),
    listingDetail: Yup.object().shape({
      inventoryCount: Yup.number()
        .min(1, 'Inventory count must be greater than or equal to 1')
        .required()
    }),
    listingOptions: Yup.object().shape({
      fixedQuantity: Yup.mixed()
        .required()
        .test('lessThanInventoryCount', 'Fixed quantity must be less than or equal to "Inventory Count"', function(
          value
        ) {
          const inventoryCount = this.options.from[1].value.listingDetail.inventoryCount;
          if (value === 0) {
            return this.createError({ message: 'Fixed quantity is required (Use -1)' });
          }
          return value <= inventoryCount ? true : false;
        })
        .required()
    })
  }),
  Yup.object().shape({
    listingFlags: Yup.object().shape({
      isDiscount: Yup.boolean()
    }),
    listingCostArray: Yup.array().of(
      Yup.object().shape({
        discount: Yup.mixed().test('hasDiscount', 'Discount is required (>0) or disable Is discount', function(value) {
          const isDiscount = this.options.from[1].value.listingFlags.isDiscount;
          return isDiscount && value <= 0
            ? false
            : value < 100
            ? true
            : this.createError({ message: 'Discount must be less than 100' });
        })
      })
    )
  }),
  Yup.object().shape({
    listingMedia: Yup.object().shape({
      video: Yup.array().of(
        Yup.object().shape({
          url: Yup.string().required('Url is required or delete field')
        })
      )
    })
  })
];

const ListingFormComponent = props => {
  const [load, setLoad] = useState(false);
  const { t, step, setStep, setFieldValue, cardTitle, values, handleSubmit } = props;
  const videos = values.listingMedia.video;
  const listingHighlight = values.listingHighlight;
  const isDiscount = values.listingFlags.isDiscount || (values.isTimeStamp && true);
  let formItemsVideos = null;
  let formItemsListingHighlight = null;

  if (videos.length > 0) {
    formItemsVideos = videos.map((v, index) => (
      <FormItem required={false} key={index} style={{ margin: '0 5px' }}>
        <Row type="flex" align="middle">
          <Col span={20}>
            <FormItem
              //  style={{ display: 'inline-block', margin: '0px 5px' }}
              key={index}
            >
              <Field
                name={`listingMedia.video[${index}].url`}
                component={RenderField}
                placeholder={t('listingForm.videoUrl')}
                type="text"
                label={t('listingForm.videoUrl')}
                value={v.url}
                key={index}
              />
            </FormItem>
          </Col>
          <Col span={4} align="right">
            <Button
              type={'danger'}
              shape="circle"
              icon={<Icon type={'DeleteOutlined'} />}
              onClick={() => setFieldValue('listingMedia.video', videos.splice(index, 1) && videos)}
              style={{ marginBottom: '25px' }}
            />
          </Col>
        </Row>
      </FormItem>
    ));
  }

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
                type={'danger'}
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

  const addVideo = () => {
    const obj = {
      url: '',
      type: VIDEO
    };
    props.setFieldValue('listingMedia.video', [...props.values.listingMedia.video, obj]);
  };
  const addHighlight = () => {
    const obj = {
      highlight: ''
    };
    props.setFieldValue('listingHighlight', [...props.values.listingHighlight, obj]);
  };

  console.log('props', props.modalDiscount);
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
      <Form layout={'vertical'} onSubmit={handleSubmit}>
        {step === 0 && (
          <Row type="flex" gutter={24}>
            <Col md={12} xs={24} align="left">
              <Field
                name="title"
                component={RenderField}
                placeholder={t('listingForm.title')}
                type="text"
                label={t('listingForm.title')}
                value={values.title}
              />
              <Field
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
                label={t('listingForm.cost')}
                min={0}
                value={values.listingCostArray[0].cost}
              />
            </Col>
            <Col md={12} xs={24} align="left">
              <Field
                name="listingDetail.inventoryCount"
                component={RenderField}
                placeholder={t('listingForm.invontoryCount')}
                type="number"
                label={t('listingForm.invontoryCount')}
                min={0}
                value={values.listingDetail.inventoryCount}
              />
            </Col>
            <Col md={12} xs={24} align="left">
              <Field
                name="listingOptions.fixedQuantity"
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
                  <FormItem label={'Add Highlight'}></FormItem>
                </Col>
                <Col span={6} align="right">
                  <FormItem>
                    <Button type="primary" onClick={addHighlight}>
                      <Icon type="VideoCameraOutlined" />
                      Add
                    </Button>
                  </FormItem>
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
        )}
        {step === 1 && (
          <Row gutter={24}>
            <Col md={8} xs={24} align="left">
              <Col xs={12} lg={24}>
                <Field
                  name="listingFlags.isFeatured"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('listingForm.isFeatured')}
                  checked={values.listingFlags.isFeatured}
                />
              </Col>
              <Col xs={12} lg={24}>
                <Field
                  name="listingFlags.isDiscount"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('listingForm.isDiscount')}
                  checked={isDiscount}
                />
              </Col>
            </Col>
            <Col md={8} xs={24} align="left">
              <Col xs={12} lg={24}>
                <Field
                  name="isActive"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('listingForm.isActive')}
                  checked={values.isActive}
                />
              </Col>
              <Col xs={12} lg={24}>
                {isDiscount && (
                  <Field
                    name="listingCostArray[0].discount"
                    component={RenderField}
                    placeholder={t('listingForm.discount')}
                    type="number"
                    label={t('listingForm.discount')}
                    min={0}
                    max={100}
                    value={values.listingCostArray[0].discount}
                  />
                )}
              </Col>
            </Col>
            <Col md={8} xs={24} align="left">
              <Col xs={12} lg={24}>
                <Field
                  name="listingFlags.isNew"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('listingForm.isNew')}
                  checked={values.listingFlags.isNew}
                />
              </Col>
              <Col xs={12} lg={24}>
                {isDiscount && values.listingCostArray[0].discount && (
                  <Field
                    name="finalPrice"
                    component={RenderField}
                    type="number"
                    label={t('listingForm.finalPrice')}
                    disabled={true}
                    value={(
                      values.listingCostArray[0].cost -
                      values.listingCostArray[0].cost * (values.listingCostArray[0].discount / 100)
                    ).toFixed(2)}
                  />
                )}
              </Col>
            </Col>
            <Col md={8} xs={24} align="left">
              {isDiscount && values.discountDuration && (
                <Field
                  name="isTimeStamp"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('listingForm.isTimeStamp')}
                  checked={values.isTimeStamp}
                />
              )}
            </Col>
            <Col md={8} xs={24} align="left">
              {values.isTimeStamp && (
                <Field
                  name={'discountDuration.startDate'}
                  component={RenderDatePicker}
                  // type="range"
                  showTime
                  label={t('listingForm.discountDuration.startDate')}
                  onChange={e => setFieldValue('discountDuration.startDate', e.toISOString())}
                  value={values.discountDuration.startDate ? moment(values.discountDuration.startDate) : moment()}
                />
              )}
            </Col>
            <Col md={8} xs={24} align="left">
              {values.isTimeStamp && (
                <Field
                  name={'discountDuration.endDate'}
                  component={RenderDatePicker}
                  // type="range"
                  showTime
                  label={t('listingForm.discountDuration.endDate')}
                  onChange={e => setFieldValue('discountDuration.endDate', e.toISOString())}
                  value={values.discountDuration.endDate ? moment(values.discountDuration.endDate) : moment()}
                />
              )}
            </Col>
            <Col span={24} align="right">
              <Row>
                <Col span={12} align="left">
                  <br />
                  <Button onClick={() => setStep(0)}>
                    <Icon type="ArrowLeftOutlined" />
                    {t('listingForm.btn.previous')}
                  </Button>
                </Col>
                <Col span={12} align="right">
                  <br />
                  <NextButton style={{ width: 'auto' }} type="submit">
                    {t('listingForm.btn.next')}
                  </NextButton>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {step === 2 && (
          <Row gutter={24}>
            <Col md={12} sm={24} xs={24} lg={12} align="left">
              <Row>
                <Col span={18}>
                  <FormItem label={t('listingForm.addVideo')}></FormItem>
                </Col>
                <Col span={6} align="right">
                  <FormItem>
                    <Button type="primary" onClick={addVideo}>
                      <Icon type="VideoCameraOutlined" />
                      {t('listingForm.btn.add')}
                    </Button>
                  </FormItem>
                </Col>
              </Row>
              <Col span={24}>{formItemsVideos}</Col>
            </Col>
            <Col md={12} sm={24} xs={24} lg={12} align="left">
              <FormItem label={'Add images'}>
                <FieldArray
                  name="listingMedia.image"
                  label={t('listingForm.image')}
                  render={arrayHelpers => (
                    <RenderUploadMultiple
                      setload={load => setLoad(load)}
                      arrayHelpers={arrayHelpers}
                      values={values.listingMedia.image}
                      getType={true}
                      dictKey="url"
                      extraFields={[{ type: 'image' }]}
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col span={24} align="right">
              <Row>
                <Col span={12} align="left">
                  <br />
                  <Button onClick={() => setStep(1)}>
                    <Icon type="ArrowLeftOutlined" />
                    {t('listingForm.btn.previous')}
                  </Button>
                </Col>

                <Col span={12} align="right">
                  <br />
                  <SubmitButton style={{ width: 'auto' }} disable={!load} type="submit">
                    {t('listingForm.btn.submit')}
                  </SubmitButton>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

ListingFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  step: PropTypes.number,
  t: PropTypes.func,
  setFieldValue: PropTypes.func,
  setStep: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  listing: PropTypes.object,
  modalDiscount: PropTypes.object
};

const ListingWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    let listingMedia = {
      image: [],
      video: []
    };
    function getListingImage(listingMedium) {
      const obj = {
        id: (listingMedium && listingMedium.id) || null,
        url: (listingMedium && listingMedium.url) || '',
        type: (listingMedium && listingMedium.type) || '',
        isActive: (listingMedium && listingMedium.isActive) || true
      };
      obj.type === 'image' && listingMedia.image.push(obj);
      obj.type === 'video' && listingMedia.video.push(obj);
    }
    function getCost(listingCost) {
      return {
        id: (listingCost && listingCost.id) || null,
        cost: (listingCost && listingCost.cost) || '',
        discount:
          (listingCost && listingCost.discount) || (props.modalDiscount && props.modalDiscount.discountPercent) || 0,
        type: (listingCost && listingCost.type) || '',
        label: (listingCost && listingCost.label) || ''
      };
    }
    function getListingHighlight(listingHighlight) {
      return {
        id: (listingHighlight && listingHighlight.id) || null,
        highlight: (listingHighlight && listingHighlight.highlight) || ''
      };
    }

    return {
      id: (props.listing && props.listing.id) || null,
      userId:
        (props.listing && props.listing.user && props.listing.user.id) ||
        (props.currentUser && props.currentUser.id) ||
        null,

      title: (props.listing && props.listing.title) || '',
      description: (props.listing && props.listing.description) || '',
      sku: (props.listing && props.listing.sku) || '',
      isActive: props.listing && (props.listing.isActive ? true : false),
      listingHighlight:
        (props.listing && props.listing.listingHighlight && props.listing.listingHighlight.map(getListingHighlight)) ||
        [],
      listingCostArray: (props.listing &&
        props.listing.listingCostArray &&
        props.listing.listingCostArray.map(getCost)) || [
        {
          id: null,
          cost: '',
          discount: 0,
          type: '',
          label: ''
        }
      ],

      listingFlags: (props.listing && props.listing.listingFlags) || {
        id: null,
        isFeatured: false,
        isNew: true,
        isDiscount: false
      },
      discountId: (props.modalDiscount && props.modalDiscount.id) || null,
      isTimeStamp: props.modalDiscount && props.modalDiscount.discountDuration ? true : false,
      discountDuration: {
        id:
          (props.modalDiscount && props.modalDiscount.discountDuration && props.modalDiscount.discountDuration.id) ||
          null,
        startDate:
          (props.modalDiscount &&
            props.modalDiscount.discountDuration &&
            props.modalDiscount.discountDuration.startDate) ||
          null,
        endDate:
          (props.modalDiscount &&
            props.modalDiscount.discountDuration &&
            props.modalDiscount.discountDuration.endDate) ||
          null
      },
      listingOptions: (props.listing && props.listing.listingOptions) || {
        id: null,
        fixedQuantity: -1
      },
      listingDetail: (props.listing && props.listing.listingDetail) || {
        id: null,
        inventoryCount: 1
      },

      listingMedia: (props.listing &&
        props.listing.listingMedia &&
        props.listing.listingMedia.map(getListingImage) &&
        listingMedia) || {
        image: [],
        video: []
      }
    };
  },
  async handleSubmit(values, { props: { onSubmit, step, setStep }, setTouched, setSubmitting }) {
    setStep(step + 1);
    if (step + 1 === LAST_STEP) {
      if (values.listingDetail.inventoryCount < 0) return message.error('Invalid Inventory Count - Less than zero');
      if (values.listingCostArray[0].cost < 0) return message.error('Invalid Listing Cost - Less than zero');
      if (
        values.listingOptions.fixedQuantity < -1 ||
        values.listingOptions.fixedQuantity > values.listingDetail.inventoryCount
      )
        return message.error('Invalid Fixed Quantity - Cannot be less than zero/more than Inventory Count');
      if (values.listingCostArray[0].discount < 0 || values.listingCostArray[0].discount > 100)
        return message.error('Invalid Discount - Less than zero/more than 100');
      // if (< 0) return message.error('Invalid - Less than zero');

      const input = {
        id: values.id,
        userId: values.userId,
        title: values.title,
        description: values.description,
        sku: values.sku,
        isActive: values.isActive
      };
      const discountInput = {
        id: values.discountId,
        modalName: MODAL[1].value,
        discountPercent: values.listingCostArray[0].discount,
        discountDuration: {
          id: values.discountDuration.id,
          startDate: values.discountDuration.startDate,
          endDate: values.discountDuration.endDate
        }
      };
      console.log(!values.isTimeStamp, values.listingCostArray[0].discount, values.listingFlags.isDiscount);
      input.listingCostArray = [];
      const cost = {
        cost: values.listingCostArray[0].cost,
        discount: !values.isTimeStamp ? values.listingCostArray[0].discount : 0,
        type: values.listingCostArray[0].type,
        label: values.listingCostArray[0].label
      };
      input.listingCostArray.push(cost);
      input.listingFlags = {
        id: values.listingFlags.id,
        isFeatured: values.listingFlags.isFeatured,
        isNew: values.listingFlags.isNew,
        isDiscount: !values.isTimeStamp && values.listingFlags.isDiscount
      };
      input.listingOptions = {
        id: values.listingOptions.id,
        fixedQuantity: values.listingOptions.fixedQuantity
      };
      input.listingDetail = {
        id: values.listingDetail.id,
        inventoryCount: values.listingDetail.inventoryCount
      };
      input.listingMedia = [];
      if (values.listingMedia.image.length > 0) {
        input.listingMedia = [...input.listingMedia, ...values.listingMedia.image];
      } else {
        input.listingMedia.push({
          url: NO_IMG,
          type: 'image'
        });
      }
      if (values.listingMedia.video.length > 0) {
        input.listingMedia = [...input.listingMedia, ...values.listingMedia.video];
      }
      if (values.listingHighlight.length > 0) {
        input.listingHighlight = values.listingHighlight;
      }
      console.log(input, discountInput);
      values.isTimeStamp ? await onSubmit(input, discountInput) : await onSubmit(input, false);
    } else {
      setTouched({});
      setSubmitting(false);
    }
  },
  // validate: values => validate(values, ListingFormSchema),
  validationSchema: ({ step }) => ListingFormSchema[step],
  displayName: 'Listing Form' // helps with React DevTools
});

export default ListingWithFormik(ListingFormComponent);
