import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import { isImg } from './utils';
import 'rc-banner-anim/assets/index.css';

const Banner20DataSource = {
  wrapper: { className: 'banner2' },
  BannerAnim: {
    children: [
      {
        name: 'elem0',
        BannerElement: { className: 'banner-user-elem' },
        page: { className: 'home-page banner2-page' },
        textWrapper: { className: 'banner2-text-wrapper' },
        bg: { className: 'bg bg0' },
        title: { className: 'banner2-title', children: 'Ant Motion' },
        content: {
          className: 'banner2-content',
          children: '一个高效的页面动画解决方案'
        },
        button: { className: 'banner2-button', children: 'Learn More' }
      }
    ]
  }
};

const BgElement = Element.BgElement;
class Banner extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { isMobile } = props;
    const dataSource = Banner20DataSource;
    delete props.isMobile;
    const childrenToRender = dataSource.BannerAnim.children.map((item, i) => {
      const elem = item.BannerElement;
      const elemClassName = elem.className;
      delete elem.className;
      const bg = item.bg;
      const textWrapper = item.textWrapper;
      const title = item.title;
      const content = item.content;
      const button = item.button;
      const page = item.page;
      const follow = !isMobile
        ? {
            delay: 1000,
            minMove: 0.1,
            data: [
              {
                id: `bg${i}`,
                value: 15,
                type: 'x'
              },
              { id: `wrapperBlock${i}`, value: -15, type: 'x' }
            ]
          }
        : null;
      return (
        <Element key={i.toString()} followParallax={follow} {...elem} prefixCls={elemClassName}>
          <BgElement key="bg" {...bg} id={`bg${i}`} />
          <div {...page}>
            <QueueAnim type={['bottom', 'top']} delay={200} key="text" {...textWrapper} id={`wrapperBlock${i}`}>
              <div key="logo" {...title}>
                {typeof title.children === 'string' && title.children.match(isImg) ? (
                  <img src={title.children} width="100%" alt="img" />
                ) : (
                  title.children
                )}
              </div>
              <div key="content" {...content}>
                {content.children}
              </div>
              <Button type="ghost" key="button" {...button}>
                {button.children}
              </Button>
            </QueueAnim>
          </div>
        </Element>
      );
    });
    return (
      <div {...props} {...dataSource.wrapper}>
        <TweenOneGroup key="bannerGroup" enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} component="">
          <BannerAnim key="BannerAnim" {...dataSource.BannerAnim}>
            {childrenToRender}
          </BannerAnim>
        </TweenOneGroup>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="banner2-icon"
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </div>
    );
  }
}

export default Banner;
