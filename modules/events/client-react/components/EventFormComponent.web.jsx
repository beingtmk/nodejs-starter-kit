import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { Form, DatePicker } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, Button, RenderDynamicField } from '@gqlapp/look-client-react';

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

  onOk = value => {
    const { values } = this.props;
    values.date = value._d.toDateString();
    values.time = value._d.toTimeString();
  };

  render() {
    const { t, values, handleSubmit } = this.props;
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
          <DatePicker
            showTime
            placeholder={moment(`${values.date}`, 'YYYY-MM-DD')._i}
            onOk={this.onOk}
            // defaultValue={moment(`${values.date}`, 'YYYY-MM-DD')}
          />
          {/* {console.log(
            'date+time',
            moment(`${values.date} ${values.time}`, 'YYYY-MM-DD HH:mm:ss')._i
          )} */}
          <FieldArray
            name="admins"
            render={arrayHelpers => (
              <RenderDynamicField
                keys={[{ key: 'username', type: 'text' }, { key: 'contactInfo', type: 'text' }]}
                buttonText="Add Admin"
                style={{ width: '40%' }}
                arrayHelpers={arrayHelpers}
                values={values.admins}
                name="admins"
                label={t('userEdit.form.field.addresses')}
              />
            )}
          />

          {/* <AddAdminsComponent
            name="admins"
            //  placeholder=""
            label="Admins"
            // value={values.admins}
            value={admins}
            user={currentUser}
            users={users}
            isAdmin={true}
          /> */}

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
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const EditEventWithFormik = withFormik({
  mapPropsToValues: props => {
    const { title, venue, details, date, time, admins } = props.event;

    function getAdmin(admin) {
      return {
        userId: (admin && admin.userId) || null,
        username: (admin && admin.username) || '',
        contactInfo: (admin && admin.contactInfo) || ''
      };
    }

    return {
      title: (title && title) || '',
      details: (details && details) || '',
      venue: (venue && venue) || '',
      date: (date && date) || '',
      time: (time && time) || '',
      admins: (admins && admins.map(getAdmin)) || []
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: {
        onSubmit,
        event: { id, userId }
      }
    }
  ) {
    values.id = id;
    values.userId = userId;
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
