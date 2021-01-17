import React from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Content5 extends React.PureComponent {
  getChildrenToRender = data =>
    data.map(item => {
      return (
        <Col key={item.name} {...item}>
          <div {...item.children.wrapper}>
            <span {...item.children.img}>
              <img src={item.children.img.children} height="100%" alt="img" />
            </span>
            <p {...item.children.content}>{item.children.content.children}</p>
          </div>
        </Col>
      );
    });

  render() {
    const { t, ...props } = this.props;
    const Content50DataSource = {
      wrapper: { className: 'home-page-wrapper content5-wrapper' },
      page: { className: 'home-page content5' },
      OverPack: { playScale: 0.3, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="2" align="center">
                  {t('content5.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          },
          {
            name: 'content',
            className: 'title-content',
            children: t('content5.titleWrapper.content')
          }
        ]
      },
      block: {
        className: 'content5-img-wrapper',
        gutter: 16,
        children: [
          {
            name: 'block0',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg'
              },
              content: { children: 'Ant Design' }
            }
          },
          {
            name: 'block1',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg'
              },
              content: { children: 'Ant Motion' }
            }
          },
          {
            name: 'block2',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg'
              },
              content: { children: 'Ant Design' }
            }
          },
          {
            name: 'block3',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg'
              },
              content: { children: 'Ant Motion' }
            }
          },
          {
            name: 'block4',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg'
              },
              content: { children: 'Ant Design' }
            }
          },
          {
            name: 'block5',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg'
              },
              content: { children: 'Ant Motion' }
            }
          },
          {
            name: 'block6',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg'
              },
              content: { children: 'Ant Design' }
            }
          },
          {
            name: 'block7',
            className: 'block',
            md: 6,
            xs: 24,
            children: {
              wrapper: { className: 'content5-block-content' },
              img: {
                children: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg'
              },
              content: { children: 'Ant Motion' }
            }
          }
        ]
      }
    };
    const dataSource = Content50DataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack className={`content-template ${props.className}`} {...dataSource.OverPack}>
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeInOutQuad'
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeInOutQuad' }}
              {...dataSource.block}
            >
              {childrenToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}
Content5.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Content5);
