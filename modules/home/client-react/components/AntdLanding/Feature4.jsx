import React from 'react';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

const Feature40DataSource = {
  wrapper: { className: 'home-page-wrapper content6-wrapper' },
  OverPack: { className: 'home-page content6' },
  textWrapper: { className: 'content6-text', xs: 24, md: 10 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: '蚂蚁金融云提供专业的服务',
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content',
        children: '基于阿里云计算强大的基础资源'
      }
    ]
  },
  img: {
    children: 'https://zos.alipayobjects.com/rmsportal/VHGOVdYyBwuyqCx.png',
    className: 'content6-img',
    xs: 24,
    md: 14
  },
  block: {
    children: [
      {
        name: 'block0',
        img: {
          children: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          className: 'content6-icon'
        },
        title: { className: 'content6-title', children: '技术' },
        content: {
          className: 'content6-content',
          children: '丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。'
        }
      },
      {
        name: 'block1',
        img: {
          className: 'content6-icon',
          children: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png'
        },
        title: { className: 'content6-title', children: '融合' },
        content: {
          className: 'content6-content',
          children:
            '解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。'
        }
      },
      {
        name: 'block2',
        img: {
          className: 'content6-icon',
          children: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png'
        },
        title: { className: 'content6-title', children: '开发' },
        content: {
          className: 'content6-content',
          children:
            '符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。'
        }
      }
    ]
  }
};

class Content7 extends React.Component {
  getBlockChildren = data =>
    data.map($item => {
      const { ...item } = $item;
      const { title, img, content } = item;
      ['title', 'img', 'content'].forEach(key => delete item[key]);
      return (
        <li key={item.name} {...item}>
          <span {...img}>
            <img src={img.children} width="100%" alt="img" />
          </span>
          <h2 {...title}>{title.children}</h2>
          <div {...content}>{content.children}</div>
        </li>
      );
    });

  render() {
    const { ...props } = this.props;
    const { isMobile } = props;
    const dataSource = Feature40DataSource;
    delete props.isMobile;
    const ulChildren = this.getBlockChildren(dataSource.block.children);
    const queue = isMobile ? 'bottom' : 'left';
    const imgAnim = isMobile
      ? {
          y: 30,
          opacity: 0,
          delay: 600,
          type: 'from',
          ease: 'easeOutQuad'
        }
      : {
          x: 30,
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        };
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack {...dataSource.OverPack} component={Row}>
          <QueueAnim
            key="text"
            type={queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.textWrapper}
            component={Col}
          >
            <div key="title" {...dataSource.titleWrapper}>
              {dataSource.titleWrapper.children.map(getChildrenToRender)}
            </div>
            <QueueAnim component="ul" key="ul" type={queue} ease="easeOutQuad" {...dataSource.block}>
              {ulChildren}
            </QueueAnim>
          </QueueAnim>
          <TweenOne key="img" animation={imgAnim} resetStyle {...dataSource.img} component={Col}>
            <img src={dataSource.img.children} width="100%" alt="img" />
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Content7;
