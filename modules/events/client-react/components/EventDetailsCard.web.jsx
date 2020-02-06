import React from 'react';
import { PropTypes } from 'prop-types';
import { Divider, Button, Icon } from 'antd';

import {
  Card
  // , Alert
} from '@gqlapp/look-client-react';

import ParticipantDetail from './ParticipantDetails';

const EventDetailsCard = ({ event, deleteEvent }) => {
  const [
    // error,
    setError
  ] = React.useState([]);

  const handleDeleteEvent = async id => {
    try {
      await deleteEvent(id);
    } catch (e) {
      setError({ error: e.message });
    }
  };
  return (
    <>
      {/* {error && <Alert color="error">{error}</Alert>} */}
      {event && (
        <>
          <Card>
            <h1>{event.title}</h1>
            {event.details && (
              <>
                <h4>{event.details} </h4>
                <h4>Venue: {event.venue} </h4>
                <h4>Date: {event.date}</h4>
                <h4>Time: {event.time}</h4>
                <a href={`/edit-event/${event.id}`}>
                  <Button color="primary">
                    <Icon type="edit" />
                  </Button>
                </a>
                <Divider type="vertical" />
                <Button color="primary" onClick={() => handleDeleteEvent(event.id)}>
                  <Icon type="delete" />
                </Button>
              </>
            )}
          </Card>
          {event.details && (
            <Card>
              <h3>Admin List: </h3>
              {event.admins.map(admin => (
                <div>
                  <h4>
                    {admin.username}: {admin.contactInfo}
                  </h4>
                  {/* <Divider /> */}
                </div>
              ))}
            </Card>
          )}
          {event.details && (
            <Card>
              <h3>Participants List: </h3>
              {event.participants.map(participant => (
                <div>
                  <ParticipantDetail participant={participant} />
                </div>
              ))}
            </Card>
          )}
        </>
      )}
    </>
  );
};

EventDetailsCard.propTypes = {
  event: PropTypes.object,
  deleteEvent: PropTypes.func
};

export default EventDetailsCard;
