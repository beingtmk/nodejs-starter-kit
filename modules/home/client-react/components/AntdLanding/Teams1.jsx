import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Teams1 extends React.PureComponent {
  getBlockChildren = data =>
    data.map((item, i) => {
      const { titleWrapper, ...$item } = item;
      return (
        <Col key={i.toString()} {...$item}>
          {titleWrapper.children.map(getChildrenToRender)}
        </Col>
      );
    });

  render() {
    const { t, ...props } = this.props;
    const Teams10DataSource = {
      wrapper: { className: 'home-page-wrapper teams1-wrapper' },
      page: { className: 'home-page teams1' },
      OverPack: { playScale: 0.3, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('teams1.titleWrapper.title')}
                </Heading>
              </>
            )
          }
        ]
      },
      block: {
        className: 'block-wrapper',
        children: [
          {
            name: 'block0',
            className: 'block',
            md: 8,
            xs: 24,
            titleWrapper: {
              children: [
                {
                  name: 'image',
                  className: 'teams1-image',
                  children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
                },
                { name: 'title', className: 'teams1-title', children: t('teams1.block.block0.title') },
                {
                  name: 'content',
                  className: 'teams1-job',
                  children: t('teams2.block.block0.content')
                },
                {
                  name: 'content1',
                  className: 'teams1-content',
                  children: t('teams2.block.block0.content1')
                }
              ]
            }
          },
          {
            name: 'block1',
            className: 'block',
            md: 8,
            xs: 24,
            titleWrapper: {
              children: [
                {
                  name: 'image',
                  className: 'teams1-image',
                  children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
                },
                { name: 'title', className: 'teams1-title', children: t('teams2.block.block1.title') },
                {
                  name: 'content',
                  className: 'teams1-job',
                  children: t('teams2.block.block1.content')
                },
                {
                  name: 'content1',
                  className: 'teams1-content',
                  children: t('teams2.block.block1.content1')
                }
              ]
            }
          },
          {
            name: 'block2',
            className: 'block',
            md: 8,
            xs: 24,
            titleWrapper: {
              children: [
                {
                  name: 'image',
                  className: 'teams1-image',
                  children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
                },
                { name: 'title', className: 'teams1-title', children: t('teams1.block.block2.title') },
                {
                  name: 'content',
                  className: 'teams1-job',
                  children: '公司+职位 信息暂缺'
                },
                {
                  name: 'content1',
                  className: 'teams1-content',
                  children: t('teams2.block.block2.content1')
                }
              ]
            }
          }
        ]
      }
    };
    const dataSource = Teams10DataSource;

    delete props.isMobile;
    const listChildren = this.getBlockChildren(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="block" leaveReverse {...dataSource.block} component={Row}>
              {listChildren}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}
Teams1.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Teams1);
