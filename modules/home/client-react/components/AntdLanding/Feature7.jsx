import React from 'react';
import PropTypes from 'prop-types';

import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';

import { getChildrenToRender } from './utils';

const Feature70DataSource = {
  wrapper: { className: 'home-page-wrapper feature7-wrapper' },
  page: { className: 'home-page feature7' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'feature7-title-wrapper',
    children: [
      {
        name: 'title',
        className: 'feature7-title-h1',
        children: '图像在线服务'
      },
      {
        name: 'content',
        className: 'feature7-title-content',
        children: '你可以直接快速接入图像能力'
      }
    ]
  },
  blockWrapper: {
    className: 'feature7-block-wrapper',
    gutter: 24,
    children: [
      {
        md: 6,
        xs: 24,
        name: 'block0',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block1',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block2',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block3',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block4',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block5',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block6',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      },
      {
        md: 6,
        xs: 24,
        name: 'block7',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: '身份证'
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: '识别身份证正反面姓名、身份证号、发证机关等相关信息'
            }
          ]
        }
      }
    ]
  }
};

function Feature7(props) {
  const { isMobile, ...tagProps } = props;
  const dataSource = Feature70DataSource;
  const { blockWrapper, titleWrapper } = dataSource;
  const childrenToRender = blockWrapper.children.map((item, i) => (
    <Col {...item} key={i.toString()}>
      <a {...item.children}>{item.children.children.map(getChildrenToRender)}</a>
    </Col>
  ));
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div {...dataSource.titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim key="queue" type="bottom" leaveReverse interval={50} component={Row} {...blockWrapper}>
            {childrenToRender}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

Feature7.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  dataSource: PropTypes.shape({
    wrapper: PropTypes.object,
    page: PropTypes.object,
    titleWrapper: PropTypes.shape({
      children: PropTypes.object
    }),
    blockWrapper: PropTypes.shape({
      children: PropTypes.object
    }),
    OverPack: PropTypes.object
  })
};

export default Feature7;
