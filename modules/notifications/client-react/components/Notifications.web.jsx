import React from 'react';
import Grid from 'hedron';
// import PropTypes from 'prop-types';
import styled from 'styled-components'; // , { css }
import {
  Icon,
  List
  // , Spin
} from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';

// import Notification from './Notification';

const Notif = styled.div`
  width: 430px;
  height: auto;
  /* height: 430px; */
  display: ${props => props.visible};

  background: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 0 0 2px 2px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  color: #1d2129;
  position: absolute;
  right: 0;
  z-index: 999;
`;

const NotifHeader = styled(Grid.Bounds)`
  padding: 0px 0px 0px 5px;
  border-bottom: 1px solid #aaa;
  height: 40px;
  position: relative;
  top: -10px;
`;

const NotifFooter = styled(Grid.Bounds)`
  border-top: 1px solid #aaa;
`;

const Uonhover = styled.a`
  cursor: pointer;
  padding: 0px 10px 0px 0px;
  &:hover {
    text-decoration: underline;
  }
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  display: ${props => props.visible};
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 14px solid white;
  position: absolute;
  top: 36px;
  left: 14px;
`;

const AntListItemMeta = styled(List.Item.Meta).attrs({
  className: 'ant-list-item-meta-avatar'
})`
  margin-left: 16px;
`;

const ContentDiv = styled.div`
  margin-right: 25px;
`;

// const NotifBody = styled(List)`
//   /* overflow-x: auto; */
// `;

const data = [
  {
    id: 1,
    email: 'coolrpkohale123@gmail.com',
    name: {
      first: 'Rishabh',
      last: 'kohale'
    }
  },
  {
    id: 2,
    email: 'coolrpkohale123@gmail.com',
    name: {
      first: 'Rishabh',
      last: 'kohale'
    }
  },
  {
    id: 3,
    email: 'coolrpkohale123@gmail.com',
    name: {
      first: 'Rishabh',
      last: 'kohale'
    }
  },
  {
    id: 4,
    email: 'coolrpkohale123@gmail.com',
    name: {
      first: 'Rishabh',
      last: 'kohale'
    }
  },
  {
    id: 5,
    email: 'coolrpkohale123@gmail.com',
    name: {
      first: 'Rishabh',
      last: 'kohale'
    }
  },
  {
    id: 6,
    email: 'coolrpkohale123@gmail.com',
    name: {
      first: 'Rishabh',
      last: 'kohale'
    }
  }
];

class Notifications extends React.Component {
  state = {
    data: [],
    visible: 'none'
  };

  componentDidMount() {
    this.setState({ data: data });
  }

  handleDisplay = () => {
    this.setState({ visible: this.state.visible === 'none' ? 'block' : 'none' });
  };

  notifHeader = () => {
    return (
      <NotifHeader direction="horizontal">
        <Grid.Box>
          <h4>
            <b>Notifications</b>
          </h4>
        </Grid.Box>
        <Grid.Box shiftRight>
          <Uonhover href="#">Mark all as read</Uonhover>
        </Grid.Box>
        <Grid.Box center>
          <Uonhover href="#">Settings</Uonhover>
        </Grid.Box>
      </NotifHeader>
    );
  };

  notifBody = () => {
    // return <div>hello, world</div>;
    return (
      <List
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item key={item.id}>
            <AntListItemMeta
              avatar={<UserAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="#">{item.name.last}</a>}
              description={item.email}
            />
            <ContentDiv>Content</ContentDiv>
          </List.Item>
        )}
      >
        {/* {this.state.loading && this.state.hasMore && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )} */}
      </List>
    );
  };

  notifFooter = () => {
    return (
      <NotifFooter halign="center" height="25px">
        <Grid.Box>
          <a href="#">
            <b style={{ position: 'relative', top: '-14px' }}>See all</b>
          </a>
        </Grid.Box>
      </NotifFooter>
    );
  };

  render() {
    return (
      <Grid.Provider
        // debug
        padding="0px"
        breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}
      >
        <>
          <div className="ant-dropdown-link" onClick={this.handleDisplay}>
            <Icon type="bell" />
            <ArrowUp visible={this.state.visible} />
          </div>
          <Notif visible={this.state.visible}>
            <Grid.Bounds direction="vertical">
              <Grid.Box>{this.notifHeader()}</Grid.Box>
              <Grid.Box>{this.notifBody()} </Grid.Box>
              <Grid.Box>{this.notifFooter()} </Grid.Box>
            </Grid.Bounds>
          </Notif>
        </>
      </Grid.Provider>
    );
  }
}

Notifications.propTypes = {};

export default translate('notification')(Notifications);
