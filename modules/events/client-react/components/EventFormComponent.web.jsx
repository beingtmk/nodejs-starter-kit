import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { Form, DatePicker } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import {
  RenderField,
  Button
  // , RenderDynamicField
} from '@gqlapp/look-client-react';

import AddAdminsComponent from './AddAdminsComponent.web';

const FormItem = Form.Item;

const editEventFormSchema = {
  title: [required, minLength(3)],
  details: [required, minLength(20)],
  venue: [required],
  date: [required],
  time: [required]
  // username: [required],
  // contactInfo: [required]
};

class EventFormComponent extends React.Component {
  state = {};

  onChange = value => {
    const { values } = this.props;
    values.date = value._d.toDateString();
    values.time = value._d.toTimeString();
    // console.log('values', this.props.values);
  };

  onOk = value => {
    const { values } = this.props;
    values.date = value._d.toDateString();
    values.time = value._d.toTimeString();
    // console.log('values', this.props.values);
  };

  render() {
    const { t, values, handleSubmit, deleteAdmin } = this.props;
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={RenderField}
            placeholder="Event Title"
            type="text"
            label="Event Title"
            value={values.title}
          />
          <Field
            name="details"
            component={RenderField}
            placeholder="Event Details"
            type="textarea"
            label="Event Details"
            value={values.details}
          />
          <Field
            name="venue"
            component={RenderField}
            placeholder="Event Venue"
            type="text"
            label="Event Venue"
            value={values.venue}
          />
          <FormItem label={t('editEvent.form.field.date')}>
            <DatePicker
              showTime
              placeholder={moment(`${values.date}`, 'YYYY-MM-DD')._i}
              onChange={this.onChange}
              onOk={this.onOk}
              // defaultValue={moment(`${values.date}`, 'YYYY-MM-DD')}
            />
            {/* {console.log('date+time', moment(`${values.date} ${values.time}`, 'YYYY-MM-DD HH:mm:ss')._i)} */}
          </FormItem>

          {/* <FieldArray
            name="admins"
            render={arrayHelpers => (
              <RenderDynamicField
                keys={[{ key: 'username', type: 'text' }, { key: 'contactInfo', type: 'text' }]}
                buttonText="Add Admin"
                style={{ width: '40%' }}
                arrayHelpers={arrayHelpers}
                values={values.admins}
                name="admins"
                label={t('editEvent.form.field.admins')}
              />
            )}
          /> */}
          <FieldArray
            name="admins"
            render={arrayHelpers => (
              <AddAdminsComponent
                keys={[
                  { key: 'username', placeholder: 'Name', type: 'text' },
                  { key: 'contactInfo', placeholder: 'Contact Info', type: 'text' }
                ]}
                buttonText="Add Admin"
                style={{ width: '40%' }}
                arrayHelpers={arrayHelpers}
                values={values.admins}
                name="admins"
                label={t('editEvent.form.field.admins')}
                deleteValue={deleteAdmin}
              />
            )}
          />

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

EventFormComponent.propTypes = {
  t: PropTypes.func,
  deleteAdmin: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const EditEventWithFormik = withFormik({
  mapPropsToValues: props => {
    function getAdmin(admin) {
      return {
        id: (admin && admin.id) || null,
        userId: (admin && admin.userId) || (props.currentUser && props.currentUser.id) || null,
        username: (admin && admin.username) || '',
        contactInfo: (admin && admin.contactInfo) || ''
      };
    }

    return {
      id: (props.event && props.event.id) || null,
      userId: (props.event && props.event.userId) || (props.currentUser && props.currentUser.id) || null,
      title: (props.event && props.event.title) || '',
      details: (props.event && props.event.details) || '',
      venue: (props.event && props.event.venue) || '',
      date: (props.event && props.event.date) || '',
      time: (props.event && props.event.time) || '',
      admins: (props.event && props.event.admins.map(getAdmin)) || []
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit }
    }
  ) {
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, editEventFormSchema),
  displayName: 'Edit Event' // helps with React DevTools
});

export default EditEventWithFormik(EventFormComponent);
