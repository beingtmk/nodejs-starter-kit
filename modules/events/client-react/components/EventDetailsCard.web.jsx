import React from 'react';
import Grid from 'hedron';
import { PropTypes } from 'prop-types';
import { Divider, Button, Icon } from 'antd';

import {
  Card
  // , Alert
} from '@gqlapp/look-client-react';

import ParticipantDetail from './ParticipantDetails';

const EventDetailsCard = ({ event, handleDeleteEvent, handleAddParticipant, currentUser }) => {
  return (
    <>
      {/* {error && <Alert color="error">{error}</Alert>} */}
      {event && (
        <Grid.Bounds direction="vertical">
          <Grid.Box fill>
            <Card>
              <h1>{event.title}</h1>
              {event.details && (
                <>
                  <h4>{event.details} </h4>
                  <h4>Venue: {event.venue} </h4>
                  <h4>Date: {event.date}</h4>
                  <h4>Time: {event.time}</h4>
                  <Divider />
                  <a href={`/edit-event/${event.id}`}>
                    <Button color="primary">
                      <Icon type="edit" />
                    </Button>
                  </a>
                  <Divider type="vertical" />
                  <Button color="primary" onClick={() => handleDeleteEvent(event.id)}>
                    <Icon type="delete" />
                  </Button>
                  <Divider type="vertical" />
                  <Button color="primary" onClick={() => handleAddParticipant(event.id, currentUser.id)}>
                    <Icon type="plus" />
                  </Button>
                </>
              )}
            </Card>
          </Grid.Box>
          <Grid.Box>
            {event.details && (
              <Card>
                <h3>Admin List: </h3>
                {event.admins.map(admin => (
                  <div>
                    <Divider />
                    <h4>
                      {admin.username}: {admin.contactInfo}
                    </h4>
                  </div>
                ))}
              </Card>
            )}
          </Grid.Box>
          <Grid.Box>
            {event.details && (
              <Card>
                <h3>Participants List: </h3>
                {event.participants.map(participant => (
                  <div>
                    {/* {console.log('participant', participant)} */}
                    <ParticipantDetail participant={participant} />
                  </div>
                ))}
              </Card>
            )}
          </Grid.Box>
        </Grid.Bounds>
      )}
    </>
  );
};

EventDetailsCard.propTypes = {
  event: PropTypes.object,
  currentUser: PropTypes.object,
  handleAddParticipant: PropTypes.func,
  handleDeleteEvent: PropTypes.func
};

export default EventDetailsCard;
