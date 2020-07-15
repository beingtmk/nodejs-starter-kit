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
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};

    obj["description"] = "";
    obj["choiceType"] = "";
    obj["isActive"] = true;
    obj["choices"] = [];
    obj["choiceDependenceDescription"] = null;

    arrayHelpers.push(obj);
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
    console.log("valllll", values);
    let dependentQ =
      values.length !== 0 &&
      values.find((ques) => ques.choiceType === QuestionTypes.DEPENDENCE);
    // const handleChoices = (data) => (values.choices = data);
    console.log("dependent CHoices", dependentQ);

    if (values && values.length !== 0) {
      formItems = values.map((v, indexv) => (
        <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
          <Card
            type="inner"
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
                        onClick={() => arrayHelpers.remove(indexv)}
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
                    >
                      {QuestionTypes.MSELECT}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.TEXTBOX}
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
                    >
                      {QuestionTypes.TEXTAREA}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.DEPENDENCE}
                    >
                      {QuestionTypes.DEPENDENCE}
                    </Option>
                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.SLIDER}
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
                    >
                      {QuestionTypes.CHECKBOX}
                    </Option>

                    <Option
                      style={{
                        display: "block",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      value={QuestionTypes.MCHECKBOX}
                    >
                      {QuestionTypes.MCHECKBOX}
                    </Option>
                  </Field>
                </Col>
                {dependentQ &&
                  dependentQ.choices &&
                  v.choiceType !== QuestionTypes.DEPENDENCE && (
                    <Col span={12}>
                      <Field
                        name={`${name}[${indexv}].choiceDependenceDescription`}
                        component={RenderSelect}
                        placeholder={"Choice Dependency"}
                        type="select"
                        label={
                          <h5 style={{ marginBottom: "0", display: "inline" }}>
                            Choice Dependency
                          </h5>
                        }
                        // label={`${k.label || k.key} #${indexv + 1}`}
                        value={v.choiceDependenceDescription}
                        //   key={indexv}
                        // style={{ display: 'inline-block', margin: '0px 5px' }}
                      >
                        {dependentQ.choices.map((choice) => (
                          <Option
                            style={{
                              display: "block",
                              height: "30px",
                              lineHeight: "30px",
                            }}
                            value={choice.description}
                          >
                            {choice.description}
                          </Option>
                        ))}
                      </Field>
                    </Col>
                  )}
              </Row>
              {v.choiceType !== "" &&
                (v.choiceType === QuestionTypes.SELECT ||
                  v.choiceType === QuestionTypes.DEPENDENCE ||
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
