import React from "react";
import PropTypes from "prop-types";
import {  FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col } from "antd";
import { RenderField, RenderUpload, Button } from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";

const FormItem = Form.Item;

export default class RenderQuestionsField extends React.Component {
  add = () => {
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};
    const keys = this.props.keys;

    obj[keys.key] = "";
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
        <Row>
          <Col span={24}>
            <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
              <Row gutter={10}>
                <Col span={20}>
                  <Field
                    name={`questions[${indexv}].description`}
                    component={RenderField}
                    placeholder={keys.placeholder || keys.key}
                    type="text"
                    label={<h3 style={{marginBottom:'0', display:'inline'}}>{`${keys.label}-${indexv+1}`}</h3>}
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    value={v.description}
                    //   key={indexv}
                    // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />
                </Col>

                {/* {k.type == 'number' ? (
                <Field
                  name={`${name}[${indexv}].${k.key}`}
                  component={RenderField}
                  placeholder={k.placeholder || k.key}
                  type="number"
                  label={`${k.label || k.key}`}
                  value={v[k.key]}
                  key={indexv}
                />
              ) : null} */}

                {/* {k.type == 'image' ? (
                <Field
                  name={`${name}[${indexv}].${k.key}`}
                  component={RenderUpload}
                  type="text"
                  setload={this.props.setload}
                  label={k.label || k.key}
                  value={v[k.key]}
                  key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                />
              ) : null} */}
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
              </Row>
              <FieldArray
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
            />
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
