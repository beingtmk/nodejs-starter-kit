import React from 'react';
import Grid from 'hedron';
import { List, Divider } from 'antd';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import Notification from '../components/Notification';

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
    data: []
  };

  componentDidMount() {
    this.setState({ data: data });
  }

  renderMetaData = t => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('meta')}`
          }
        ]}
      />
    );
  };

  renderContent = () => {
    return (
      // <NotifBody>
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
      // </NotifBody>
    );
  };

  render() {
    const { t } = this.props;

    return (
      <PageLayout>
        <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
          <Grid.Bounds direction="vertical">
            <h1>Your Notifications</h1>
            <Divider />
            {() => this.renderMetaData(t)}
            <Grid.Box sm={{ hidden: 'true' }}>
              <LayoutCenter>{this.renderContent()}</LayoutCenter>
            </Grid.Box>
            <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
              {this.renderContent()}
            </Grid.Box>
          </Grid.Bounds>
        </Grid.Provider>
      </PageLayout>
    );
  }
}

Notifications.propTypes = {
  t: PropTypes.func
};

export default translate('notifications')(Notifications);
