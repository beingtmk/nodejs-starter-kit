import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col, Button } from 'antd';
import { getChildrenToRender } from './utils';

const Pricing10DataSource = {
  wrapper: { className: 'home-page-wrapper pricing1-wrapper' },
  page: { className: 'home-page pricing1' },
  OverPack: { playScale: 0.3, className: 'pricing1-content-wrapper' },
  titleWrapper: {
    className: 'pricing1-title-wrapper',
    children: [{ name: 'title', children: '价目表', className: 'pricing1-title-h1' }]
  },
  block: {
    className: 'pricing1-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'pricing1-block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'pricing1-block-box ' },
          topWrapper: { className: 'pricing1-top-wrapper' },
          name: { className: 'pricing1-name', children: 'Free' },
          money: { className: 'pricing1-money', children: '¥0' },
          content: {
            className: 'pricing1-content',
            children: (
              <>
                <span>
                  140-500Mbps
                  <br /> 140 GB-50TB（含）
                  <br /> 14500GB流量包
                  <br /> 14国内按峰值宽带账单
                  <br /> 14弹性计算
                  <br /> 14云服务器 ECS{' '}
                </span>
              </>
            )
          },
          line: { className: 'pricing1-line' },
          buttonWrapper: {
            className: 'pricing1-button-wrapper',
            children: {
              a: {
                className: 'pricing1-button',
                href: '#',
                children: '免费试用'
              }
            }
          }
        }
      },
      {
        name: 'block1',
        className: 'pricing1-block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'pricing1-block-box active' },
          topWrapper: { className: 'pricing1-top-wrapper' },
          name: { className: 'pricing1-name', children: 'Starter' },
          money: { className: 'pricing1-money', children: '¥199' },
          content: {
            className: 'pricing1-content',
            children: (
              <>
                <span>
                  14500-5Gbps
                  <br />
                  1410 GB-50TB（含）
                  <br />
                  141TB流量包
                  <br />
                  14国内按峰值宽带账单
                  <br />
                  14弹性计算
                  <br />
                  云服务器 ECS
                </span>
              </>
            )
          },
          line: { className: 'pricing1-line' },
          buttonWrapper: {
            className: 'pricing1-button-wrapper',
            children: {
              a: {
                className: 'pricing1-button',
                href: '#',
                children: '立即购买'
              }
            }
          }
        }
      },
      {
        name: 'block2',
        className: 'pricing1-block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'pricing1-block-box ' },
          topWrapper: { className: 'pricing1-top-wrapper' },
          name: { className: 'pricing1-name', children: 'Pro' },
          money: { className: 'pricing1-money', children: '¥999' },
          content: {
            className: 'pricing1-content',
            children: (
              <>
                <span>
                  14大于5Gbps
                  <br />
                  1450 GB-100TB（含）
                  <br />
                  145TB流量包
                  <br />
                  14国内按峰值宽带账单
                  <br />
                  14弹性计算
                  <br />
                  14云服务器 ECS
                </span>
              </>
            )
          },
          line: { className: 'pricing1-line' },
          buttonWrapper: {
            className: 'pricing1-button-wrapper',
            children: {
              a: {
                className: 'pricing1-button',
                href: '#',
                children: '立即购买'
              }
            }
          }
        }
      }
    ]
  }
};

class Pricing1 extends React.PureComponent {
  getChildrenToRender = item => {
    const { wrapper, topWrapper, name, buttonWrapper, line, content, money } = item.children;
    return (
      <Col key={item.name} {...item}>
        <QueueAnim type="bottom" {...wrapper}>
          <div {...topWrapper}>
            <div {...name} key="name">
              {name.children}
            </div>
            <h1 {...money} key="money">
              {money.children}
            </h1>
          </div>
          <div {...content} key="content">
            {content.children}
          </div>
          <i {...line} key="line" />
          <div {...buttonWrapper} key="button">
            <Button {...buttonWrapper.children.a} />
          </div>
        </QueueAnim>
      </Col>
    );
  };

  render() {
    const { ...props } = this.props;
    const dataSource = Pricing10DataSource;
    delete props.isMobile;
    const { block } = dataSource;
    const childrenToRender = block.children.map(this.getChildrenToRender);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" component={Row} leaveReverse ease={['easeOutQuad', 'easeInOutQuad']} key="content">
              {childrenToRender}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Pricing1;
