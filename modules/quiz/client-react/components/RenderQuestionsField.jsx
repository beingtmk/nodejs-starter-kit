import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col } from "antd";
import { RenderField, RenderUpload, Button, RenderCheckBox, RenderSelect, Option } from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";
import QuestionTypes from '@gqlapp/quiz-common/constants/QuestionTypes';
const FormItem = Form.Item;


export default class RenderQuestionsField extends React.Component {
  add = () => {
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};
    const keys = this.props.keys;

    obj[keys.key] = "";
    obj['choiceType'] = '';
    obj["isActive"] = true
    obj["choices"] = [];

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
    let formItems = null;
    console.log("keys", keys);
    // const handleChoices = (data) => (values.choices = data);

    if (values && values.length !== 0) {
      formItems = values.map((v, indexv) => (
        <Row style={{background:'#f3f3f3', marginBottom:'20px', padding:'5px'}}>
          <Col span={24}>
            <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
              <Row gutter={10}>
                <Col span={20}>
                  <Field
                    name={`questions[${indexv}].description`}
                    component={RenderField}
                    placeholder={keys.placeholder || keys.key}
                    type="text"
                    label={<h3 style={{ marginBottom: '0', display: 'inline' }}>{`${keys.label}-${indexv + 1}`}</h3>}
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    value={v.description}
                  //   key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />
                </Col>
                <Col span={4}>
                  {values.length >= 1 ? (
                    <Icon
                      style={{ paddingTop: "50px", fontSize: "25px" }}
                      title="Remove "
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      onClick={() => arrayHelpers.remove(indexv)}
                    />
                  ) : null}
                </Col>
                <Col span={12}>
                  <Field
                    name={`questions[${indexv}].isActive`}
                    component={RenderCheckBox}
                    type="checkbox"
                    label={<h5 style={{ marginBottom: '0', display: 'inline' }}>Is Active</h5>}
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    checked={v.isActive}
                  //   key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />

                </Col>
                <Col span={12}>

                  <Field
                    name={`questions[${indexv}].choiceType`}
                    component={RenderSelect}
                    placeholder={'Choice Type'}
                    type="select"
                    label={<h5 style={{ marginBottom: '0', display: 'inline' }}>Choice Type</h5>}
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

                  </Field>
                </Col>


              </Row>
              {v.choiceType !== '' &&
                (v.choiceType === QuestionTypes.SELECT ||
                  v.choiceType === QuestionTypes.RADIO ||
                  v.choiceType === QuestionTypes.MSELECT) &&
                (<FieldArray
                  name={`${name}[${indexv}].choices`}
                  render={(arrayHelpersA) => (
                    <RenderDynamicField
                      // setload={setload}
                      arrayHelpers={arrayHelpersA}
                      values={v.choices}
                      label={"Add Choices"}
                      name={`${name}[${indexv}].choices`}
                      buttonText="Add Choices"
                      keys={[{ type: "text", label: "choices", key: "description" }]}
                    />
                  )}
                  // skills={skills}
                  values={v.choices}
                //   handleQuestions={handleChoices}
                />)}
            </FormItem>
          </Col>



          {/* {v.choices.map((choice, indexCh) => (
            <Col span={24}>
              <Col span={12}>
              <FormItem>

                <Field
                  name={`${name}[${indexv}].${choices}[${indexCh}].${description}`}
                  component={RenderField}
                  placeholder={"choice"}
                  type="text"
                  label={"Choice"}
                  // label={`${k.label || k.key} #${indexv + 1}`}
                  value={choice.description}
                  //   key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                />
                </FormItem>
                <br/>
                <br/>
                
              </Col>
            </Col>
          ))}
          <Button style={{ width: "130px" }} onClick={()=>this.addChoice(indexv)}>
                            Add Choice
            </Button> */}
        </Row>
      ));
    }
    return (
      <div>
        <FormItem label={this.props.label}>
          {formItems}
          <FormItem>
            <Button style={{ width: "100%" }} onClick={this.add}>
              {/* <Icon type="plus" /> */}
              {this.props.buttonText || "Add Field"}
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
