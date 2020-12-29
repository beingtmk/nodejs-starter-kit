import React from 'react';
import styled from 'styled-components';
import { withFormik, FieldArray } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import {
  Space,
  Form,
  Icon,
  RenderUploadMultiple,
  RenderField,
  Option,
  FormItem,
  SubmitButton,
  Row,
  Col,
  Rate,
  AddButton,
  RenderSelect
} from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
import { MODAL } from '@gqlapp/review-common';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import UserAutoCompleteComponent from './UserAutoCompleteComponent';
import { Review } from '../containers/Reviews.web';

const ReviewFormSchema = { rating: [required], feedback: [required] };

const Rating = styled(Rate)`
  font-size: 25px !important;
  padding-right: 10px;
  @media screen and (max-width: 600px) {
    font-size: 25px !important;
  }
`;
interface FormValues {
  id: number;
  modalName: string;
  modalId: number;
  userId: number;
  rating: string;
  feedback: string;
  reviewMedia: {
    video: string[];
  };
}

export interface ReviewFormComponentProps {
  modalData: object;
  modalName: string;
  modalId: number;
  review: Review;
  dirty: boolean;
  showModal: boolean;
  cardTitle: string;
  values: FormValues;
  t: TranslateFunction;
  onSearchTextChange: () => null;
  handleSubmit: () => null;
  setFieldValue: (field: string, value: string | number) => null;
}

const ReviewFormComponent: React.FC<ReviewFormComponentProps> = props => {
  const { dirty, values, onSearchTextChange, handleSubmit, setFieldValue, showModal, t, listing } = props;
  const videos = values.reviewMedia.video;
  const [load, setLoad] = React.useState(false);
  let formItems = null;
  if (videos.length > 0) {
    formItems = videos.map((v: any, index: number) => (
      <FormItem required={false} key={index} style={{ margin: '0px' }}>
        <FormItem style={{ display: 'inline-block', margin: '0px 5px' }} key={index}>
          <Field
            name={`reviewMedia.video[${index}].url`}
            component={RenderField}
            placeholder={'Video url'}
            type="text"
            label={'Video url'}
            value={v.url}
            key={index}
          />
        </FormItem>
        <Icon
          type="MinusCircleOutlined"
          style={{ paddingTop: '40px' }}
          title="Remove "
          className="dynamic-delete-button"
          onClick={() => setFieldValue('reviewMedia.video', videos.splice(index, 1) && videos)}
        />
      </FormItem>
    ));
  }

  const add = () => {
    const obj = {
      url: '',
      type: 'video'
    };
    setFieldValue('reviewMedia.video', [...values.reviewMedia.video, obj]);
  };

  // console.log('props', props);
  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      {showModal && (
        <>
          <Field
            name="modal"
            icon="SafetyCertificateOutlined"
            component={RenderSelect}
            placeholder={t('reviewForm.modal')}
            defaultValue={MODAL[0].value}
            onChange={(e: string) => setFieldValue('modalName', e)}
            label={t('reviewForm.modal')}
            style={{ width: '100px' }}
            value={values.modalName}
            selectStyle={{ width: '100px' }}
          >
            {MODAL.map((m, i) => (
              <Option key={i} value={m.value}>
                {m.label}
              </Option>
            ))}
          </Field>
          <Field
            name="modalId"
            icon="BorderlessTableOutlined"
            component={RenderField}
            label={t('reviewForm.modalId')}
            placeholder="Modal id"
            type="number"
            value={values.modalId}
          />
          <UserAutoCompleteComponent
            name="username"
            label={t('reviewForm.username')}
            userType="user"
            defaultValue={(props.review && props.review.user && `${props.review.user.username}`) || ''}
            value={values.userId}
            setValue={e => setFieldValue('userId', e)}
            onSearchTextChange={onSearchTextChange}
          />
        </>
      )}
      {listing ? (
        <Row gutter={24}>
          <Col span={6}>
            <img src={listing.img.url} width={'100%'} />
          </Col>
          <Col span={18}>
            <h3>{listing.title}</h3>
            <FormItem
              label={
                <Space algn="center">
                  <Icon type="StarOutlined" />
                  {t('reviewForm.rate')}
                </Space>
              }
            >
              <Rating
                // allowHalf
                // tslint:disable-next-line:radix
                defaultValue={parseInt(values.rating)}
                onChange={e => setFieldValue('rating', String(e))}
              />
            </FormItem>
          </Col>
        </Row>
      ) : (
        <FormItem
          label={
            <Space algn="center">
              <Icon type="StarOutlined" />
              {t('reviewForm.rate')}
            </Space>
          }
        >
          <Rating
            // allowHalf
            // tslint:disable-next-line:radix
            defaultValue={parseInt(values.rating)}
            onChange={e => setFieldValue('rating', String(e))}
          />
        </FormItem>
      )}

      <Field
        name="feedback"
        icon="FileOutlined"
        component={RenderField}
        placeholder="Your review"
        label={'Feedback'}
        type="textarea"
        value={values.feedback}
      />
      <Row>
        <Col span={18}>
          <FormItem
            label={
              <Space algn="center">
                <Icon type="VideoCameraOutlined" />
                {t('reviewForm.addVideo')}
              </Space>
            }
          ></FormItem>
        </Col>
        <Col span={6} align="right">
          <FormItem>
            <AddButton color="primary" onClick={add} block={false}>
              {t('reviewForm.btn.add')}
            </AddButton>
          </FormItem>
        </Col>
        <Col span={24}>{formItems}</Col>
      </Row>

      <FieldArray
        name="reviewMedia.image"
        label={'Review Image'}
        render={arrayHelpers => (
          <RenderUploadMultiple
            label={t('reviewForm.addImages')}
            setload={(e: boolean) => setLoad(e)}
            arrayHelpers={arrayHelpers}
            values={values.reviewMedia.image}
            getType={true}
            dictKey="url"
          />
        )}
      />
      <Col span={24}>
        <div align="right">
          <SubmitButton type="submit" disabled={load && !dirty} block>
            {t('reviewForm.btn.submit')}
          </SubmitButton>
        </div>
      </Col>
    </Form>
  );
};

const ReviewWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props: ReviewFormComponentProps) => {
    const reviewMedia = {
      image: [],
      video: []
    };
    function getReviewImage(reviewImg: any) {
      const obj = {
        id: (reviewImg && reviewImg.id) || null,
        url: (reviewImg && reviewImg.url) || '',
        type: (reviewImg && reviewImg.type) || '',
        isActive: (reviewImg && reviewImg.isActive) || true
      };
      if (obj.type === 'image') {
        reviewMedia.image.push(obj);
      }
      if (obj.type === 'video') {
        reviewMedia.image.push(obj);
      }
    }
    return {
      id: (props.review && props.review.id) || null,
      modalName: (props.modalData && props.modalData.modalName) || '',
      modalId: (props.modalData && props.modalData.modalId) || 1,
      userId: (props.review && props.review.user && props.review.user.id) || null,
      rating: (props.review && props.review.rating) || null,
      feedback: (props.review && props.review.feedback) || '',
      reviewMedia: (props.review &&
        props.review.reviewMedia &&
        props.review.reviewMedia.map(getReviewImage) &&
        reviewMedia) || {
        image: [],
        video: []
      }
    };
  },
  async handleSubmit(values: Review, { props: { onSubmit, hideModal } }) {
    const input: Review = {
      id: values.id,
      modalName: values.modalName,
      modalId: values.modalId,
      userId: values.userId,
      rating: values.rating,
      feedback: values.feedback,
      reviewMedia: []
    };
    if (values.reviewMedia.image.length > 0) {
      input.reviewMedia = [...input.reviewMedia, ...values.reviewMedia.image];
    } else {
      input.reviewMedia.push({
        url: NO_IMG,
        type: 'image'
      });
    }
    if (values.reviewMedia.video.length > 0) {
      input.reviewMedia = [...input.reviewMedia, ...values.reviewMedia.video];
    }
    // console.log(input);
    onSubmit(input);
    if (hideModal) {
      hideModal();
    }
  },
  validate: values => validate(values, ReviewFormSchema),
  displayName: 'Review Form' // helps with React DevTools
});

export default ReviewWithFormik(ReviewFormComponent);
