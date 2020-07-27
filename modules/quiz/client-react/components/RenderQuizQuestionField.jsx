import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col, Radio, Checkbox, Slider } from "antd";
import {
  RenderField,
  RenderUpload,
  Button,
  RenderSelect,
  Option,
} from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";
import RenderRadioGroup from "@gqlapp/look-client-react/ui-antd/components/RenderRadioGroup";
import RenderSelectMultipleQuiz from "@gqlapp/look-client-react/ui-antd/components/RenderSelectMultipleQuiz";
import RenderCheckBoxQuiz from "@gqlapp/look-client-react/ui-antd/components/RenderCheckBoxQuiz";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
import { countries } from "@gqlapp/quiz-common/constants/CountriesList";

const FormItem = Form.Item;
export default class RenderQuestionsField extends React.Component {
  // add = () => {
  //   const arrayHelpers = this.props.arrayHelpers;
  //   const questionsQ = this.props.quiz && this.props.quiz.questions;
  //   questionsQ.map((question, key)=>{
  //     arrayHelpers.push({
  //       userId: this.props.currentUserId,
  //       questionId: question.id
  //     })
  //   })

  //   // arrayHelpers.push(obj);
  // };

  render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 }
    //   }
    // };
    // getFieldDecorator('keys', { initialValue: [] });
    const keys = this.props.keys;
    const name = this.props.name;
    const values = this.props.values;
    const arrayHelpers = this.props.arrayHelpers;
    const currentUserId = this.props.currentUserId;
    let formItems = null;
    const questionsQ = this.props.quiz && this.props.quiz.questions;
    console.log("keys", values);
    // const handleChoices = (data) => (values.choices = data);
    // this.add
    const { sectionIndex, questionList } = this.props;
    if (values) {
      formItems =
        values.length !== 0 &&
        values.map((v, indexv) => {
          var marks = {};

          if (v.choiceType === QuestionTypes.SLIDER) {
            const lengthC = v.choices && v.choices.length;
            const markL = 100 / (lengthC - 1);
            v.choices &&
              v.choices.map(
                (cho, key) =>
                  (marks[
                    `${key * markL > 99 ? 100 : Math.round(key * markL)}`
                  ] = { label: cho.description })
              );
          }
          var dependence = false;
          const dependentQuestion =
            v.dependentQuestionId &&
            questionList.find((queL) => queL.id === v.dependentQuestionId);
          dependentQuestion &&
            dependentQuestion.answers &&
            dependentQuestion.answers.map((ansW) => {
              dependence = ansW.choiceId === v.dependentChoiceId;
            });

          if (v.dependentQuestionId && !dependence) {
            return null;
          }
          return (
            <Row>
              <h3>{v.description}</h3>
              <Col span={24}>
                <FormItem
                  required={false}
                  key={indexv}
                  style={{ margin: "0px" }}
                >
                  {v.choiceType === QuestionTypes.SELECT && (
                    <Field
                      name={`sections[${sectionIndex}].questions[${indexv}].answers[0].choiceId`}
                      component={RenderSelect}
                      placeholder={"none"}
                      type="select"
                      label={""}
                      // label={`${k.label || k.key} #${indexv + 1}`}
                      value={v.answers && v.answers[0].choiceId}
                      //   key={indexv}
                      // style={{ display: 'inline-block', margin: '0px 5px' }}
                    >
                      {v.choices.map((choice, key) => (
                        <Option
                          style={{
                            display: "block",
                            height: "30px",
                            lineHeight: "30px",
                          }}
                          value={choice.id}
                        >
                          {choice.description}
                        </Option>
                      ))}
                    </Field>
                  )}
                  {v.choiceType === QuestionTypes.CHECKBOX && (
                    <>
                      <FieldArray
                        name={`sections[${sectionIndex}].questions[${indexv}].answers`}
                        render={(arrayHelpers) => (
                          <RenderCheckBoxQuiz
                            // setload={setload}
                            sectionIndex={sectionIndex}
                            arrayHelpers={arrayHelpers}
                            value={v.answers}
                            // label={"Answer Following QUestions"}
                            name={`sections[${sectionIndex}].questions[${indexv}].answers`}
                            data={v}
                            // buttonText='Add Question'
                            // keys={{type:'text', label:'question', key:'description'}}
                            // quiz={quiz}
                            currentUserId={currentUserId}
                          />
                        )}
                        // skills={skills}
                        // resultsVal={values.results}
                        // handleResults={handleResults}
                      />
                    </>
                  )}

                  {v.choiceType === QuestionTypes.MSELECT && (
                    <>
                      <FieldArray
                        name={`sections[${sectionIndex}].questions[${indexv}].answers`}
                        render={(arrayHelpers) => (
                          <RenderSelectMultipleQuiz
                            // setload={setload}
                            sectionIndex={sectionIndex}
                            arrayHelpers={arrayHelpers}
                            value={v.answers}
                            // label={"Answer Following QUestions"}
                            name={`sections[${sectionIndex}].questions[${indexv}].answers`}
                            data={v}
                            // buttonText='Add Question'
                            // keys={{type:'text', label:'question', key:'description'}}
                            // quiz={quiz}
                            currentUserId={currentUserId}
                          />
                        )}
                        // skills={skills}
                        // resultsVal={values.results}
                        // handleResults={handleResults}
                      />
                    </>
                  )}
                  {v.choiceType === QuestionTypes.TEXTBOX && (
                    <Field
                      name={`sections[${sectionIndex}].questions[${indexv}].answers[0].content`}
                      component={RenderField}
                      placeholder={"none"}
                      type="text"
                      label={""}
                      // label={`${k.label || k.key} #${indexv + 1}`}
                      value={v.answers && v.answers[0].content}
                      //   key={indexv}
                      // style={{ display: 'inline-block', margin: '0px 5px' }}
                    />
                  )}
                  {v.choiceType === QuestionTypes.TEXTAREA && (
                    <Field
                      name={`sections[${sectionIndex}].questions[${indexv}].answers[0].content`}
                      component={RenderField}
                      placeholder={"none"}
                      type="textarea"
                      label={""}
                      // label={`${k.label || k.key} #${indexv + 1}`}
                      value={v.answers && v.answers[0].content}
                      //   key={indexv}
                      // style={{ display: 'inline-block', margin: '0px 5px' }}
                    />
                  )}
                  {v.choiceType === QuestionTypes.RADIO && (
                    <Field
                      name={`sections[${sectionIndex}].questions[${indexv}].answers[0].choiceId`}
                      component={RenderRadioGroup}
                      placeholder={"none"}
                      type="radio"
                      label={""}
                      // label={`${k.label || k.key} #${indexv + 1}`}
                      value={v.answers && v.answers[0].choiceId}
                      //   key={indexv}
                      // style={{ display: 'inline-block', margin: '0px 5px' }}
                    >
                      {v.choices.map((choice, key) => (
                        <Radio style={{ display: "block" }} value={choice.id}>
                          {choice.description}
                        </Radio>
                      ))}
                    </Field>
                  )}
                  {v.choiceType === QuestionTypes.SLIDER && (
                    <Field
                      name={`sections[${sectionIndex}].questions[${indexv}].answers[0].content`}
                      component={SliderFormComponent}
                      placeholder={"none"}
                      type="radio"
                      label={""}
                      marks={marks}
                      // label={`${k.label || k.key} #${indexv + 1}`}
                      value={
                        v.answers &&
                        v.answers.length !== 0 &&
                        v.answers[0].content
                      }
                      //   key={indexv}
                      // style={{ display: 'inline-block', margin: '0px 5px' }}
                    />
                  )}
                </FormItem>
              </Col>
              {v.choiceType === QuestionTypes.COUNTRIES && (
                <Field
                  name={`sections[${sectionIndex}].questions[${indexv}].answers[0].content`}
                  component={RenderSelect}
                  placeholder={"none"}
                  type="select"
                  label={""}
                  // label={`${k.label || k.key} #${indexv + 1}`}
                  value={
                    v.answers && v.answers.length !== 0 && v.answers[0].content
                  }
                  //   key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                >
                  {countries.map((country, key) => (
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      key={key}
                      value={country}
                    >
                      {country}
                    </Option>
                  ))}
                </Field>
              )}
            </Row>
          );
        });
    }
    return (
      <div>
        <FormItem label={this.props.label}>{formItems}</FormItem>
      </div>
    );
  }
}

RenderQuestionsField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  keys: PropTypes.object,
  setload: PropTypes.func,

  buttonText: PropTypes.string,
  arrayHelpers: PropTypes.object,
};

const SliderFormComponent = (props) => {
  console.log("slider", props);
  const handleChange = (e) => {
    console.log(e);
    props.formik && props.formik.setFieldValue(props.name, `${e}`);
  };
  return (
    <div style={{ padding: "0  20px" }}>
      <Slider
        marks={props.marks}
        included={false}
        defaultValue={Number(props.value)}
        onChange={handleChange}
      />
    </div>
  );
};
