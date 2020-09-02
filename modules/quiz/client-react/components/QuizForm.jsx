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
  Alert,
  Icon,
  RenderCheckBox,
  Card,
} from "@gqlapp/look-client-react";
import { Radio, Button, Input } from "antd";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";

import RenderQuizSectionsField from "./RenderQuizSectionsField";
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
  // const [load, setload] = React.useState(false);

  const SubmitButton = () => {
    return (
      <Button
        size="large"
        type="primary"
        shape="round"
        onClick={() => handleSubmit(values)}
      >
        Submit
      </Button>
    );
  };
  console.log("form values", values);
  return (
    <>
      <Form name="quizAdd" onSubmit={handleSubmit}>
        {/* {status && status.sent && <Alert color="success">{t('successMsg')}</Alert>} */}

        <RenderQuizSectionsField
          // setload={setload}
          // sectionIndex= {valK}
          // arrayHelpers={arrayHelpers}
          quizTitle={quiz && quiz.title}
          values={values}
          submitButton={SubmitButton}
          // label={"Answer Following QUestions"}
          // name="quiz-results"
          // buttonText='Add Question'
          // keys={{type:'text', label:'question', key:'description'}}
          // quiz={quiz}
          currentUserId={currentUser && currentUser.id}
        />

        <div className="text-center">
          {errors && errors.errorMsg && (
            <Alert color="error">{errors.errorMsg}</Alert>
          )}
        </div>
      </Form>
    </>
  );
};

const QuizFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const currentUserId = props.currentUser && props.currentUser.id;
    var sections = props.quiz && props.quiz.sections;
    sections.length !== 0 &&
      sections.map((section, sI) => {
        var questions = section.questions;
        let ques = questions.filter(
          (quest) =>
            quest.choiceType === QuestionTypes.TEXTAREA ||
            quest.choiceType === QuestionTypes.NUMBER ||
            quest.choiceType === QuestionTypes.TEXTBOX ||
            quest.choiceType === QuestionTypes.RADIO ||
            quest.choiceType === QuestionTypes.SELECT ||
            quest.choiceType === QuestionTypes.SLIDER ||
            quest.choiceType === QuestionTypes.COUNTRIES
        );
        ques.forEach((q, i) => {
          const index = questions.indexOf(q);
          if ((q.answers && q.answers.length === 0) || !q.answers) {
            const answers = [
              {
                choiceId: null,
                questionId: q.id,
                content: "",
              },
            ];
            questions[index].answers = answers;
          }
          section.questions = questions;
        });
        sections[sI] = section;
      });
    return {
      sections: sections,
    };
  },
  async handleSubmit(
    values,
    { resetForm, setErrors, setStatus, props: { onSubmit, quiz, currentUser } }
  ) {
    var answers = [];
    values.sections &&
      values.sections.map((sect) => {
        sect.questions &&
          sect.questions.map((ques) => {
            ques.answers &&
              ques.answers.map((ans) => {
                answers.push({
                  id: ans.id,
                  questionId: ans.questionId,
                  choiceId: ans.choiceId,
                  content:
                    ques.choiceType === QuestionTypes.NUMBER
                      ? `${ans.content}`
                      : ans.content,
                });
              });
          });
      });
    values.answers = answers;
    // values.answers = (answers.map);
    var val = {
      userId: currentUser && currentUser.id,
      quizId: quiz && quiz.id,
      answers: answers,
    };
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
