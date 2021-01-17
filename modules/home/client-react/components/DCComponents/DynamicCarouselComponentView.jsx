import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element, Arrow } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';

import { LeftArrow, RightArrow, Icon, Button, Empty } from '@gqlapp/look-client-react';

import ROUTES from '../../routes';

const { BgElement } = Element;

class Banner extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const Banner10DataSource = {
      wrapper: { className: 'banner1' },
      BannerAnim: {
        children:
          props.data &&
          props.data.edges &&
          props.data.edges.map((d, indx) => {
            return {
              name: `elem${indx}`,
              BannerElement: { className: 'banner-user-elem' },
              bg: {
                className: `bg`,
                image: d.node && d.node.imageUrl,
                href: d.node && d.node.link,
                component: d.node && d.node.link ? 'a' : 'div'
              }
            };
          })
      }
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
            </Element>
          );
        })
      ) : (
        <Element>
          <div className={'HVCenter'}>
            <Empty description={'No Carousels to show.'}>
              <Link to={`${ROUTES.add}`}>
                <Button color="primary">Add</Button>
              </Link>
            </Empty>
          </div>
        </Element>
      );
    return (
      <div {...props} {...dataSource.wrapper}>
        <TweenOneGroup key="bannerGroup" enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} component="">
          <div className="banner1-wrapper" key="wrapper">
            <BannerAnim key="BannerAnim" autoPlay {...dataSource.BannerAnim}>
              {childrenToRender}
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
            </BannerAnim>
          </div>
        </TweenOneGroup>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="banner1-icon"
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="DownOutlined" />
        </TweenOne>
      </div>
    );
  }
}

export default Banner;

const StyledBgElement = styled(BgElement)`
  background: ${props => props.image && `url(${props.image}) center`};
`;
