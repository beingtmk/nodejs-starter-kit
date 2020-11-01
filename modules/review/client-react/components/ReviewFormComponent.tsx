import React from 'react';

import { Row, Col, Rate, Button } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import {
  Form,
  Icon,
  RenderUploadMultiple,
  RenderField,
  Select,
  Option,
  FormItem,
  SubmitButton
} from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
import { MODAL } from '@gqlapp/review-common';
import styled from 'styled-components';

import UserAutoCompleteComponent from './UserAutoCompleteComponent';
import { Review } from '../containers/Reviews.web';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

const ReviewFormSchema = { rating: [required], feedback: [required] };

const Rating = styled(Rate)`
  font-size: 50px !important;
  padding-right: 10px;
  @media screen and (max-width: 600px) {
    font-size: 40px !important;
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
  const { dirty, values, onSearchTextChange, handleSubmit, setFieldValue, showModal, t } = props;
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
          <FormItem label={t('reviewForm.modal')}>
            <Select
              name="modal"
              defaultValue={MODAL[0].value}
              style={{ width: '100px' }}
              onChange={(e: string) => setFieldValue('modalName', e)}
            >
              {MODAL.map((m, i) => (
                <Option key={i} value={m.value}>
                  {m.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <Field
            name="modalId"
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
      <FormItem label={t('reviewForm.rate')}>
        <Rating
          // allowHalf
          defaultValue={parseInt(values.rating)}
          onChange={e => setFieldValue('rating', String(e))}
        />
      </FormItem>
      <Field
        name="feedback"
        component={RenderField}
        placeholder="Your review"
        label={'Feedback'}
        type="textarea"
        value={values.feedback}
      />
      <Row gutter={24}>
        <Col md={24} sm={24} xs={24} lg={12} align="left">
          <Row>
            <Col span={18}>
              <FormItem label={t('reviewForm.addVideo')}></FormItem>
            </Col>
            <Col span={6} align="right">
              <FormItem>
                <Button type="primary" onClick={add}>
                  <Icon type="VideoCameraOutlined" />
                  {t('reviewForm.btn.add')}
                </Button>
              </FormItem>
            </Col>
            <Col span={24}>{formItems}</Col>
          </Row>
        </Col>
        <Col
          md={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 11, offset: 1 }}
          align="left"
        >
          <FormItem label={t('reviewForm.addImages')}>
            <FieldArray
              name="reviewMedia.image"
              label={'Review Image'}
              render={arrayHelpers => (
                <RenderUploadMultiple
                  setload={(e: boolean) => setLoad(e)}
                  arrayHelpers={arrayHelpers}
                  values={values.reviewMedia.image}
                  getType={true}
                  dictKey="url"
                />
              )}
            />
          </FormItem>
        </Col>
      </Row>
      <SubmitButton type="submit" disabled={load && !dirty}>
        {t('reviewForm.btn.submit')}
      </SubmitButton>
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
      obj.type === 'image' && reviewMedia.image.push(obj);
      obj.type === 'video' && reviewMedia.image.push(obj);
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
    hideModal && hideModal();
  },
  validate: values => validate(values, ReviewFormSchema),
  displayName: 'Review Form' // helps with React DevTools
});

export default ReviewWithFormik(ReviewFormComponent);
