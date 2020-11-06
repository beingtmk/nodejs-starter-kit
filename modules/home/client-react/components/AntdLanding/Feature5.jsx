import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Icon } from '@ant-design/compatible';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Heading, Row, Col, TabPane, Tabs } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Content7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1
    };
  }

  onChange = key => {
    this.setState({ current: parseFloat(key) });
  };

  getBlockChildren = (item, i) => {
    const { tag, content } = item;
    const { text, img } = content;
    const textChildren = text.children;
    const { icon } = tag;
    const iconChildren = icon.children;
    const tagText = tag.text;
    return (
      <TabPane
        key={i + 1}
        tab={
          <div className={tag.className}>
            <Icon type={iconChildren} className={icon.className} />
            <div {...tagText}>{tagText.children}</div>
          </div>
        }
        className={item.className}
      >
        <TweenOne.TweenOneGroup
          enter={{
            y: 30,
            delay: 300,
            opacity: 0,
            type: 'from',
            ease: 'easeOutQuad'
          }}
          leave={null}
          component=""
        >
          {this.state.current === i + 1 && (
            <Row key="content" className={content.className} gutter={content.gutter}>
              <Col className={text.className} xs={text.xs} md={text.md}>
                {textChildren}
              </Col>
              <Col className={img.className} xs={img.xs} md={img.md}>
                <img src={img.children} width="100%" alt="img" />
              </Col>
            </Row>
          )}
        </TweenOne.TweenOneGroup>
      </TabPane>
    );
  };

  render() {
    const { t, ...props } = this.props;
    const Feature50DataSource = {
      wrapper: { className: 'home-page-wrapper content7-wrapper' },
      page: { className: 'home-page content7' },
      OverPack: {},
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('feature5.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          },
          { name: 'content', children: t('feature5.titleWrapper.content') }
        ]
      },
      tabsWrapper: { className: 'content7-tabs-wrapper' },
      block: {
        children: [
          {
            name: 'block0',
            tag: {
              className: 'content7-tag',
              text: { children: 'PHONE', className: 'content7-tag-name' },
              icon: { children: 'MobileOutlined' }
            },
            content: {
              className: 'content7-content',
              text: {
                className: 'content7-text',
                md: 14,
                xs: 24,
                children: (
                  <>
                    <span>
                      <h3>{t('feature5.block.block0.h31')}</h3>
                      <p>{t('feature5.block.block0.p1')}</p>
                      <br />
                      <h3>{t('feature5.block.block0.h32')}</h3>
                      <p>{t('feature5.block.block0.p2')}</p>
                      <br />
                      <h3>{t('feature5.block.block0.h33')}</h3>
                      {t('feature5.block.block0.p3')}
                    </span>
                  </>
                )
              },
              img: {
                className: 'content7-img',
                children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
                md: 10,
                xs: 24
              }
            }
          },
          {
            name: 'block1',
            tag: {
              className: 'content7-tag',
              icon: { children: 'TabletOutlined' },
              text: { className: 'content7-tag-name', children: 'TABLET' }
            },
            content: {
              className: 'content7-content',
              text: {
                className: 'content7-text',
                md: 14,
                xs: 24,
                children: (
                  <>
                    <span>
                      <h3>{t('feature5.block.block1.h31')}</h3>
                      <p>{t('feature5.block.block1.p1')}</p>
                      <br />
                      <h3>{t('feature5.block.block1.h32')}</h3>
                      <p>{t('feature5.block.block1.p2')}</p>
                      <br />
                      <h3>{t('feature5.block.block1.h33')}</h3>
                      {t('feature5.block.block1.p3')}
                    </span>
                  </>
                )
              },
              img: {
                className: 'content7-img',
                md: 10,
                xs: 24,
                children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png'
              }
            }
          },
          {
            name: 'block2',
            tag: {
              className: 'content7-tag',
              text: { children: 'DESKTOP', className: 'content7-tag-name' },
              icon: { children: 'LaptopOutlined' }
            },
            content: {
              className: 'content7-content',
              text: {
                className: 'content7-text',
                md: 14,
                xs: 24,
                children: (
                  <>
                    <span>
                      <h3>{t('feature5.block.block2.h31')}</h3>
                      <p>{t('feature5.block.block2.p1')}</p>
                      <br />
                      <h3>{t('feature5.block.block2.h32')}</h3>
                      <p>{t('feature5.block.block2.p2')}</p>
                      <br />
                      <h3>{t('feature5.block.block2.h33')}</h3>
                      {t('feature5.block.block2.p3')}
                    </span>
                  </>
                )
              },
              img: {
                className: 'content7-img',
                md: 10,
                xs: 24,
                children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png'
              }
            }
          }
        ]
      }
    };
    const dataSource = Feature50DataSource;
    delete props.isMobile;
    const tabsChildren = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>

          <OverPack {...dataSource.OverPack}>
            <TweenOne.TweenOneGroup
              key="tabs"
              enter={{
                y: 30,
                opacity: 0,
                delay: 200,
                type: 'from'
              }}
              leave={{ y: 30, opacity: 0 }}
              {...dataSource.tabsWrapper}
            >
              <Tabs key="tabs" onChange={this.onChange} activeKey={`${this.state.current}`} {...dataSource.block}>
                {tabsChildren}
              </Tabs>
            </TweenOne.TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}
Content7.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Content7);
