import React, { useState } from 'react';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';

import { withFormik } from 'formik';

import { NO_IMG } from '@gqlapp/listing-common';
import { Form, Icon, Card } from '@gqlapp/look-client-react';

import DetailsFormFields from './FormComponents/DetailsFormFields';
import FlagsFormFields from './FormComponents/FlagsFormFields';
import MediasFormFields from './FormComponents/MediasFormFields';

import { displayDataCheck } from './functions';

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
            return this.createError({ Message: 'Fixed quantity is required (Use -1)' });
          }
          return value <= inventoryCount ? true : false;
        })
        .required()
    })
  }),
  Yup.object().shape({}),
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

  // console.log('props', props.modalDiscount);
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
          <DetailsFormFields values={values} listingHighlight={listingHighlight} t={t} setFieldValue={setFieldValue} />
        )}
        {step === 1 && <FlagsFormFields values={values} t={t} setStep={setStep} />}
        {step === 2 && (
          <MediasFormFields
            values={values}
            t={t}
            setFieldValue={setFieldValue}
            videos={videos}
            load={load}
            setLoad={setLoad}
            setStep={setStep}
          />
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
          (listingCost && listingCost.discount !== 0 && listingCost.discount) ||
          (props.modalDiscount && props.modalDiscount.discountPercent) ||
          0,
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
      brand: (props.listing && props.listing.brand) || '',
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
      categoryId: (props.listing && props.listing.category && props.listing.category.id) || null,

      listingFlags: (props.listing && props.listing.listingFlags) || {
        id: null,
        isFeatured: false,
        isNew: true,
        isDiscount: false
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
      const input = {
        id: values.id,
        userId: values.userId,
        title: values.title,
        description: values.description,
        sku: values.sku,
        brand: values.brand,
        categoryId: values.categoryId,
        isActive: values.isActive
      };

      input.listingCostArray = [];
      const cost = {
        cost: values.listingCostArray[0].cost,
        // discount: !values.isTimeStamp ? values.listingCostArray[0].discount : 0,
        discount: 0,
        type: values.listingCostArray[0].type,
        label: values.listingCostArray[0].label
      };
      input.listingCostArray.push(cost);
      input.listingFlags = {
        id: values.listingFlags.id,
        isFeatured: values.listingFlags.isFeatured,
        isNew: values.listingFlags.isNew,
        // isDiscount: !values.isTimeStamp && values.listingFlags.isDiscount
        isDiscount: false
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
      await onSubmit(input);
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
