import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col } from "antd";
import {
  RenderField,
  RenderUpload,
  Button,
  RenderCheckBox,
  RenderSelect,
  Option,
  Card,
} from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
const FormItem = Form.Item;

export default class RenderQuestionsField extends React.Component {
  add = () => {
    const { arrayHelpers, sectionId } = this.props;
    let obj = {};

    obj["description"] = "";
    obj["choiceType"] = "";
    obj["isActive"] = true;
    obj["choices"] = [];

    arrayHelpers.push(obj);
  };

  handleSubmitQuestion = (item) => {
    const { submitQuestion, sectionId, values } = this.props;
    var questionInput = values.find((val) => val === item);
    questionInput.sectionId = sectionId;
    submitQuestion(questionInput);
  };

  handleDeleteQuestion = (index) => {
    const { deleteQuestion, arrayHelpers, values } = this.props;
    const existingValue = values[index];
    arrayHelpers.remove(index);
    if (existingValue && existingValue.id) {
      deleteQuestion(existingValue.id);
    }
  };

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
    const sectionIndex = this.props.sectionIndex;
    let formItems = null;
    // const handleChoices = (data) => (values.choices = data);
    const { submitQuestion, deleteQuestion, sectionId, quizItem } = this.props;
    var questionsList = [];

    quizItem &&
      quizItem.sections &&
      quizItem.sections.map((secI, keySec) => {
        secI &&
          secI.questions &&
          secI.questions.map((queItem, queKey) => {
            questionsList.push(queItem);
          });
      });

    const getDependentQuestionChoices = (que) => {
      const dependentQuestion = questionsList.find(
        (queLi) => queLi.id === que.dependentQuestionId
      );
      return dependentQuestion && dependentQuestion.choices;
    };


