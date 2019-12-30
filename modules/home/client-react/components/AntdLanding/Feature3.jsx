import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

const Feature30DataSource = {
  wrapper: { className: 'home-page-wrapper content3-wrapper' },
  page: { className: 'home-page content3' },
  OverPack: { playScale: 0.3 },
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
        children: '基于阿里云强大的基础资源'
      }
    ]
  },
  block: {
    className: 'content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '企业资源管理' },
          content: {
            className: 'content3-content',
            children: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。'
          }
        }
      },
      {
        name: 'block1',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '云安全' },
          content: {
            className: 'content3-content',
            children: '按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。'
          }
        }
      },
      {
        name: 'block2',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '云监控' },
          content: {
            className: 'content3-content',
            children: '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。'
          }
        }
      },
      {
        name: 'block3',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '移动' },
          content: {
            className: 'content3-content',
            children: '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。'
          }
        }
      },
      {
        name: 'block4',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '分布式中间件' },
          content: {
            className: 'content3-content',
            children: '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。'
          }
        }
      },
      {
        name: 'block5',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png'
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '大数据' },
          content: {
            className: 'content3-content',
            children: '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。'
          }
        }
      }
    ]
  }
};

class Content3 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  render() {
    const { ...props } = this.props;
    const { isMobile } = props;
    const dataSource = Feature30DataSource;
    delete props.dataSource;
    delete props.isMobile;
    let clearFloatNum = 0;
    const children = dataSource.block.children.map((item, i) => {
      const childObj = item.children;
      const delay = isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
      const liAnim = {
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad',
        delay
      };
      const childrenAnim = { ...liAnim, x: '+=10', delay: delay + 100 };
      clearFloatNum += item.md;
      clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum;
      return (
        <TweenOne
          component={Col}
          animation={liAnim}
          key={item.name}
          {...item}
          componentProps={{ md: item.md, xs: item.xs }}
          className={!clearFloatNum ? `${item.className || ''} clear-both`.trim() : item.className}
        >
          <TweenOne
            animation={{
              x: '-=10',
              opacity: 0,
              type: 'from',
              ease: 'easeOutQuad'
            }}
            key="img"
            {...childObj.icon}
          >
            <img src={childObj.icon.children} width="100%" alt="img" />
          </TweenOne>
          <div {...childObj.textWrapper}>
            <TweenOne key="h2" animation={childrenAnim} component="h2" {...childObj.title}>
              {childObj.title.children}
            </TweenOne>
            <TweenOne key="p" animation={{ ...childrenAnim, delay: delay + 200 }} component="div" {...childObj.content}>
              {childObj.content.children}
            </TweenOne>
          </div>
        </TweenOne>
      );
    });
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim key="u" type="bottom">
              <Row key="row" {...dataSource.block}>
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content3;
