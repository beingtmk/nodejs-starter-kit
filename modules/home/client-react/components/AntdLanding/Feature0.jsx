import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Content extends React.PureComponent {
  render() {
    const { isMobile, t, ...props } = this.props;
    const Feature00DataSource = {
      wrapper: { className: 'home-page-wrapper content0-wrapper' },
      page: { className: 'home-page content0' },
      OverPack: { playScale: 0.3, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            className: 'title-text',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('feature0.titleWrapper')}
                </Heading>
                {/* <div className="home-underline"></div> */}
              </>
            )
          }
        ]
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
                  children: t('feature0.childWrapper.block0.title')
                },
                {
                  name: 'content',
                  children: t('feature0.childWrapper.block0.content')
                }
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
                  children: t('feature0.childWrapper.block1.title')
                },
                {
                  name: 'content',
                  children: t('feature0.childWrapper.block1.content')
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
                  children: t('feature0.childWrapper.block2.title')
                },
                {
                  name: 'content',
                  children: t('feature0.childWrapper.block2.content')
                }
              ]
            }
          }
        ]
      }
    };
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
  isMobile: PropTypes.bool,
  t: PropTypes.func
};

export default translate('home')(Content);
