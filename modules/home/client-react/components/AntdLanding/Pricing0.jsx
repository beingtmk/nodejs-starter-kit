import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import { getChildrenToRender } from './utils';

const Pricing00DataSource = {
  wrapper: { className: 'home-page-wrapper pricing0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page pricing0' },
  imgWrapper: { className: 'pricing0-img-wrapper', md: 12, xs: 24 },
  img: {
    className: 'pricing0-img',
    name: 'image',
    children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ'
  },
  childWrapper: {
    className: 'pricing0-text-wrapper',
    md: 12,
    xs: 24,
    children: [
      {
        name: 'title',
        children: 'OceanBase 服务器',
        className: 'pricing0-title'
      },
      {
        name: 'content',
        children:
          '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。<br/>500-5Gbps，10 GB-50TB（含），1TB流量包，国内按峰值。',
        className: 'pricing0-content'
      },
      { name: 'pricing', children: '¥2,200', className: 'pricing0-pricing' },
      {
        name: 'button',
        children: {
          icon: 'shopping-cart',
          href: '#',
          type: 'primary',
          children: '立即购买'
        }
      }
    ]
  }
};

function Pricing0(props) {
  const { ...tagProps } = props;
  const { isMobile } = tagProps;
  const dataSource = Pricing00DataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile
      ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
      : {
          x: '-=30',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
  };
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <OverPack component={Row} {...dataSource.OverPack}>
        <TweenOne
          key="img"
          animation={animType.one}
          resetStyle
          {...dataSource.imgWrapper}
          component={Col}
          componentProps={{
            md: dataSource.imgWrapper.md,
            xs: dataSource.imgWrapper.xs
          }}
        >
          <span {...dataSource.img}>
            <img src={dataSource.img.children} width="100%" alt="img" />
          </span>
        </TweenOne>
        <QueueAnim
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.childWrapper}
          component={Col}
          componentProps={{
            md: dataSource.childWrapper.md,
            xs: dataSource.childWrapper.xs
          }}
        >
          {dataSource.childWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
      </OverPack>
    </div>
  );
}

export default Pricing0;
