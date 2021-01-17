import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Row, Col } from '@gqlapp/look-client-react';

import { getChildrenToRender, isImg } from './utils';

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer1'
  };

  getLiChildren = data =>
    data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item;
      return (
        <Col key={i.toString()} {...itemProps} title={null} content={null}>
          <h2 {...title}>
            {typeof title.children === 'string' && title.children.match(isImg) ? (
              <img src={title.children} width="100%" alt="img" />
            ) : (
              title.children
            )}
          </h2>
          <div {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</div>
        </Col>
      );
    });

  render() {
    const { t, ...props } = this.props;
    const Footer10DataSource = {
      wrapper: { className: 'home-page-wrapper footer1-wrapper' },
      OverPack: { className: 'footer1', playScale: 0.2 },
      block: {
        className: 'home-page',
        gutter: 0,
        children: [
          {
            name: 'block0',
            xs: 24,
            md: 6,
            className: 'block',
            title: {
              className: 'logo',
              children: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg'
            },
            childWrapper: {
              className: 'slogan',
              children: [
                {
                  name: 'content0',
                  children: t('footer.block0.content0')
                }
              ]
            }
          },
          {
            name: 'block1',
            xs: 24,
            md: 6,
            className: 'block',
            title: { children: t('footer1.block1.title') },
            childWrapper: {
              children: [
                { name: 'link0', href: '#', children: t('footer1.block1.link0') },
                { name: 'link1', href: '#', children: t('footer1.block1.link1') },
                { name: 'link2', href: '#', children: t('footer1.block1.link2') },
                { name: 'link3', href: '#', children: t('footer1.block1.link3') }
              ]
            }
          },
          {
            name: 'block2',
            xs: 24,
            md: 6,
            className: 'block',
            title: { children: t('footer1.block2.title') },
            childWrapper: {
              children: [
                { href: '#', name: 'link0', children: t('footer1.block2.link0') },
                { href: '#', name: 'link1', children: t('footer1.block2.link1') }
              ]
            }
          },
          {
            name: 'block3',
            xs: 24,
            md: 6,
            className: 'block',
            title: { children: t('footer1.block3.title') },
            childWrapper: {
              children: [
                { href: '#', name: 'link0', children: t('footer1.block3.link0') },
                { href: '#', name: 'link1', children: t('footer1.block3.link1') }
              ]
            }
          }
        ]
      },
      copyrightWrapper: { className: 'copyright-wrapper' },
      copyrightPage: { className: 'home-page' },
      copyright: {
        className: 'copyright',
        children: (
          <>
            <span>
              ©2018 by <a href="https://motion.ant.design">Ant Motion</a> All Rights Reserved
            </span>
          </>
        )
      }
    };
    const dataSource = Footer10DataSource;

    delete props.isMobile;
    const childrenToRender = this.getLiChildren(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim type="bottom" key="ul" leaveReverse component={Row} {...dataSource.block}>
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key="copyright"
            {...dataSource.copyrightWrapper}
          >
            <div {...dataSource.copyrightPage}>
              <div {...dataSource.copyright}>{dataSource.copyright.children}</div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Footer);
