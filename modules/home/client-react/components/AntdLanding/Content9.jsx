import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Heading } from '@gqlapp/look-client-react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { getChildrenToRender } from './utils';

class Content9 extends React.PureComponent {
  getBlockChildren = (block, i) => {
    const { isMobile } = this.props;
    const item = block.children;
    const textWrapper = (
      <QueueAnim key="text" leaveReverse delay={isMobile ? [0, 100] : 0} {...item.textWrapper}>
        <div key="time" {...item.time}>
          {item.time.children}
        </div>
        <h2 key="title" {...item.title}>
          <i {...item.icon}>
            <img src={item.icon.children} alt="img" />
          </i>
          {item.title.children}
        </h2>
        <div key="p" {...item.content}>
          {item.content.children}
        </div>
      </QueueAnim>
    );
    return (
      <OverPack key={i.toString()} {...block}>
        {isMobile && textWrapper}
        <QueueAnim
          className="image-wrapper"
          key="image"
          type={isMobile ? 'right' : 'bottom'}
          leaveReverse
          delay={isMobile ? [100, 0] : 0}
          {...item.imgWrapper}
        >
          <div key="image" {...item.img}>
            <img src={item.img.children} alt="img" />
          </div>
          <div key="name" className="name-wrapper">
            <div key="name" {...item.name}>
              {item.name.children}
            </div>
            <div key="post" {...item.post}>
              {item.post.children}
            </div>
          </div>
        </QueueAnim>

        {!isMobile && textWrapper}
      </OverPack>
    );
  };

  render() {
    const { t, ...props } = this.props;
    const Content90DataSource = {
      wrapper: { className: 'home-page-wrapper content9-wrapper' },
      page: { className: 'home-page content9' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'image',
            children: 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
            className: 'title-image'
          },
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('content9.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          }
        ]
      },
      block: {
        className: 'timeline',
        children: [
          {
            name: 'block0',
            className: 'block-wrapper',
            playScale: 0.3,
            children: {
              imgWrapper: { className: 'image-wrapper' },
              textWrapper: { className: 'text-wrapper' },
              img: {
                className: 'block-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
              },
              icon: {
                className: 'block-icon',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/qJnGrvjXPxdKETlVSrbe.svg'
              },
              name: { className: 'block-name', children: t('content9.block.block0.name') },
              post: { className: 'block-post', children: t('content9.block.block0.post') },
              time: { className: 'block-time', children: t('content9.block.block0.time') },
              title: { className: 'Special Guestblock-title', children: t('content9.block.block0.title') },
              content: { className: 'block-content', children: t('content9.block.block0.content') }
            }
          },
          {
            name: 'block1',
            className: 'block-wrapper',
            playScale: 0.3,
            children: {
              imgWrapper: { className: 'image-wrapper' },
              textWrapper: { className: 'text-wrapper' },
              img: {
                className: 'block-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
              },
              icon: {
                className: 'block-icon',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg'
              },
              name: { className: 'block-name', children: t('content9.block.block1.name') },
              post: { className: 'block-post', children: t('content9.block.block1.post') },
              time: { className: 'block-time', children: t('content9.block.block1.time') },
              title: { className: 'block-title', children: t('content9.block.block1.title') },
              content: {
                className: 'block-content',
                children: t('content9.block.block1.content')
              }
            }
          },
          {
            name: 'block2',
            className: 'block-wrapper',
            playScale: 0.3,
            children: {
              imgWrapper: { className: 'image-wrapper' },
              textWrapper: { className: 'text-wrapper' },
              img: {
                className: 'block-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
              },
              icon: {
                className: 'block-icon',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg'
              },
              name: { className: 'block-name', children: t('content9.block.block2.name') },
              post: { className: 'block-post', children: t('content9.block.block2.post') },
              time: { className: 'block-time', children: t('content9.block.block2.time') },
              title: { className: 'block-title', children: t('content9.block.block2.title') },
              content: {
                className: 'block-content',
                children: t('content9.block.block2.content')
              }
            }
          },
          {
            name: 'block3',
            className: 'block-wrapper',
            playScale: 0.3,
            children: {
              imgWrapper: { className: 'image-wrapper' },
              textWrapper: { className: 'text-wrapper' },
              img: {
                className: 'block-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png'
              },
              icon: {
                className: 'block-icon',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/agOOBdKEIJlQhfeYhHJc.svg'
              },
              name: { className: 'block-name', children: t('content9.block.block3.name') },
              post: { className: 'block-post', children: t('content9.block.block3.post') },
              time: { className: 'block-time', children: t('content9.block.block3.time') },
              title: { className: 'block-title', children: t('content9.block.block3.title') },
              content: {
                className: 'block-content',
                children: t('content9.block.block3.content')
              }
            }
          }
        ]
      }
    };
    const dataSource = Content90DataSource;
    delete props.isMobile;
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
          <div {...dataSource.block}>{children}</div>
        </div>
      </div>
    );
  }
}

Content9.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate('home')(Content9);
