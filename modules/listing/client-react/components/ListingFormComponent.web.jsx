import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Icon, Form, Card, Button } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderUploadMultiple, FormItem, RenderCheckBox } from '@gqlapp/look-client-react';

const VIDEO = 'video';
const ListingFormSchema = {
  title: [required, minLength(3)]
};

const ButtonGroup = Button.Group;
class ListingFormComponent extends React.Component {
  state = {
    load: false,
    video:
      (this.props.listing &&
        this.props.listing.listingMedia &&
        this.props.listing.listingMedia.filter(lM => lM.type === VIDEO).length) ||
      0
  };
  add = () => {
    let obj = {
      url: '',
      type: VIDEO
    };
    this.props.setFieldValue('listingMedia.video', [...this.props.values.listingMedia.video, obj]);
  };
  render() {
    const { step, setStep, setFieldValue, cardTitle, values, handleSubmit } = this.props;
    const videos = values.listingMedia.video;
    let formItems = null;

    if (videos.length > 0) {
      formItems = videos.map((v, index) => (
        <FormItem required={false} key={index} style={{ margin: '0px' }}>
          <FormItem style={{ display: 'inline-block', margin: '0px 5px' }} key={index}>
            <Field
              name={`listingMedia.video[${index}].url`}
              component={RenderField}
              placeholder={'Video url'}
              type="text"
              label={'Video url'}
              value={v.url}
              key={index}
            />
          </FormItem>
          <Icon
            style={{ paddingTop: '40px' }}
            title="Remove "
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => setFieldValue('listingMedia.video', videos.splice(index, 1) && videos)}
          />
        </FormItem>
      ));
    }

    // console.log('props form component', this.props.values);
    return (
      <Card
        title={
          <h1>
            <Icon type="solution" /> &nbsp;
            <strong>{cardTitle}</strong>
          </h1>
        }
      >
        <Form onSubmit={handleSubmit}>
          {step === 0 && (
            <Row type="flex" gutter={24}>
              <Col md={12} xs={24} align="left">
                <Field
                  name="title"
                  component={RenderField}
                  placeholder="Listing Title"
                  type="text"
                  label="Listing Title"
                  value={values.title}
                />
                <Field
                  name="description"
                  component={RenderField}
                  placeholder="Description"
                  type="textarea"
                  label="Description"
                  value={values.description}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="listingDetail.inventoryCount"
                  component={RenderField}
                  placeholder="Listing Invontory Count"
                  type="number"
                  label="Listing Invontory Count"
                  value={values.listingDetail.inventoryCount}
                />
                <Field
                  name="sku"
                  component={RenderField}
                  placeholder="Listing Sku"
                  type="text"
                  label="Listing Sku"
                  value={values.sku}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="listingCostArray[0].cost"
                  component={RenderField}
                  placeholder="Cost"
                  type="number"
                  label="Cost"
                  value={values.listingCostArray[0].cost}
                />
                <Field
                  name="listingOptions.fixedQuantity"
                  component={RenderField}
                  placeholder="Fixed Quantity"
                  type="number"
                  label="Fixed Quantity"
                  value={values.listingOptions.fixedQuantity}
                />
              </Col>
              <Col md={12} xs={24} align="left">
                <Field
                  name="listingFlags.isDiscount"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={'Is Discount'}
                  checked={values.listingFlags.isDiscount}
                />
                <Field
                  name="listingCostArray[0].discount"
                  component={RenderField}
                  placeholder="Discount"
                  type="number"
                  label="Discount"
                  value={values.listingCostArray[0].discount}
                />
              </Col>
              <Col span={24} align="right">
                <br />
                <Button type="primary" onClick={() => setStep(1)}>
                  Next <Icon type="arrow-right" />
                </Button>
              </Col>
            </Row>
          )}
          {step === 1 && (
            <Row gutter={24}>
              <Col md={8} xs={24} align="left">
                <Field
                  name="listingFlags.isFeatured"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={'Is Featured'}
                  checked={values.listingFlags.isFeatured}
                />
              </Col>
              <Col md={8} xs={24} align="left">
                <Field
                  name="isActive"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={'Is Active'}
                  checked={values.isActive}
                />
              </Col>
              <Col md={8} xs={24} align="left">
                <Field
                  name="listingFlags.isNew"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={'Is New'}
                  checked={values.listingFlags.isNew}
                />
              </Col>
              <Col span={24} align="right">
                <br />
                <ButtonGroup>
                  <Button size="large" onClick={() => setStep(0)}>
                    <Icon type="arrow-left" /> Previous
                  </Button>
                  <Button type="primary" size="large" onClick={() => setStep(2)}>
                    Next <Icon type="arrow-right" />
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          )}
          {step === 2 && (
            <Row gutter={24}>
              <Col md={12} xs={24} align="left">
                <Col span={24}>
                  <Col span={18}>
                    <FormItem label={'Add video url'}>{formItems}</FormItem>
                  </Col>
                  <Col span={6} align="right">
                    <FormItem>
                      <Button type="primary" onClick={this.add}>
                        <Icon type="video-camera" />
                        Add
                      </Button>
                    </FormItem>
                  </Col>
                </Col>
              </Col>
              <Col md={12} xs={24} align="left">
                <FormItem label={'Add images'}>
                  <FieldArray
                    name="listingMedia.image"
                    label={'Listing Image'}
                    render={arrayHelpers => (
                      <RenderUploadMultiple
                        setload={load => this.setState({ load: load })}
                        arrayHelpers={arrayHelpers}
                        values={values.listingMedia.image}
                        getType={true}
                        dictKey="url"
                      />
                    )}
                  />
                </FormItem>
              </Col>
              <Col span={24} align="right">
                <br />
                <ButtonGroup>
                  <Button size="large" onClick={() => setStep(1)}>
                    <Icon type="arrow-left" /> Previous
                  </Button>
                  <Button type="primary" size="large" disable={!this.state.load} onClick={() => handleSubmit(values)}>
                    Submit
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          )}
        </Form>
      </Card>
    );
  }
}

ListingFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  step: PropTypes.number,
  t: PropTypes.func,
  setFieldValue: PropTypes.func,
  setStep: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  listing: PropTypes.object
};

const ListingWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    let listingMedia = {
      image: [],
      video: []
    };
    function getListingImage(listingImg) {
      const obj = {
        id: (listingImg && listingImg.id) || null,
        url: (listingImg && listingImg.url) || '',
        type: (listingImg && listingImg.type) || '',
        isActive: (listingImg && listingImg.isActive) || true
      };
      obj.type === 'image' && listingMedia.image.push(obj);
      obj.type === 'video' && listingMedia.image.push(obj);
    }
    function getCost(listingCost) {
      return {
        id: (listingCost && listingCost.id) || null,
        cost: (listingCost && listingCost.cost) || null,
        discount: (listingCost && listingCost.discount) || null,
        type: (listingCost && listingCost.type) || '',
        label: (listingCost && listingCost.label) || ''
      };
    }

    return {
      id: (props.listing && props.listing.id) || null,
      userId: (props.listing && props.listing.userId) || (props.currentUser && props.currentUser.id) || null,

      title: (props.listing && props.listing.title) || '',
      description: (props.listing && props.listing.description) || '',
      sku: (props.listing && props.listing.sku) || '',
      isActive: (props.listing && props.listing.isActive) || true,
      listingCostArray: (props.listing &&
        props.listing.listingCostArray &&
        props.listing.listingCostArray.map(getCost)) || [
        {
          id: null,
          cost: null,
          discount: null,
          type: '',
          label: ''
        }
      ],

      listingFlags: (props.listing && props.listing.listingFlags) || {
        id: null,
        isFeatured: false,
        isNew: false,
        isDiscount: false
      },
      listingOptions: (props.listing && props.listing.listingOptions) || {
        id: null,
        fixedQuantity: null
      },
      listingDetail: (props.listing && props.listing.listingDetail) || {
        id: null,
        inventoryCount: null
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
  async handleSubmit(values, { props: { onSubmit } }) {
    const input = {
      id: values.id,
      userId: values.userId,
      title: values.title,
      description: values.description,
      sku: values.sku,
      isActive: values.isActive
    };
    input.listingCostArray = [];
    const cost = {
      cost: values.listingCostArray[0].cost,
      discount: values.listingCostArray[0].discount,
      type: values.listingCostArray[0].type,
      label: values.listingCostArray[0].label
    };
    input.listingCostArray.push(cost);
    input.listingFlags = {
      id: values.listingFlags.id,
      isFeatured: values.listingFlags.isFeatured,
      isNew: values.listingFlags.isNew,
      isDiscount: values.listingFlags.isDiscount
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
        url: 'https://res.cloudinary.com/gemspremium/image/upload/v1600885630/images_h4yc1x.png',
        type: 'image'
      });
    }
    if (values.listingMedia.video.length > 0) {
      input.listingMedia = [...input.listingMedia, ...values.listingMedia.video];
    }
    console.log(input);
    await onSubmit(input);
  },
  validate: values => validate(values, ListingFormSchema),
  displayName: 'Listing Form' // helps with React DevTools
});

export default ListingWithFormik(ListingFormComponent);
