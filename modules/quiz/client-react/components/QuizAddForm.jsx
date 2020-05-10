import React from "react";
import { withFormik, FormikProps, FieldArray } from "formik";
import { isFormError } from "@gqlapp/forms-client-react";
// import { contactFormSchema } from '@gqlapp/contact-common';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import { validate } from '@gqlapp/validation-common-react';
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import {
  Form,
  RenderField,
  Button,
  Alert,
  Icon,
  RenderCheckBox,
} from "@gqlapp/look-client-react";
import RenderQuestionsField from "./RenderQuestionsField";
// import { QuizAddForm } from '../types';

// interface QuizAddFormProps {
//   t: TranslateFunction;
//   onSubmit: (values: QuizAddForm) => void;
// }

const QuizAddForm = ({ values, handleSubmit, t, status, errors }) => {
  const handleQuestions = (data) => (values.questions = data);
  // const [load, setload] = React.useState(false);
  console.log('form values', values);
  return (
    <Form name="quizAdd" onSubmit={handleSubmit}>
      {/* {status && status.sent && <Alert color="success">{t('successMsg')}</Alert>} */}
      <Field
        name="title"
        component={RenderField}
        type="text"
        label={"Title"}
        value={values.title}
      />
      <Field
        name="description"
        component={RenderField}
        type="text"
        label={"Description"}
        value={values.description}
      />
      <Field
        name="active"
        component={RenderCheckBox}
        type="checkbox"
        label={"Active"}
        checked={values.active}
      />{" "}
      <FieldArray
      name='questions'
        render={arrayHelpers => (
          <RenderQuestionsField
            // setload={setload}
            arrayHelpers={arrayHelpers}
            values={values.questions}
            label={"Add Questions"}
            name='questions'
            buttonText='Add Question'
            keys={{type:'text', label:'question', key:'description'}}
          />
        )}
        // skills={skills}
        questionsVal={values.questions}
        handleQuestions={handleQuestions}
      />
      <div className="text-center">
        {errors && errors.errorMsg && (
          <Alert color="error">{errors.errorMsg}</Alert>
        )}
        <Button block color="primary" type="submit">
          {/* <Icon type="mail" /> {t('form.btnSubmit')} */}
          Submit
        </Button>
      </div>
    </Form>
  );
};

const QuizAddFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    title: (props.quiz && props.quiz.title) || "",
    description: (props.quiz && props.quiz.description) || "",
    active: (props.quiz && props.quiz.active) || true,
    questions: (props.quiz && props.quiz.questions) || [],
  }),
  async handleSubmit(
    values,
    { resetForm, setErrors, setStatus, props: { onSubmit } }
  ) {
    values.questions = Object.values(values.questions);

    try {
      await onSubmit(values);
      resetForm();
      setStatus({ sent: true });
    } catch (e) {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
      setStatus({ sent: false });
    }
  },
  // validate: values => validate(values, contactFormSchema),
  displayName: "QuizAddForm", // helps with React DevTools
});

export default QuizAddFormWithFormik(QuizAddForm);
