import React from 'react';
import Grid from 'hedron';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'; // , { css }
import {
  Icon,
  List
  // , Spin
} from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';

// import Notification from './Notification';

const NotifAttr = css`
  width: 430px;
  background: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 0 0 2px 2px;
  color: #1d2129;
`;

const ScrollBar = css`
  ::-webkit-scrollbar {
    width: 5px;
    display: none;

    &-track {
      background: #f1f1f1;
      border-radius: 5px;

      // &-piece {
      //   background: ;
      // }
    }

    &-thumb {
      background: #888;
      border-radius: 5px;

      &:hover {
        background: #00152a;
        // width: 7px;
        // display: initial;
      }
    }
  }
`;

const Notif = styled.div`
  height: 430px;
  display: ${props => props.visible};

  overflow-x: auto;
  ${ScrollBar}

  ${NotifAttr}
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);

  position: absolute;
  right: 0;
  z-index: 1;
`;

const NotifHeader = styled(Grid.Bounds)`
  width: 428px;

  ${NotifAttr}

  padding: 0px 0px 0px 5px;
  border-bottom: 1px solid #aaa;
  height: 40px;
  position: fixed;
  z-index: 2;
`;

const NotifHeaders = styled(Grid.Box)`
  position: relative;
  top: -6px;
`;

const NotifFooter = styled(Grid.Bounds)`
  width: 428px;

  ${NotifAttr}

  border-top: 1px solid #aaa;
  z-index: 2;
  position: fixed;
  width: 430px;
  top: 454px;
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
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 13px solid white;
  position: absolute;
  top: 40px;
  left: 16px;
  z-index: 3;
`;

const AntListItemMeta = styled(List.Item.Meta).attrs({
  className: 'ant-list-item-meta-avatar'
})`
  margin-left: 16px;
`;

const ContentDiv = styled.div`
  margin-right: 25px;
`;

// .attrs({
//   className: 'ant-list-items'
// })
const NotifBody = styled.div`
  margin-top: 40px;
  margin-bottom: 25px;
`;

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
    // return <div>hello, world</div>;
    return (
      <NotifBody>
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