    if (values && values.length !== 0) {
      formItems = values.map((v, indexv) => (
        <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
          <Card
            type="inner"
            actions={[
              <Button onClick={() => this.handleSubmitQuestion(v)}>
                Submit Question
              </Button>,
            ]}
            style={{ background: "#f3f3f3", marginBottom: "20px" }}
            title={
              <Row>
                <Col span={18}>
                  <Field
                    name={`${name}[${indexv}].description`}
                    component={RenderField}
                    placeholder={"Question Description"}
                    type="text"
                    style={{ marginBottom: "0px" }}
                    // label={<h3 style={{ marginBottom: '0', display: 'inline' }}>{`Question Description`}</h3>}
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    value={v.description}
                    //   key={indexv}
                    // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />
                </Col>
                <Col span={6} align="right">
                  <>
                    {values.length >= 1 ? (
                      <Icon
                        style={{ fontSize: "25px", paddingTop: "5px" }}
                        title="Remove "
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.handleDeleteQuestion(indexv)}
                      />
                    ) : null}
                  </>
                </Col>
              </Row>
            }
          >
            <Col span={24}>
              <Row gutter={10}>
                <Col span={12}>
                  <Field
                    name={`${name}[${indexv}].isActive`}
                    component={RenderCheckBox}
                    type="checkbox"
                    label={
                      <h5 style={{ marginBottom: "0", display: "inline" }}>
                        Is Active
                      </h5>
                    }
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    checked={v.isActive}
                    //   key={indexv}
                    // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name={`${name}[${indexv}].choiceType`}
                    component={RenderSelect}
                    placeholder={"Choice Type"}
                    type="select"
                    label={
                      <h5 style={{ marginBottom: "0", display: "inline" }}>
                        Choice Type
                      </h5>
                    }
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    value={v.choiceType}
                    //   key={indexv}
                    // style={{ display: 'inline-block', margin: '0px 5px' }}
                  >
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.RADIO}
                      key={QuestionTypes.RADIO}
                    >
                      {QuestionTypes.RADIO}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.SELECT}
                      key={QuestionTypes.SELECT}
                    >
                      {QuestionTypes.SELECT}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.MSELECT}
                      key={QuestionTypes.MSELECT}
                    >
                      {QuestionTypes.MSELECT}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.NUMBER}
                      key={QuestionTypes.NUMBER}
                    >
                      {QuestionTypes.NUMBER}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.TEXTBOX}
                      key={QuestionTypes.TEXTBOX}
                    >
                      {QuestionTypes.TEXTBOX}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.TEXTAREA}
                      key={QuestionTypes.TEXTAREA}
                    >
                      {QuestionTypes.TEXTAREA}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.SLIDER}
                      key={QuestionTypes.SLIDER}
                    >
                      {QuestionTypes.SLIDER}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.COUNTRIES}
                      key={QuestionTypes.COUNTRIES}
                    >
                      {QuestionTypes.COUNTRIES}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.CHECKBOX}
                      key={QuestionTypes.CHECKBOX}
                    >
                      {QuestionTypes.CHECKBOX}
                    </Option>


                  </Field>
                </Col>
                <Col span={24}>
                  <Field
                    name={`${name}[${indexv}].dependentQuestionId`}
                    component={RenderSelect}
                    placeholder={"Dependent Question"}
                    type="select"
                    label={
                      <h5 style={{ marginBottom: "0", display: "inline" }}>
                        Dependent Question
                      </h5>
                    }
                    value={v.dependentQuestionId}
                  >
                    {questionsList.map((queList, qlKey) => (
                      <Option
                        style={{
                          display: "block",
                          height: "30px",
                          lineHeight: "30px",
                        }}
                        value={queList.id}
                        key={queList.id}
                      >
                        {queList.description}
                      </Option>
                    ))}
                  </Field>
                  {getDependentQuestionChoices(v) && (
                    <Field
                      name={`${name}[${indexv}].dependentChoiceId`}
                      component={RenderSelect}
                      placeholder={"Dependent Choice"}
                      type="select"
                      label={
                        <h5 style={{ marginBottom: "0", display: "inline" }}>
                          Dependent Choice
                        </h5>
                      }
                      value={v.dependentChoiceId}
                    >
                      {getDependentQuestionChoices(v).map((choiItem, chKey) => (
                        <Option
                          style={{
                            display: "block",
                            height: "30px",
                            lineHeight: "30px",
                          }}
                          value={choiItem.id}
                          key={choiItem.id}
                        >
                          {choiItem.description}
                        </Option>
                      ))}
                    </Field>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {v.choiceType !== "" &&
                    (v.choiceType === QuestionTypes.SELECT ||
                      v.choiceType === QuestionTypes.RADIO ||
                      v.choiceType === QuestionTypes.SLIDER ||
                      v.choiceType === QuestionTypes.MSELECT ||
                      v.choiceType === QuestionTypes.CHECKBOX ||
                      v.choiceType === QuestionTypes.MCHECKBOX) && (
                      <FieldArray
                        name={`${name}[${indexv}].choices`}
                        render={(arrayHelpersA) => (
                          <RenderDynamicField
                            // setload={setload}
                            arrayHelpers={arrayHelpersA}
                            values={v.choices}
                            // label={"Add Choices"}
                            name={`${name}[${indexv}].choices`}
                            buttonText={
                              v.choiceType === QuestionTypes.SLIDER
                                ? "Add Slider Milestones"
                                : "Add Choices"
                            }
                            keys={[
                              {
                                type: "text",
                                label:
                                  v.choiceType === QuestionTypes.SLIDER
                                    ? "enter label"
                                    : "choices",
                                key: "description",
                              },
                            ]}
                          />
                        )}
                        // skills={skills}
                        values={v.choices}
                        //   handleQuestions={handleChoices}
                      />
                    )}
                </Col>
                <Col span={12}></Col>
              </Row>
            </Col>
          </Card>
        </FormItem>
      ));
    }
    return (
      <div>
        <FormItem label={this.props.label}>
          {formItems}
          <FormItem>
            <Button style={{ width: "100%" }} onClick={this.add}>
              {/* <Icon type="plus" /> */}
              {"Add Questions"}
            </Button>
          </FormItem>
        </FormItem>
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
