import React from "react";
import moment from "moment";
import Grid from "hedron";
import { PropTypes } from "prop-types";
import { Form, DatePicker, Card, Select, TimePicker } from "antd";
import { withFormik, FieldArray } from "formik";

import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { minLength, required, validate } from "@gqlapp/validation-common-react";
import {
  RenderField,
  RenderUpload,
  Button,
  RenderContentField,
  RenderSelect,
  RenderUploadMultiple,
  RenderDynamicField,
  RenderCheckBox,
} from "@gqlapp/look-client-react";

// import RenderUserNameSearchSelect from './FormComponents/RenderUsernameSearchSelect';

// import AddAdminsComponent from './AddAdminsComponent.web';
const FormItem = Form.Item;

// const editFaqFormSchema = {
//   title: [required, minLength(3)],
//   details: [required, minLength(20)],
//   venue: [required],
//   date: [required],
//   time: [required],
//   // username: [required],
//   // contactInfo: [required]
// };

const FaqFormComponent = ({
  t,
  cardTitle,
  values,
  handleSubmit,
  setFieldValue,
  isAdminShow,
}) => {
  const dateFormat = "YYYY/MM/DD";
  const onChangeDate = (value) => {
    setFieldValue("date", value.format(dateFormat));

    // const { values } = this.props;
    // values.date = value.format('YYYY-MM-DD');
    // values.time = value._d.toTimeString();
    // console.log('values', this.props.values);
  };
  const onChangeTime = (value) => {
    setFieldValue("time", value._d.toTimeString());

    // const { values } = this.props;
    // values.date = value.format('YYYY-MM-DD');
    // values.time = value._d.toTimeString();
    // console.log('values', this.props.values);
  };

  const [load, setload] = React.useState(false);
  return (
    <Card
      title={
        <h1>
          <strong>{cardTitle}</strong>
        </h1>
      }
    >
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Field
          name="question"
          component={RenderField}
          placeholder="Question"
          type="text"
          label="Question"
          value={values.question}
        />
        <Field
          name="answer"
          component={RenderField}
          placeholder="Answer"
          type="textarea"
          label="Answer"
          value={values.answer}
        />
        <Field
          name="isFeatured"
          component={RenderCheckBox}
          type="checkbox"
          label="Is Featured"
          checked={values.isFeatured}
        />

        


        <Button color="primary" type="submit" disabled={load}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

FaqFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  deleteAdmin: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
};

const EditFaqWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      id: (props.faq && props.faq.id) || null,
      question: (props.faq && props.faq.question) || "",
      answer: (props.faq && props.faq.answer) || "",
      isFeatured: (props.faq && props.faq.isFeatured) || false,
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit },
    }
  ) {
    await onSubmit(values).catch((e) => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  // validate: (values) => validate(values, editFaqFormSchema),
  displayName: "Edit Faq", // helps with React DevTools
});

export default EditFaqWithFormik(FaqFormComponent);
