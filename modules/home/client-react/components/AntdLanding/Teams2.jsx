import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

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
    const { t, ...props } = this.props;
    const Teams20DataSource = {
      wrapper: { className: 'home-page-wrapper teams2-wrapper' },
      page: { className: 'home-page teams2' },
      OverPack: { playScale: 0.3, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('teams2.titleWrapper.title')}
                </Heading>
              </>
            )
          }
        ]
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
                {
                  name: 'title',
                  className: 'teams2-title',
                  children: t('teams2.block.block0.title')
                },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block0.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
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
            image: {
              name: 'image',
              className: 'teams2-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams2-textWrapper',
              children: [
                { name: 'title', className: 'teams2-title', children: t('teams2.block.block1.title') },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block0.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
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
            image: {
              name: 'image',
              className: 'teams2-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams2-textWrapper',
              children: [
                {
                  name: 'title',
                  className: 'teams2-title',
                  children: t('teams2.block.block2.title')
                },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block2.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block2.content1')
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
                {
                  name: 'title',
                  className: 'teams2-title',
                  children: t('teams2.block.block3.title')
                },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block3.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block3.content1')
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
                { name: 'title', className: 'teams2-title', children: t('teams2.block.block4.title') },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block4.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block4.content1')
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
                {
                  name: 'title',
                  className: 'teams2-title',
                  children: t('teams2.block.block5.title')
                },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block5.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block5.content1')
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
                {
                  name: 'title',
                  className: 'teams2-title',
                  children: t('teams2.block.block6.title')
                },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block6.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block6.content1')
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
                { name: 'title', className: 'teams2-title', children: t('teams2.block.block7.title') },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block7.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block7.content1')
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
                {
                  name: 'title',
                  className: 'teams2-title',
                  children: t('teams2.block.block8.title')
                },
                {
                  name: 'content',
                  className: 'teams2-job',
                  children: t('teams2.block.block8.content')
                },
                {
                  name: 'content1',
                  className: 'teams2-content',
                  children: t('teams2.block.block8.content1')
                }
              ]
            }
          }
        ]
      }
    };
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
Teams2.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Teams2);
