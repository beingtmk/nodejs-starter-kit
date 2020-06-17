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
import QuestionTypes from '@gqlapp/quiz-common/constants/QuestionTypes';

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
            currentUserId={currentUser && currentUser.id}
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
    console.log('props', props);
    const currentUserId = props.currentUser && props.currentUser.id;
    var questions = props.quiz && props.quiz.questions;
      let ques = questions.filter(quest=> (quest.choiceType===QuestionTypes.TEXTAREA || quest.choiceType===QuestionTypes.TEXTBOX || quest.choiceType===QuestionTypes.RADIO || quest.choiceType===QuestionTypes.SELECT))
      ques.forEach((q, i)=>{
        const index = questions.indexOf(q);
        if((q.answers && q.answers.length === 0) || !q.answers){
          const answers = [{
            choiceId: null,
            questionId: q.id,
            content: '',
            userId: currentUserId
          }]
          console.log('answers', answers);
          questions[index].answers = answers;
        }

        
      })
      console.log('questions', questions);
    return {
      questions:questions 
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
          content: ans.content
        });
      })
    })
    values.results = results;
    // values.results = (results.map);
    console.log('rreeeeeee', results);
    var val = {results:values.results};
    // const inputValues = { results:values.results };
    try {
      await onSubmit(val);
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
