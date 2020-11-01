import React from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import PropTypes from 'prop-types';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

class Content12 extends React.PureComponent {
  getChildrenToRender = data =>
    data.map(item => {
      return (
        <Col key={item.name} {...item}>
          <div {...item.children.wrapper}>
            <span {...item.children.img}>
              <img src={item.children.img.children} alt="img" />
            </span>
          </div>
        </Col>
      );
    });

  render() {
    const { t, ...props } = this.props;
    const Content120DataSource = {
      wrapper: { className: 'home-page-wrapper content12-wrapper' },
      page: { className: 'home-page content12' },
      OverPack: { playScale: 0.3, className: '' },
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
                  {t('content12.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          }
        ]
      },
      block: {
        className: 'img-wrapper',
        children: [
          {
            name: 'block0',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children: 'https://gw.alipayobjects.com/zos/rmsportal/TFicUVisNHTOEeMYXuQF.svg'
              }
            }
          },
          {
            name: 'block1',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children: 'https://gw.alipayobjects.com/zos/rmsportal/hkLGkrlCEkGZeMQlnEkD.svg'
              }
            }
          },
          {
            name: 'block2',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children: 'https://gw.alipayobjects.com/zos/rmsportal/bqyPRSZmhvrsfJrBvASi.svg'
              }
            }
          },
          {
            name: 'block3',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children: 'https://gw.alipayobjects.com/zos/rmsportal/UcsyszzOabdCYDkoPPnM.svg'
              }
            }
          },
          {
            name: 'block4',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children: 'https://gw.alipayobjects.com/zos/rmsportal/kRBeaICGexAmVjqBEqgw.svg'
              }
            }
          },
          {
            name: 'block5',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children: 'https://gw.alipayobjects.com/zos/rmsportal/ftBIiyJcCHpHEioRvPsV.svg'
              }
            }
          }
        ]
      }
    };
    const dataSource = Content120DataSource;
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
                ease: 'easeOutQuad'
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeOutQuad' }}
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
Content12.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate('home')(Content12);
