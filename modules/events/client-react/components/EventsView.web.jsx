import React from 'react';
import moment from 'moment';
import Grid from 'hedron';
// import { Link } from 'react-router-dom';
import {
  Tooltip,
  Modal,
  Card,
  Divider,
  Spin,
  Calendar,
  Badge,
  Button,
  Icon
  //  Select, Radio, Col, Row
} from 'antd';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';
import EventDetailsCard from './EventDetailsCard.web';

class EventsView extends React.Component {
  state = {
    visible: [],
    event: [],
    monthEvents: []
  };

  componentDidMount() {
    let { visible } = this.state;
    const events = this.props.events;
    events &&
      events.map((e, indexe) => {
        visible[indexe] = false;
      });
    this.setState({ visible });
    this.state.monthEvents = this.getMonthData(moment());
  }

  NoSelectedEvent = {
    title: 'Select an event to view details'
  };

  modalVisiblity = index => {
    const { visible } = this.state;
    visible[index] = visible[index] ? false : true;
    this.setState({ visible });
    // console.log('visible state', this.state.visible, 'index', index);
  };

  getMonthNumber = value => {
    return ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(
      value.toLowerCase()
    );
  };

  getListEventData = value => {
    let listEventData = [];
    const { events } = this.props;
    events &&
      events.map(event => {
        const date = event.date.split(' ');
        value.date() === Number(date[2]) &&
          value.month() === Number(this.getMonthNumber(date[1])) &&
          value.year() === Number(date[3]) &&
          listEventData.push(event);
      });
    return listEventData;
  };

  dateCellRender = value => {
    const listEventData = this.getListEventData(value);
    return (
      <ul className="events">
        {listEventData.map(event => (
          <li key={event.id}>
            <Badge
              status="success"
              text={event.title}
              onClick={() => this.modalVisiblity(this.props.events.indexOf(event))}
            />
          </li>
        ))}
      </ul>
    );
  };

  getMonthData(value) {
    // console.log('value', value);
    const { events } = this.props;
    const monthEvents = [];
    events &&
      events.map(event => {
        const date = event.date.split(' ');
        value.month() === Number(this.getMonthNumber(date[1])) &&
          value.year() === Number(date[3]) &&
          monthEvents.push(event);
      });
    return monthEvents;
  }

  monthCellRender = value => {
    const events = this.getMonthData(value);
    return events ? (
      <div className="notes-month">
        {events.map(event => (
          <>
            <li key={event.id}>
              <Badge
                status="success"
                text={event.title}
                onClick={() => this.modalVisiblity(this.props.events.indexOf(event))}
              />
            </li>
          </>
        ))}
      </div>
    ) : null;
  };

  renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );

  handleDeleteEvent = async id => {
    try {
      await this.props.deleteEvent(id);
    } catch (e) {
      throw Error(e);
    }
  };

  handleAddParticipant = async (eventId, userId) => {
    try {
      await this.props.addParticipant(eventId, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  render() {
    const { t, loading, currentUser, events } = this.props;
    let eventsModal = [];
    {
      events &&
        events.map(
          (event, index) =>
            (eventsModal[index] = (
              <Modal
                visible={this.state.visible[index]}
                footer={null}
                onCancel={() => this.modalVisiblity(index, event)}
              >
                <EventDetailsCard
                  event={event}
                  handleDeleteEvent={this.handleDeleteEvent}
                  handleAddParticipant={this.handleAddParticipant}
                  currentUser={currentUser}
                />
              </Modal>
            ))
        );
    }
    return (
      <PageLayout>
        <Grid.Provider
          // debug
          breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}
        >
          <Grid.Box direction="vertical">
            {this.renderMetaData(t)}

            <Grid.Box>
              <Grid.Bounds direction="horizontal">
                <Grid.Box fill>
                  <h2>{t('title')}</h2>
                </Grid.Box>
                <Grid.Box shiftRight>
                  <Tooltip title="Add Event">
                    <a href={`/add-event`} style={{ paddingLeft: '10px' }}>
                      <Button color="primary">
                        <Icon type="plus" />
                      </Button>
                    </a>
                  </Tooltip>
                </Grid.Box>
              </Grid.Bounds>
            </Grid.Box>

            {loading && !events ? (
              <Grid.Box>
                <Grid.Bounds valign="center" halign="center">
                  <Grid.Box>
                    <Spin />
                  </Grid.Box>
                </Grid.Bounds>
              </Grid.Box>
            ) : (
              <>
                <Grid.Box sm={{ hidden: 'true' }}>
                  <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
                  {events && events.map((event, index) => eventsModal[index])}
                </Grid.Box>

                <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
                  <div style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar
                      fullscreen={false}
                      mode="year"
                      onPanelChange={value => this.setState({ monthEvents: this.getMonthData(value), event: [] })}
                    />
                  </div>
                  <Divider />
                  <Card>
                    {this.state.monthEvents.length !== 0 ? (
                      <>
                        <h2>Listed Event: </h2>
                        <ul className="events">
                          {this.state.monthEvents.map(event => (
                            <li key={event.id}>
                              <Badge status="success" text={event.title} onClick={() => this.setState({ event })} />
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <h2>No Events in this Month</h2>
                    )}
                  </Card>
                  {this.state.event.length !== 0 && (
                    <EventDetailsCard
                      event={this.state.event}
                      handleDeleteEvent={this.handleDeleteEvent}
                      handleAddParticipant={this.handleAddParticipant}
                      currentUser={currentUser}
                    />
                  )}
                </Grid.Box>
              </>
            )}
          </Grid.Box>
        </Grid.Provider>
      </PageLayout>
    );
  }
}

EventsView.propTypes = {
  t: PropTypes.func,
  addParticipant: PropTypes.func,
  deleteEvent: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  events: PropTypes.object
};

export default EventsView;
