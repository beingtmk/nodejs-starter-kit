import React from 'react';
import { Form, Card, Rate } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderUploadMultiple, Button, Select, Option } from '@gqlapp/look-client-react';

import UserAutoCompleteComponent from './UserAutoCompleteComponent';
import { Review } from '../containers/Reviews.web';
import { MODAL } from '../containers/Modal';

const ReviewFormSchema = { rating: [required], feedback: [required] };
const FormItem = Form.Item;

interface FormValues {
  id: number;
  modalName: string;
  modalId: number;
  userId: number;
  rating: string;
  feedback: string;
}

export interface ReviewFormComponentProps {
  review: Review;
  dirty: boolean;
  showModal: boolean;
  cardTitle: string;
  values: FormValues;
  onSearchTextChange: () => null;
  handleSubmit: () => null;
  setFieldValue: (field: string, value: string | number) => null;
}

const ReviewFormComponent: React.FC<ReviewFormComponentProps> = props => {
  const { dirty, cardTitle, values, onSearchTextChange, handleSubmit, setFieldValue, showModal } = props;
  // const [load, setLoad] = useState(true);

  return (
    <Card
      title={
        <h1>
          <strong>{cardTitle}</strong>
        </h1>
      }
    >
      <Form onSubmit={handleSubmit}>
        {showModal && (
          <>
            <FormItem label={'Modal'}>
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
            <Field name="modalId" component={RenderField} placeholder="Modal id" type="number" value={values.modalId} />
          </>
        )}
        <UserAutoCompleteComponent
          name="username"
          label="username"
          userType="user"
          defaultValue={
            (props.review &&
              props.review.user &&
              `${props.review.user.profile.firstName} ${props.review.user.profile.lastName}`) ||
            ''
          }
          value={values.userId}
          setValue={e => setFieldValue('userId', e)}
          onSearchTextChange={onSearchTextChange}
        />
        <FormItem label={'Rate'}>
          <Rate
            // allowHalf
            defaultValue={parseInt(values.rating)}
            style={{ fontSize: '50px' }}
            onChange={e => setFieldValue('rating', String(e))}
          />
        </FormItem>
        <Field
          name="feedback"
          component={RenderField}
          placeholder="Your review"
          type="textarea"
          value={values.feedback}
        />
        {/* <FieldArray
          name="reviewImages"
          label={'Add photo'}
          render={arrayHelpers => (
            <RenderUploadMultiple
              setload={load => setLoad(load)}
              arrayHelpers={arrayHelpers}
              values={values.reviewImages}
              dictKey="imageUrl"
            />
          )}
        /> */}
        <Button
          color="primary"
          type="submit"
          disabled={
            // load &&
            !dirty
          }
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
};

const ReviewWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    // function getImg(Img) {
    //   return {
    //     id: Img.id,
    //     imageUrl: Img.imageUrl,
    //   };
    // }
    return {
      id: (props.review && props.review.id) || null,
      modalName: '',
      modalId: 1,
      userId: (props.review && props.review.user && props.review.user.id) || null,
      rating: (props.review && props.review.rating) || null,
      feedback: (props.review && props.review.feedback) || ''
      // reviewImages:
      //   props.review && props.review.reviewImages && props.review.reviewImages.length !== 0
      //     ? props.review.reviewImages.map(getImg)
      //     : [],
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, ReviewFormSchema),
  displayName: 'Review Form' // helps with React DevTools
});

export default ReviewWithFormik(ReviewFormComponent);
