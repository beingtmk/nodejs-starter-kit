import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Heading, Row, Col, Divider } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Teams3 extends React.PureComponent {
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

  getBlockTopChildren = data =>
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
    const Teams30DataSource = {
      wrapper: { className: 'home-page-wrapper teams3-wrapper' },
      page: { className: 'home-page teams3' },
      OverPack: { playScale: 0.3, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('teams3.titleWrapper.title')}
                </Heading>
              </>
            )
          }
        ]
      },
      blockTop: {
        className: 'block-top-wrapper',
        children: [
          {
            name: 'block0',
            className: 'block-top',
            md: 8,
            xs: 24,
            titleWrapper: {
              children: [
                {
                  name: 'image',
                  className: 'teams3-top-image',
                  children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
                },
                {
                  name: 'title',
                  className: 'teams3-top-title',
                  children: t('teams3.blocktop.block0.title')
                },
                {
                  name: 'content',
                  className: 'teams3-top-job',
                  children: t('teams3.blocktop.block0.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-top-content',
                  children: t('teams3.blocktop.block0.content1')
                }
              ]
            }
          },
          {
            name: 'block1',
            className: 'block-top',
            md: 8,
            xs: 24,
            titleWrapper: {
              children: [
                {
                  name: 'image',
                  className: 'teams3-top-image',
                  children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
                },
                { name: 'title', className: 'teams3-top-title', children: t('teams3.blocktop.block1.title') },
                {
                  name: 'content',
                  className: 'teams3-top-job',
                  children: t('teams3.blocktop.block1.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-top-content',
                  children: t('teams3.blocktop.block1.content1')
                }
              ]
            }
          },
          {
            name: 'block2',
            className: 'block-top',
            md: 8,
            xs: 24,
            titleWrapper: {
              children: [
                {
                  name: 'image',
                  className: 'teams3-top-image',
                  children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
                },
                {
                  name: 'title',
                  className: 'teams3-top-title',
                  children: t('teams3.blocktop.block2.title')
                },
                {
                  name: 'content',
                  className: 'teams3-top-job',
                  children: t('teams3.blocktop.block2.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-top-content',
                  children: t('teams3.blocktop.block2.content1')
                }
              ]
            }
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block0.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block0.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block0.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block1.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block1.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block1.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block2.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block2.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block2.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block3.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block3.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block3.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block4.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block4.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block4.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block5.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block5.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block5.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block6.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block6.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block6.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block7.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block7.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block7.content1')
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
              className: 'teams3-image',
              children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ'
            },
            titleWrapper: {
              className: 'teams3-textWrapper',
              children: [
                { name: 'title', className: 'teams3-title', children: t('teams3.block.block8.title') },
                {
                  name: 'content',
                  className: 'teams3-job',
                  children: t('teams3.block.block8.content')
                },
                {
                  name: 'content1',
                  className: 'teams3-content',
                  children: t('teams3.block.block8.content1')
                }
              ]
            }
          }
        ]
      }
    };
    const dataSource = Teams30DataSource;

    delete props.isMobile;
    const listChildren = this.getBlockChildren(dataSource.block.children);
    const listTopChildren = this.getBlockTopChildren(dataSource.blockTop.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="tween" leaveReverse>
              <QueueAnim type="bottom" key="blockTop" {...dataSource.blockTop} component={Row}>
                {listTopChildren}
              </QueueAnim>
              <Divider key="divider" />
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
Teams3.propTypes = {
  t: PropTypes.func
};

export default translate('home')(Teams3);
