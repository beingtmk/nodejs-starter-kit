import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col } from "antd";
import { RenderField, RenderUpload, Button, RenderCheckBox, RenderSelect, Option, Card } from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";
import QuestionTypes from '@gqlapp/quiz-common/constants/QuestionTypes';
import RenderQuestionsField from "./RenderQuestionsField";

const FormItem = Form.Item;


export default class RenderSectionsField extends React.Component {
  // add = () => {
  //   const arrayHelpers = this.props.arrayHelpers;
  //   let obj = {};
  //   obj["title"] = "";
  //   obj["description"] = "";
  //   obj["isActive"] = true
  //   obj["questions"] = [];

  //   arrayHelpers.push(obj);
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
    console.log("keys", keys);
    // const handleChoices = (data) => (values.choices = data);
    const handleQuestions = (data) => (values.questions = data);
    const {addSection, deleteSection, submitQuestion, deleteQuestion, quizId} = this.props;
    if (values && values.length !== 0) {
      formItems = values.map((v, indexv) => (
        <Card
          style={{marginBottom:'10px'}}
          title={<h4>{`Section ${indexv + 1}`}</h4>}
          extra={
            <>
              {values.length >= 1 ? (
                <Icon
                  style={{fontSize: "25px" }}
                  title="Remove "
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => deleteSection(v.id)}
                />
              ) : null}
            </>
          }
        >

          <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
            <Row gutter={10}>
              <Col span={20}>
                <Field
                  name={`sections[${indexv}].title`}
                  component={RenderField}
                  placeholder={'Title'}
                  type="text"
                  label={<h3 style={{ marginBottom: '0', display: 'inline' }}>{`Title`}</h3>}
                  value={v.title}
                />
                <Field
                  name={`sections[${indexv}].description`}
                  component={RenderField}
                  placeholder={`Section Description `}
                  type="text"
                  label={<h3 style={{ marginBottom: '0', display: 'inline' }}>{`Section Description`}</h3>}
                  value={v.description}
                />
              </Col>
              <Col span={12}>
                <Field
                  name={`sections[${indexv}].isActive`}
                  component={RenderCheckBox}
                  type="checkbox"
                  label={<h5 style={{ marginBottom: '0', display: 'inline' }}>Is Active</h5>}
                  checked={v.isActive}
                />
              </Col>
            </Row>
            <FieldArray
              name={`sections[${indexv}].questions`}
              render={arrayHelpersQ => (
                <RenderQuestionsField
                  sectionId={v.id}
                  submitQuestion={submitQuestion}
                  deleteQuestion={deleteQuestion}
                  sectionIndex={indexv}
                  arrayHelpers={arrayHelpersQ}
                  values={v.questions}
                  name={`sections[${indexv}].questions`}
                />
              )}
              questionsVal={v.questions}
              handleQuestions={handleQuestions}
            />

          </FormItem>
        </Card>
      ));
    }
    return (
      <div>
        <FormItem label={this.props.label}>
          {formItems}
          <FormItem>
            <Button style={{ width: "100%" }} onClick={()=> addSection(quizId)}>
              {/* <Icon type="plus" /> */}
              {"Add Section"}
            </Button>
          </FormItem>
        </FormItem>
      </div>
    );
  }
}

RenderSectionsField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  keys: PropTypes.object,
  setload: PropTypes.func,

  buttonText: PropTypes.string,
  arrayHelpers: PropTypes.object,
};
