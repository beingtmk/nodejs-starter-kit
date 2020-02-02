import React from 'react';
import Grid from 'hedron';
import { PropTypes } from 'prop-types';

import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';

const Notification = ({ avatar, title, time }) => {
  return (
    <Grid.Provider padding="0px" breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
      <Grid.Bounds direction="horizontal" fill={true}>
        <Grid.Box margin="5px 20px 0px 20px">
          <UserAvatar src={avatar} />
        </Grid.Box>
        <Grid.Box>
          <Grid.Bounds direction="vertical" fill={true}>
            <Grid.Box>{title}</Grid.Box>
            <Grid.Box>{time}</Grid.Box>
          </Grid.Bounds>
        </Grid.Box>
      </Grid.Bounds>
    </Grid.Provider>
  );
};

Notification.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.object,
  time: PropTypes.string
};

export default Notification;
