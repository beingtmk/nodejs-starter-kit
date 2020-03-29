import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { isImg } from './utils';

const Banner00DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: 'https://res.cloudinary.com/www-lenshood-in/image/upload/v1580223483/nodejs-starterkit/untitled_4.svg'
  },
  content: {
    className: 'banner0-content',
    children: 'An All JavaScript Solution For Your App Needs'
  },
  button: { className: 'banner0-button', children: 'Learn More' }
};

class Banner extends React.PureComponent {
  render() {
    const { ...currentProps } = this.props;
    const dataSource = Banner00DataSource;
    delete currentProps.isMobile;
    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <QueueAnim key="QueueAnim" type={['bottom', 'top']} delay={200} {...dataSource.textWrapper}>
          <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' && dataSource.title.children.match(isImg) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div>
          <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="banner0-icon"
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </div>
    );
  }
}
export default Banner;
