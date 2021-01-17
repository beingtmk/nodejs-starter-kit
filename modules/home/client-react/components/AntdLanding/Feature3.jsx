import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Content3 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  render() {
    const { t, ...props } = this.props;
    const { isMobile } = props;
    const Feature30DataSource = {
      wrapper: { className: 'home-page-wrapper content3-wrapper' },
      page: { className: 'home-page content3' },
      OverPack: { playScale: 0.3 },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('feature3.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          },
          {
            name: 'content',
            className: 'title-content',
            children: t('feature3.titleWrapper.content')
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
              title: { className: 'content3-title', children: t('feature3.block0.title') },
              content: {
                className: 'content3-content',
                children: t('feature3.block0.content')
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
              title: { className: 'content3-title', children: t('feature3.block1.title') },
              content: {
                className: 'content3-content',
                children: t('feature3.block1.content')
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
              title: { className: 'content3-title', children: t('feature3.block2.title') },
              content: {
                className: 'content3-content',
                children: t('feature3.block2.content')
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
              title: { className: 'content3-title', children: t('feature3.block3.title') },
              content: {
                className: 'content3-content',
                children: t('feature3.block3.content')
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
              title: { className: 'content3-title', children: t('feature3.block4.title') },
              content: {
                className: 'content3-content',
                children: t('feature3.block4.content')
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
              title: { className: 'content3-title', children: t('feature3.block5.title') },
              content: {
                className: 'content3-content',
                children: t('feature3.block5.content')
              }
            }
          }
        ]
      }
    };
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
Content3.propTypes = {
  isMobile: PropTypes.bool,
  t: PropTypes.func
};
export default translate('home')(Content3);
