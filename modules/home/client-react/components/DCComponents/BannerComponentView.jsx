import React from 'react';
import styled from 'styled-components';
import { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element, Arrow } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';

import { LeftArrow, RightArrow, Button, Row, Col, EmptyComponent } from '@gqlapp/look-client-react';

import ROUTES from '../../routes';

const { BgElement } = Element;

const Title = styled.div`
  font-size: 5vw;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 468px) {
    font-size: 8vw;
  }
  @media screen and (min-width: 1440px) {
    font-size: 4vw;
  }
`;

const Text = styled.div`
  font-size: 1.3vw;
  color: black;
  white-space: pre-line;
  @media screen and (max-width: 468px) {
    font-size: 2.8vw;
  }

  @media screen and (min-width: 1440px) {
    font-size: 0.8vw;
  }
`;

class Banner extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const Banner10DataSource = {
      wrapper: { className: 'bannercomponent' },
      BannerAnim: {
        children: [
          {
            name: `elem${0}`,
            BannerElement: { className: 'banner-user-elem' },
            bg: {
              className: `bg`,
              title: 'Banner 1',
              description: `#1 PREMIUM SMOKING ACCESSORIES SUBSCRIPTION BOX
                $100+ VALUE FOR ONLY $39.99
                
                DISCOVER PREMIUM GLASS, DAILY ESSENTIALS, AND LIMITED
                
                EDITION SMOKING ACCESSORIES DELIVERED DISCREETLY TO YOUR DOOR`,
              image: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1608990956/ntoxbrsiwajbutw6pn97.webp',
              href: '/listing/catalogue,Catalogue;/listing/category/1,Category',
              component: 'div'
            }
          }
        ]
      }
      // BannerAnim: {
      //   children:
      //     props.data &&
      //     props.data.edges &&
      //     props.data.edges.map((d, indx) => {
      //       return {
      //         name: `elem${indx}`,
      //         BannerElement: { className: 'banner-user-elem' },
      //         bg: {
      //           className: `bg`,
      //           title: d.node && d.node.title,
      //           description: d.node && d.node.description,
      //           image: d.node && d.node.imageUrl,
      //           href: d.node && d.node.link,
      //           component: d.node && d.node.link ? 'a' : 'div'
      //         }
      //       };
      //     })
      // }
    };
    const dataSource = Banner10DataSource;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender =
      dataSource.BannerAnim.children.length > 0 ? (
        dataSource.BannerAnim.children.map((item, i) => {
          const elem = item.BannerElement;
          const elemClassName = elem.className;
          delete elem.className;
          const { bg } = item;
          return (
            <Element key={i.toString()} {...elem} prefixCls={elemClassName}>
              <StyledBgElement key="bg" {...bg} />
              <div className="HVCenter" style={{ height: '95%' }}>
                <div align="center" style={{ maxWidth: 'fit-content', margin: 'auto', display: 'block' }}>
                  <Title>{bg.title}</Title>
                  <Text>
                    {bg.description}
                    <br />
                    <br />
                    <Row gutter={48}>
                      {bg.href.split(';').map(l => {
                        const text = l.split(',');
                        return (
                          <Col span={24 / bg.href.split(';').length}>
                            <a href={text[0]}>
                              <Button block color={'primary'}>
                                {text[1]}
                              </Button>
                            </a>
                          </Col>
                        );
                      })}
                    </Row>
                  </Text>
                </div>
              </div>
            </Element>
          );
        })
      ) : (
        <Element>
          <EmptyComponent
            description={props.t('dynamicCarousel.adminPanel.noBannersMsg')}
            emptyLink={`${ROUTES.add}`}
          />
        </Element>
      );
    return (
      <div {...props} {...dataSource.wrapper}>
        <TweenOneGroup key="bannerGroup" enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} component="">
          <div className="banner1-wrapper" key="wrapper">
            <BannerAnim key="BannerAnim" autoPlay {...dataSource.BannerAnim}>
              {childrenToRender}
              {dataSource.BannerAnim.children.length > 1 && (
                <>
                  <Arrow
                    arrowType="prev"
                    key="prev"
                    //  prefixCls="user-arrow"
                  >
                    <LeftArrow />
                  </Arrow>
                  <Arrow arrowType="next" key="next" prefixCls="rightZero">
                    <RightArrow />
                  </Arrow>
                </>
              )}
            </BannerAnim>
          </div>
        </TweenOneGroup>
      </div>
    );
  }
}

export default Banner;

const StyledBgElement = styled(BgElement)`
  background: ${props => props.image && `url(${props.image}) center`};
`;
