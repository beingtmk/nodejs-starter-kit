import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

const Teams20DataSource = {
  wrapper: { className: 'home-page-wrapper teams2-wrapper' },
  page: { className: 'home-page teams2' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '团队成员' }]
  },
  block: {
    className: 'block-wrapper',
    gutter: 72,
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '叶秀英' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: 'AntV 是蚂蚁金服全新一代数据可视化解决方案。'
            }
          ]
        }
      },
      {
        name: 'block1',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '韩勇' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: '语雀是一款优雅高效的在线文档编辑与协同工具。'
            }
          ]
        }
      },
      {
        name: 'block2',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '叶秀英' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: 'AntV 是蚂蚁金服全新一代数据可视化解决方案。'
            }
          ]
        }
      },
      {
        name: 'block3',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '叶秀英' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: 'AntV 是蚂蚁金服全新一代数据可视化解决方案。'
            }
          ]
        }
      },
      {
        name: 'block4',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '韩勇' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: '语雀是一款优雅高效的在线文档编辑与协同工具。'
            }
          ]
        }
      },
      {
        name: 'block5',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '叶秀英' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: 'AntV 是蚂蚁金服全新一代数据可视化解决方案。'
            }
          ]
        }
      },
      {
        name: 'block6',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '叶秀英' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: 'AntV 是蚂蚁金服全新一代数据可视化解决方案。'
            }
          ]
        }
      },
      {
        name: 'block7',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '韩勇' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: '语雀是一款优雅高效的在线文档编辑与协同工具。'
            }
          ]
        }
      },
      {
        name: 'block8',
        className: 'block',
        md: 8,
        xs: 24,
        image: {
          name: 'image',
          className: 'teams2-image',
          children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
        },
        titleWrapper: {
          className: 'teams2-textWrapper',
          children: [
            { name: 'title', className: 'teams2-title', children: '叶秀英' },
            {
              name: 'content',
              className: 'teams2-job',
              children: '公司+职位 信息暂缺'
            },
            {
              name: 'content1',
              className: 'teams2-content',
              children: 'AntV 是蚂蚁金服全新一代数据可视化解决方案。'
            }
          ]
        }
      }
    ]
  }
};

class Teams2 extends React.PureComponent {
  getBlockChildren = data =>
    data.map((item, i) => {
      const { titleWrapper, image, ...$item } = item;
      return (
        <Col key={i.toString()} {...$item}>
          <Row>
            <Col span={7}>
              <div {...image}>
                <img src={image.children} alt="img" />
              </div>
            </Col>
            <Col span={17}>
              <QueueAnim {...titleWrapper} type="bottom">
                {titleWrapper.children.map(getChildrenToRender)}
              </QueueAnim>
            </Col>
          </Row>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const dataSource = Teams20DataSource;

    delete props.isMobile;
    const listChildren = this.getBlockChildren(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="tween" leaveReverse>
              <QueueAnim type="bottom" key="block" {...dataSource.block} component={Row}>
                {listChildren}
              </QueueAnim>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Teams2;
