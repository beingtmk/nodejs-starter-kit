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
import { Radio, Input } from "antd";

import RenderQuizQuestionField from "./RenderQuizQuestionField";
// import { QuizAddForm } from '../types';

// interface QuizAddFormProps {
//   t: TranslateFunction;
//   onSubmit: (values: QuizAddForm) => void;
// }

const QuizForm = ({
  currentUser,
  quiz,
  values,
  handleSubmit,
  t,
  status,
  errors,
}) => {
  const handleResults = (data) => (values.results = data);
  // const [load, setload] = React.useState(false);
  console.log("form values", values);
  return (
    <Form name="quizAdd" onSubmit={handleSubmit}>
      {/* {status && status.sent && <Alert color="success">{t('successMsg')}</Alert>} */}
      <FieldArray
        name="results"
        render={(arrayHelpers) => (
          <RenderQuizQuestionField
            // setload={setload}
            arrayHelpers={arrayHelpers}
            values={values.results}
            label={"Answer Following QUestions"}
            name="results"
            // buttonText='Add Question'
            // keys={{type:'text', label:'question', key:'description'}}
            quiz={quiz}
            currentUserId={currentUser.id}
          />
        )}
        // skills={skills}
        // resultsVal={values.results}
        handleResults={handleResults}
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

const QuizFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    function getResult(question) {
      return {
        questionId: question && question.id,
        userId: props.currentUser && props.currentUser.id,
        choiceId: null,
        content: ''
        // choices: question && question.choices && question.choices.map(getChoices) || []
      };
    }
    function getAnswers(result) {
      return {
        id: result && result.id,
        questionId: result && result.questionId,
        userId:result && result.userId,
        choiceId: result && result.choiceId,
        content: result && result.content
        // choices: question && question.choices && question.choices.map(getChoices) || []
      };
    }
    // function getQuestions(question) {
    //   return {
    //     id: (question && question.id) || null,
    //     description: (question && question.description) || '',
    //     choices: question && question.choices && question.choices.map(getChoices) || []
    //   };
    // }
    return {
      results:
        props.answers && props.answers.answers.length !== 0
          ? props.answers.answers.map(getAnswers)
          : props.quiz &&
            props.quiz.questions &&
            props.quiz.questions.map(getResult),
      // title: (props.quiz && props.quiz.title) || "",
      // description: (props.quiz && props.quiz.description) || "",
      // active: (props.quiz && props.quiz.active) || true,
      // questions: (props.quiz && props.quiz.questions && props.quiz.questions.map(getQuestions)) || [],
    };
  },
  async handleSubmit(
    values,
    { resetForm, setErrors, setStatus, props: { onSubmit } }
  ) {
    // values.results = (values.results.map)
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
  displayName: "QuizForm", // helps with React DevTools
});

export default QuizFormWithFormik(QuizForm);
