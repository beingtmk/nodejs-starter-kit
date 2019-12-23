import React from 'react';
import PropTypes from 'prop-types';

import QueueAnim from 'rc-queue-anim';

const Contact00DataSource = {
  wrapper: { className: 'home-page-wrapper content10-wrapper' },
  Content: {
    className: 'icon-wrapper',
    children: {
      icon: {
        className: 'icon',
        children: 'https://gw.alipayobjects.com/zos/rmsportal/zIUVomgdcKEKcnnQdOzw.svg',
        name: '主要图标'
      },
      iconShadow: {
        className: 'icon-shadow',
        children: 'https://gw.alipayobjects.com/zos/rmsportal/WIePwurYppfVvDNASZRN.svg',
        name: '图标影阴'
      },
      url: { children: 'https://gaode.com/place/B0FFH3KPBX', name: '跳转地址' },
      title: { children: '大会地址', name: '弹框标题' },
      content: {
        children: '蚂蚁 Z 空间  浙江省杭州市西湖区西溪路556号',
        name: '弹框内容'
      }
    }
  }
};

class Content10 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: props.isMobile
    };
  }

  onClick = () => {
    window.open(Contact00DataSource.Content.children.url.children);
  };

  markerEnter = () => {
    this.setState({
      showInfo: true
    });
  };

  markerLeave = () => {
    this.setState({
      showInfo: false
    });
  };

  render() {
    const { ...props } = this.props;
    const dataSource = Contact00DataSource;
    delete props.isMobile;
    return (
      <div {...props} {...dataSource.wrapper}>
        <div
          {...dataSource.Content}
          onMouseEnter={this.markerEnter}
          onMouseLeave={this.markerLeave}
          onClick={this.onClick}
          onTouchEnd={this.onClick}
        >
          <div {...dataSource.Content.children.icon}>
            <img src={dataSource.Content.children.icon.children} alt="img" />
          </div>
          <div {...dataSource.Content.children.iconShadow}>
            <img src={dataSource.Content.children.iconShadow.children} alt="img" />
          </div>
        </div>
        <QueueAnim type="scale">
          {this.state.showInfo && (
            <div className="map-tip" key="map">
              <h2>{dataSource.Content.children.title.children}</h2>
              <p>{dataSource.Content.children.content.children}</p>
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}

Content10.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Content10;
