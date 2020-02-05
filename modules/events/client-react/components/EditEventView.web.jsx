import React, { Component } from 'react';
import { Spin } from 'antd';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import { PropTypes } from 'prop-types';
import EventFormComponent from './EventFormComponent.web';

class EditEventView extends Component {
  state = {};
  render() {
    const { t, event, editEvent, loading, currentUser } = this.props;

    return (
      <>
        <PageLayout>
          <LayoutCenter>
            <h1>Edit Event</h1>
            {loading ? (
              <Spin />
            ) : (
              <EventFormComponent t={t} event={event} onSubmit={editEvent} currentUser={currentUser} />
            )}
          </LayoutCenter>
        </PageLayout>
      </>
    );
  }
}

EditEventView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  event: PropTypes.object,
  currentUser: PropTypes.object,
  editEvent: PropTypes.func
};

export default EditEventView;
