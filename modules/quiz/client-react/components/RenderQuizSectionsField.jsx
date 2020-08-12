import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Row, Col, Radio, Button, Progress, Affix } from "antd";
import {
  RenderField,
  RenderUpload,
  RenderSelect,
  Option,
  Card,
} from "@gqlapp/look-client-react";
import RenderDynamicField from "@gqlapp/look-client-react/ui-antd/components/RenderDynamicField";
import RenderRadioGroup from "@gqlapp/look-client-react/ui-antd/components/RenderRadioGroup";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
import RenderQuizQuestionField from "./RenderQuizQuestionField";
const FormItem = Form.Item;

const SectionComponent = ({ sec, currentSection, currentUserId, questionList }) => {
  const handleResults = (data) => (values.results = data);

  return (
    <>
      <FieldArray
        name="results"
        render={(arrayHelpers) => (
          <RenderQuizQuestionField
            sectionIndex={currentSection}
            arrayHelpers={arrayHelpers}
            values={sec && sec.questions}
            name="quiz-results"
            questionList={questionList}
            currentUserId={currentUserId}
          />
        )}
        // skills={skills}
        // resultsVal={values.results}
        handleResults={handleResults}
      />
    </>
  );
};

export default class RenderSectionsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionLength:
        this.props.values &&
        this.props.values.sections &&
        this.props.values.sections.length,
      currentSection: 0,
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  nextStep = async () => {
    const { currentSection, sectionLength } = this.state;
    if (currentSection + 1 === sectionLength) {
      return false;
    }
    this.setState({ currentSection: currentSection + 1 });
    if (document) {
      if (document.body) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
    // set errors and touched
  };
  prevStep = async () => {
    const { currentSection } = this.state;
    if (currentSection === 0) {
      return false;
    }
    this.setState({ currentSection: currentSection - 1 });
    if (document) {
      if (document.body) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
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
    const currentUserId = this.props.currentUserId;
    let formItems = null;
    const questionsQ = this.props.quiz && this.props.quiz.questions;
    // const handleChoices = (data) => (values.choices = data);
    // this.add
    var sectionComponents = [];
    const SubmitButton = this.props.submitButton;

    const { currentSection, sectionLength } = this.state;

    var questionsList = [];
      values.sections &&
      values.sections.map((secI, keySec) => {
        secI &&
          secI.questions &&
          secI.questions.map((queItem, queKey) => {
            questionsList.push(queItem);
          });
      });
    return (
      <>
        <Card style={{ marginBottom: "30px" }}>
          <h3>{this.props.quizTitle}</h3>
          <Affix offsetTop={24} >
            <Progress
              percent={Math.round((currentSection / sectionLength) * 100)}
              style={{
                color: "black",
                background: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
          </Affix>
        </Card>
        <Card
          title={
            <h4>
              {values.sections[currentSection] &&
                values.sections[currentSection].title}
            </h4>
          }
        >
          <SectionComponent
            questionList={questionsList}
            strokeLinecap="square"
            sec={values.sections[currentSection]}
            currentSection={currentSection}
            currentUserId={currentUserId}
          />
          <div className='quiz-form-arrow-keys-bottom-wrapper'>
          <Row className='quiz-form-arrow-keys-bottom'>
            <Col span={12}>
              {this.state.currentSection === 0 ? (
                <></>
              ) : (
                <Button
                  type="primary"
                  size='large'
                  icon="arrow-left"
                  onClick={this.prevStep}
                ></Button>
              )}
            </Col>
            <Col span={12} align="right">
              {this.state.currentSection + 1 === this.state.sectionLength ? (
                <>
                  <SubmitButton />
                </>
              ) : (
                <Button
                  type="primary"
                  size='large'
                  icon="arrow-right"
                  onClick={this.nextStep}
                />
              )}
            </Col>
          </Row></div>
        </Card>
      </>
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
