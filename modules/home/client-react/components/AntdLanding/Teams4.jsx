import React from 'react';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { getChildrenToRender } from './utils';

class Content8 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  getBlockChildren = (item, i) => {
    const children = item.children;
    const delay = this.props.isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
    const liAnim = {
      y: 30,
      opacity: 0,
      type: 'from',
      ease: 'easeOutQuad',
      delay
    };
    return (
      <TweenOne component={Col} animation={liAnim} key={i.toString()} {...item}>
        <div {...children}>
          <div className="image-wrapper" {...children.img}>
            <img src={children.img.children} alt="img" />
          </div>
          <h2 {...children.title}>{children.title.children}</h2>
          <div {...children.content}>{children.content.children}</div>
        </div>
      </TweenOne>
    );
  };

  render() {
    const { t, ...props } = this.props;
    const Teams41DataSource = {
      wrapper: { className: 'home-page-wrapper content8-wrapper' },
      page: { className: 'home-page content8' },
      OverPack: { playScale: 0.3 },
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
                  {t('teams4.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          }
        ]
      },
      block: {
        className: 'content-wrapper',
        children: [
          {
            name: 'block0',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block0.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block0.content')
              }
            }
          },
          {
            name: 'block1',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block1.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block1.content')
              }
            }
          },
          {
            name: 'block2',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block2.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block2.content')
              }
            }
          },
          {
            name: 'block3',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block3.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block3.content')
              }
            }
          },
          {
            name: 'block4',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block4.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block4.content')
              }
            }
          },
          {
            name: 'block5',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block5.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block5.content')
              }
            }
          },
          {
            name: 'block6',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block6.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block6.content')
              }
            }
          },
          {
            name: 'block7',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png'
              },
              title: { className: 'content8-title', children: t('teams4.block.block7.title') },
              content: {
                className: 'content8-content',
                children: t('teams4.block.block7.content')
              }
            }
          }
        ]
      }
    };
    const dataSource = Teams41DataSource;
    delete props.isMobile;
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="img">
              <Row {...dataSource.block} key="img">
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

Content8.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate('home')(Content8);
