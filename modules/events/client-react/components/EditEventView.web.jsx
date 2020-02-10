import React, { Component } from 'react';
import Grid from 'hedron';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import EventFormComponent from './EventFormComponent.web';

class EditEventView extends Component {
  state = {};
  renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );

  render() {
    const { t, event, editEvent, loading, currentUser } = this.props;

    return (
      <>
        <PageLayout>
          <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
            <Grid.Bounds direction="vertical">
              {this.renderMetaData(t)}
              {loading ? (
                <Spin />
              ) : (
                <>
                  <Grid.Box sm={{ hidden: 'true' }}>
                    <LayoutCenter>
                      <EventFormComponent t={t} event={event} onSubmit={editEvent} currentUser={currentUser} />
                    </LayoutCenter>
                  </Grid.Box>
                  <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
                    <EventFormComponent t={t} event={event} onSubmit={editEvent} currentUser={currentUser} />
                  </Grid.Box>
                </>
              )}
            </Grid.Bounds>
          </Grid.Provider>
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
