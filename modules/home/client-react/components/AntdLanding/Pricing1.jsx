import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Heading, Row, Col, Button } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Pricing1 extends React.PureComponent {
  getChildrenToRender = item => {
    const { wrapper, topWrapper, name, buttonWrapper, line, content, money } = item.children;
    return (
      <Col key={item.name} {...item}>
        <QueueAnim type="bottom" {...wrapper}>
          <div {...topWrapper}>
            <div {...name} key="name">
              {name.children}
            </div>
            <h1 {...money} key="money">
              {money.children}
            </h1>
          </div>
          <div {...content} key="content">
            {content.children}
          </div>
          <i {...line} key="line" />
          <div {...buttonWrapper} key="button">
            <Button {...buttonWrapper.children.a} />
          </div>
        </QueueAnim>
      </Col>
    );
  };

  render() {
    const { t, ...props } = this.props;
    const Pricing10DataSource = {
      wrapper: { className: 'home-page-wrapper pricing1-wrapper' },
      page: { className: 'home-page pricing1' },
      OverPack: { playScale: 0.3, className: 'pricing1-content-wrapper' },
      titleWrapper: {
        className: 'pricing1-title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('pricing1.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'pricing1-title-h1'
          }
        ]
      },
      block: {
        className: 'pricing1-block-wrapper',
        children: [
          {
            name: 'block0',
            className: 'pricing1-block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'pricing1-block-box ' },
              topWrapper: { className: 'pricing1-top-wrapper' },
              name: { className: 'pricing1-name', children: 'Free' },
              money: { className: 'pricing1-money', children: '¥0' },
              content: {
                className: 'pricing1-content',
                children: (
                  <>
                    {/* <span>
                      140-500Mbps
                      <br /> 140 GB-50TB（含）
                      <br /> 14500GB流量包
                      <br /> 14国内按峰值宽带账单
                      <br /> 14弹性计算
                      <br /> 14云服务器 ECS{' '}
                    </span> */}
                    {t('pricing1.block.block0.content')}
                  </>
                )
              },
              line: { className: 'pricing1-line' },
              buttonWrapper: {
                className: 'pricing1-button-wrapper',
                children: {
                  a: {
                    className: 'pricing1-button',
                    href: '#',
                    children: t('pricing1.block.block0.button')
                  }
                }
              }
            }
          },
          {
            name: 'block1',
            className: 'pricing1-block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'pricing1-block-box active' },
              topWrapper: { className: 'pricing1-top-wrapper' },
              name: { className: 'pricing1-name', children: 'Starter' },
              money: { className: 'pricing1-money', children: '¥199' },
              content: {
                className: 'pricing1-content',
                children: <>{t('pricing1.block.block1.content')}</>
              },
              line: { className: 'pricing1-line' },
              buttonWrapper: {
                className: 'pricing1-button-wrapper',
                children: {
                  a: {
                    className: 'pricing1-button',
                    href: '#',
                    children: t('pricing1.block.block1.button')
                  }
                }
              }
            }
          },
          {
            name: 'block2',
            className: 'pricing1-block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'pricing1-block-box ' },
              topWrapper: { className: 'pricing1-top-wrapper' },
              name: { className: 'pricing1-name', children: 'Pro' },
              money: { className: 'pricing1-money', children: '¥999' },
              content: {
                className: 'pricing1-content',
                children: <>{t('pricing1.block.block2.content')}</>
              },
              line: { className: 'pricing1-line' },
              buttonWrapper: {
                className: 'pricing1-button-wrapper',
                children: {
                  a: {
                    className: 'pricing1-button',
                    href: '#',
                    children: t('pricing1.block.block2.button')
                  }
                }
              }
            }
          }
        ]
      }
    };
    const dataSource = Pricing10DataSource;
    delete props.isMobile;
    const { block } = dataSource;
    const childrenToRender = block.children.map(this.getChildrenToRender);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" component={Row} leaveReverse ease={['easeOutQuad', 'easeInOutQuad']} key="content">
              {childrenToRender}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}
Pricing1.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Pricing1);
