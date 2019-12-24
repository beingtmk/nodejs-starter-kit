import React from 'react';
import PropTypes from 'prop-types';

import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

const Feature00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '产品与服务' }]
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png'
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: '一站式业务接入'
            },
            { name: 'content', children: '支付、结算、核算接入产品效率翻四倍' }
          ]
        }
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png'
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: '一站式事中风险监控'
            },
            {
              name: 'content',
              children: '在所有需求配置环节事前风险控制和质量控制能力'
            }
          ]
        }
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png'
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: '一站式数据运营'
            },
            {
              name: 'content',
              children: '沉淀产品接入效率和运营小二工作效率数据'
            }
          ]
        }
      }
    ]
  }
};

class Content extends React.PureComponent {
  render() {
    const { isMobile, ...props } = this.props;
    const dataSource = Feature00DataSource;
    const { wrapper, titleWrapper, page, OverPack: overPackData, childWrapper } = dataSource;
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...overPackData}>
            <QueueAnim type="bottom" key="block" leaveReverse component={Row} componentProps={childWrapper}>
              {childWrapper.children.map((block, i) => {
                const { children: item, ...blockProps } = block;
                return (
                  <Col key={i.toString()} {...blockProps}>
                    <div {...item}>{item.children.map(getChildrenToRender)}</div>
                  </Col>
                );
              })}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  dataSource: PropTypes.shape({
    wrapper: PropTypes.object,
    page: PropTypes.object,
    OverPack: PropTypes.object,
    titleWrapper: PropTypes.shape({
      children: PropTypes.object
    }),
    childWrapper: PropTypes.shape({
      children: PropTypes.object
    })
  })
};

export default Content;
