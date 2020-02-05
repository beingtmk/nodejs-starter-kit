import React from 'react';
import { Spin, Calendar, Badge } from 'antd';
import Helmet from 'react-helmet';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';
import EventDetailsCard from './EventDetailsCard.web';

class EventsView extends React.Component {
  state = {
    event: null
  };

  NoSelectedEvent = {
    title: 'Select an event to view details'
  };

  handleStateEvent = event => {
    // console.log('event', event);
    this.setState({ event });
  };

  getMonthNumber = value => {
    return ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(
      value.toLowerCase()
    );
  };

  getListEventData = value => {
    let listEventData = [];
    this.props.events.map(event => {
      const date = event.date.split(' ');
      value.date() === Number(date[2]) &&
        value.month() === Number(this.getMonthNumber(date[1])) &&
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
            <Badge status="success" text={event.title} onClick={() => this.handleStateEvent(event)} />
          </li>
        ))}
      </ul>
    );
  };

  getMonthData(value) {
    const monthEvents = [];
    this.props.events.map(event => {
      const date = event.date.split(' ');
      value.month() === Number(this.getMonthNumber(date[1])) && monthEvents.push(event);
    });
    return monthEvents;
  }

  monthCellRender = value => {
    const events = this.getMonthData(value);
    return events ? (
      <div className="notes-month">
        {events.map(event => (
          <>
            <span onClick={() => this.handleStateEvent(event)}>{event.title}</span>
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

  render() {
    const { t, loading } = this.props;
    return (
      <PageLayout>
        {this.renderMetaData(t)}
        {/* <div className="text-center">
        <p>{t('welcomeText')}</p>
      </div> */}
        {loading ? (
          <LayoutCenter>
            <Spin />
          </LayoutCenter>
        ) : (
          <>
            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
            {this.state.event ? (
              <EventDetailsCard event={this.state.event} />
            ) : (
              <EventDetailsCard event={this.NoSelectedEvent} />
            )}
          </>
        )}
      </PageLayout>
    );
  }
}

EventsView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  events: PropTypes.object
};

export default EventsView;
