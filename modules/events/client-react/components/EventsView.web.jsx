import React from 'react';
import { Spin, Calendar, Badge } from 'antd';
import Helmet from 'react-helmet';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const EventsView = ({ loading, t, events }) => {
  const getMonthNumber = value => {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months.indexOf(value.toLowerCase());
  };

  function getListEventData(value) {
    let listEventData = [];
    events.map(event => {
      const date = event.date.split(' ');
      value.date() === Number(date[2]) &&
        value.month() === Number(getMonthNumber(date[1])) &&
        listEventData.push(event);
    });
    return listEventData;
  }

  function dateCellRender(value) {
    const listEventData = getListEventData(value);
    return (
      <ul className="events">
        {listEventData.map(event => (
          <li key={event.id}>
            <Badge status="success" text={event.title} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    const monthEvents = [];
    events.map(event => {
      const date = event.date.split(' ');
      value.month() === Number(getMonthNumber(date[1])) && monthEvents.push(event);
    });
    return monthEvents;
  }

  function monthCellRender(value) {
    const events = getMonthData(value);
    return events ? (
      <div className="notes-month">
        {events.map(event => (
          <>
            <span>{event.title}</span>
          </>
        ))}
      </div>
    ) : null;
  }
  return (
    <PageLayout>
      {renderMetaData(t)}
      {/* <div className="text-center">
        <p>{t('welcomeText')}</p>
      </div> */}
      {loading ? (
        <LayoutCenter>
          <Spin />
        </LayoutCenter>
      ) : (
        <>
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </>
      )}
    </PageLayout>
  );
};

EventsView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  events: PropTypes.object
};

export default EventsView;
