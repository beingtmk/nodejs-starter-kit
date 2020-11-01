import React from 'react';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

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
    const { t, ...props } = this.props;
    const { isMobile } = props;
    const Feature40DataSource = {
      wrapper: { className: 'home-page-wrapper content6-wrapper' },
      OverPack: { className: 'home-page content6' },
      textWrapper: { className: 'content6-text', xs: 24, md: 10 },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('feature4.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          },
          {
            name: 'content',
            className: 'title-content',
            children: t('feature4.titleWrapper.content')
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
            title: { className: 'content6-title', children: t('feature4.block.block0.title') },
            content: {
              className: 'content6-content',
              children: t('feature4.block.block0.content')
            }
          },
          {
            name: 'block1',
            img: {
              className: 'content6-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png'
            },
            title: { className: 'content6-title', children: t('feature4.block.block1.title') },
            content: {
              className: 'content6-content',
              children: t('feature4.block.block1.content')
            }
          },
          {
            name: 'block2',
            img: {
              className: 'content6-icon',
              children: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png'
            },
            title: { className: 'content6-title', children: t('feature4.block.block2.title') },
            content: {
              className: 'content6-content',
              children: t('feature4.block.block2.content')
            }
          }
        ]
      }
    };
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
Content7.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Content7);
