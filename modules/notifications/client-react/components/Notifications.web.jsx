import React from 'react';
import Grid from 'hedron';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Icon,
  List
  // , Spin
} from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import Notification from './Notification';

const NotifAttr = css`
  background: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 0 0 2px 2px;
  color: #1d2129;
  width: 430px;
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  display: ${props => props.visible};
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 13px solid white;
  position: absolute;
  top: 40px;
  left: 16px;
  z-index: 3;
`;

const NotifHeader = styled(Grid.Bounds)`
  ${NotifAttr}

  padding: 0px 0px 0px 5px;
  border-bottom: 1px solid #aaa;
  height: 40px;
  position: absolute;
  right: 1px;
  z-index: 2;
`;

const NotifHeaders = styled(Grid.Box)`
  position: relative;
  top: -6px;
`;

const Uonhover = styled.a`
  cursor: pointer;
  padding: 0px 10px 0px 0px;
  &:hover {
    text-decoration: underline;
  }
`;
const NotifBody = styled.div`
  ${NotifAttr}

  height: 366px;
  overflow-x: auto;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);

  position: absolute;
  top: 89px;
  right: 1.5px;
  z-index: 1;
`;

const NotifFooter = styled(Grid.Bounds)`
  ${NotifAttr}

  border-top: 1px solid #aaa;
  z-index: 2;
  position: absolute;
  right: 1px;
  top: 454px;
`;

const NotifVisible = styled(Grid.Bounds)`
  display: ${props => props.visible};
`;

const data = [
  {
    id: 1,
    time: '1 hr ago',
    title: 'This is the title'
    // ,
    // name: {
    //   first: 'Rishabh',
    //   last: 'kohale'
    // }
  },
  {
    id: 2,
    time: '1 hr ago',
    title: 'This is the title'
    // ,
    // name: {
    //   first: 'Rishabh',
    //   last: 'kohale'
    // }
  },
  {
    id: 3,
    time: '1 hr ago',
    title: 'This is the title'
    // ,
    // name: {
    //   first: 'Rishabh',
    //   last: 'kohale'
    // }
  },
  {
    id: 4,
    time: '1 hr ago',
    title: 'This is the title'
    // ,
    // name: {
    //   first: 'Rishabh',
    //   last: 'kohale'
    // }
  },
  {
    id: 5,
    time: '1 hr ago',
    title: 'This is the title'
    // ,
    // name: {
    //   first: 'Rishabh',
    //   last: 'kohale'
    // }
  },
  {
    id: 6,
    time: '1 hr ago',
    title: 'This is the title'
    // ,
    // name: {
    //   first: 'Rishabh',
    //   last: 'kohale'
    // }
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
        <NotifHeaders>
          <h4>
            <b>Notifications</b>
          </h4>
        </NotifHeaders>
        <NotifHeaders shiftRight>
          <Uonhover href="#">Mark all as read</Uonhover>
        </NotifHeaders>
        <NotifHeaders center>
          <Uonhover href="#">Settings</Uonhover>
        </NotifHeaders>
      </NotifHeader>
    );
  };

  notifBody = () => {
    return (
      <NotifBody>
        <List
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <Notification
                avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                title={<a href="#">{item.title}</a>}
                time={item.time}
              />
            </List.Item>
          )}
        >
          {/* {this.state.loading && this.state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )} */}
        </List>
      </NotifBody>
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
      >
        <div onMouseEnter={this.handleDisplay} onMouseLeave={this.handleDisplay}>
          <div className="ant-dropdown-link">
            <Icon type="bell" />
            <ArrowUp visible={this.state.visible} />
          </div>
          <NotifVisible visible={this.state.visible} direction="vertical">
            <Grid.Box>{this.notifHeader()}</Grid.Box>
            <Grid.Box>{this.notifBody()}</Grid.Box>
            <Grid.Box>{this.notifFooter()}</Grid.Box>
          </NotifVisible>
        </div>
      </Grid.Provider>
    );
  }
}

Notifications.propTypes = {};

export default translate('notification')(Notifications);
