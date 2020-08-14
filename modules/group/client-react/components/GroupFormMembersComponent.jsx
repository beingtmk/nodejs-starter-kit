import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, FieldArray } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button, RenderUpload, Col, Row, Card, RenderDynamicField } from '@gqlapp/look-client-react';

import { MemberStatus, MemberType } from '../constants';


class GroupFormMembersComponent extends React.Component {
  state = { load: false };

  setload = load => {
    this.setState({ load });
  };

  render() {
    const { values, handleSubmit, submitting, cardTitle } = this.props;

    return (
      <Row>
        <Col sm={24} md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
          <Card
            title={
              <h1>
                <strong>{cardTitle}</strong>
              </h1>
            }
          >
            <Form name="GroupFormMembersComponent" onSubmit={handleSubmit}>


              <FieldArray
                name="members"
                render={arrayHelpers => (
                  <RenderDynamicField
                    buttonText="Add Member"
                    keys={[{ key: 'email', type: 'text' }]}
                    arrayHelpers={arrayHelpers}
                    values={values.members}
                    name="members"
                    label={'Members'}
                  />
                )}
              />

              <Button color="primary" type="submit" disabled={this.state.load || submitting}>
                {'Submit'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

GroupFormMembersComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  currentUser: PropTypes.object,
  group: PropTypes.object,
  cardTitle: PropTypes.string
  // t: PropTypes.func
};

const GroupFormMembersComponentWithFormik = withFormik({
  mapPropsToValues: props => ({
    members: (props.group && props.group.members) || []
  }),
  validate: values => validate(values, GroupFormMembersComponentSchema),
  handleSubmit(values, { props: { onSubmit, group, currentUser } }) {
    if (group) values['id'] = group.id;
    let members = [];
    let val = {};
    values.members.map(item => {
      val = {
        email: item.email,
        type: item.type || MemberType.MEMBER,
        status: item.status || MemberStatus.ADDED
      };
      if (item.id) val.id = item.id;
      members.push(val);
    });
    if (!members.some(item => item.email === currentUser.email)) {
      members.push({
        email: currentUser.email,
        type: MemberType.ADMIN,
        status: MemberStatus.ADDED
      });
    }
    values.members = members;
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'GroupFormMembersComponent' // helps with React DevTools
});

export default GroupFormMembersComponentWithFormik(GroupFormMembersComponent);
