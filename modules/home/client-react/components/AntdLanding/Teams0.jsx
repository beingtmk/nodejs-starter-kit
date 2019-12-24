import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { getChildrenToRender } from './utils';
import 'rc-banner-anim/assets/index.css';

const Teams00DataSource = {
  wrapper: { className: 'home-page-wrapper teams0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page teams0' },
  BannerAnim: {
    className: 'banner-anim',
    children: [
      {
        name: 'elem0',
        className: 'teams0-banner-user-elem',
        titleWrapper: {
          className: 'teams0-content-wrapper',
          children: [
            {
              name: 'image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ',
              className: 'teams0-image'
            },
            {
              name: 'content',
              children:
                'SEE = Seeking Experience & Engineering，意为探索用户体验与工程实践，由蚂蚁金服集团每年举办 1-2 次，包括专业分享、产品展台、Workshop 等内容。',
              className: 'teams0-content'
            },
            { name: 'title', children: '韩勇', className: 'teams0-h1' },
            {
              name: 'content2',
              children: '公司+职位 信息暂缺',
              className: 'teams0-content'
            }
          ]
        }
      },
      {
        name: 'elem1',
        className: 'teams0-banner-user-elem',
        titleWrapper: {
          className: 'teams0-content-wrapper',
          children: [
            {
              name: 'image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ',
              className: 'teams0-image'
            },
            {
              name: 'content',
              children:
                'SEE = Seeking Experience & Engineering，意为探索用户体验与工程实践，由蚂蚁金服集团每年举办 1-2 次，包括专业分享、产品展台、Workshop 等内容。',
              className: 'teams0-content'
            },
            { name: 'title', children: '叶秀英', className: 'teams0-h1' },
            {
              name: 'content2',
              children: '公司+职位 信息暂缺',
              className: 'teams0-content'
            }
          ]
        }
      }
    ]
  }
};

class Teams extends React.PureComponent {
  getChildrenToRender = children => {
    return children.map((item, i) => {
      const { titleWrapper, ...elementPros } = item;
      return (
        <Element {...elementPros} key={i.toString()} prefixCls={elementPros.className}>
          <QueueAnim type={['bottom', 'top']} delay={200} key="text" {...titleWrapper}>
            {titleWrapper.children.map(getChildrenToRender)}
          </QueueAnim>
        </Element>
      );
    });
  };

  render() {
    const { ...tagProps } = this.props;
    const { isMobile } = tagProps;
    const dataSource = Teams00DataSource;
    delete tagProps.isMobile;
    return (
      <div {...tagProps} {...dataSource.wrapper}>
        <OverPack {...dataSource.OverPack}>
          <TweenOne
            key="wrapper"
            animation={
              isMobile
                ? {
                    scaleY: '+=0.3',
                    opacity: 0,
                    type: 'from',
                    ease: 'easeOutQuad'
                  }
                : {
                    y: '+=30',
                    opacity: 0,
                    type: 'from',
                    ease: 'easeOutQuad'
                  }
            }
            resetStyle
            component=""
          >
            <BannerAnim type="across" arrow={false} dragPlay={!!isMobile} {...dataSource.BannerAnim}>
              {this.getChildrenToRender(dataSource.BannerAnim.children)}
            </BannerAnim>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Teams;
