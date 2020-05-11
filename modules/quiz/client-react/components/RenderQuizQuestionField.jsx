import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col, Radio } from "antd";
import { RenderField, RenderUpload, Button, RenderSelect, Option } from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";

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
    let formItems = null;
    const questionsQ = this.props.quiz && this.props.quiz.questions;

    console.log("keys", values);
    // const handleChoices = (data) => (values.choices = data);
    // this.add
    if (values) {
      formItems = values.map((v, indexv) => (
        <Row>
          <h3>{questionsQ[indexv].description}</h3>
          <Col span={24}>
            <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
              <Field
                name={`results[${indexv}].choiceId`}
                component={RenderSelect}
                placeholder={"none"}
                type="radio"
                label={"Select From Answers"}
                // label={`${k.label || k.key} #${indexv + 1}`}
                value={v.choiceId}
                //   key={indexv}
                // style={{ display: 'inline-block', margin: '0px 5px' }}
              >
                {questionsQ[indexv].choices.map((choice, key) => (
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
