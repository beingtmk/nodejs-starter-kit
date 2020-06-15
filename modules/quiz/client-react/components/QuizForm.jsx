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
            values={values}
            label={"Answer Following QUestions"}
            name="quiz-results"
            // buttonText='Add Question'
            // keys={{type:'text', label:'question', key:'description'}}
            // quiz={quiz}
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
    return {
      questions:props.quiz && props.quiz.questions 
    };
  },
  async handleSubmit(
    values,
    { resetForm, setErrors, setStatus, props: { onSubmit } }
  ) {
    var results = [];
    values.questions.map(ques=>{
      ques.answers.map(ans=>{
        results.push({
          id: ans.id,
          questionId: ans.questionId,
          userId: ans.userId,
          choiceId: ans.choiceId,
          content: ans.choiceId
        });
      })
    })
    values.results = results;
    console.log('rreeeeeee', results);
    values.results = (values.results.map);
    var inputValues = {};
    inputValues.results = values.results;
    // const inputValues = { results:values.results };
    try {
      await onSubmit(inputValues);
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
