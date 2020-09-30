import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import { isImg } from '../AntdLanding/utils';
import 'rc-banner-anim/assets/index.css';

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
              textWrapper: { className: 'banner1-text-wrapper' },
              bg: {
                className: `bg`,
                image: d.node && d.node.imageUrl,
                link: d.node && d.node.link
              },
              title: {
                className: 'banner1-title',
                children:
                  'https://res.cloudinary.com/www-lenshood-in/image/upload/v1580223483/nodejs-starterkit/untitled_4.svg'
              },
              content: {
                className: 'banner1-content',
                children: 'An All JavaScript Solution For Your App Needs'
              },
              button: { className: 'banner1-button', children: 'Learn More' }
            };
          })
      }
    };
    const dataSource = Banner10DataSource;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = dataSource.BannerAnim.children.map((item, i) => {
      const elem = item.BannerElement;
      const elemClassName = elem.className;
      delete elem.className;
      const { bg, textWrapper, title, content, button } = item;
      return (
        <Element key={i.toString()} {...elem} prefixCls={elemClassName}>
          <StyledBgElement key="bg" {...bg} />
          <QueueAnim type={['bottom', 'top']} delay={200} key="text" {...textWrapper}>
            <div key="logo" {...title}>
              {typeof title.children === 'string' && title.children.match(isImg) ? (
                <img src={title.children} width="100%" alt="img" />
              ) : (
                title.children
              )}
            </div>
            <div key="content" {...content}>
              {content.children}
            </div>
            <Button ghost key="button" {...button}>
              {button.children}
            </Button>
          </QueueAnim>
        </Element>
      );
    });
    return (
      <div {...props} {...dataSource.wrapper}>
        <TweenOneGroup key="bannerGroup" enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} component="">
          <div className="banner1-wrapper" key="wrapper">
            <BannerAnim key="BannerAnim" {...dataSource.BannerAnim}>
              {childrenToRender}
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
          <Icon type="down" />
        </TweenOne>
      </div>
    );
  }
}

export default Banner;

const StyledBgElement = styled(BgElement)`
  background: ${props => props.image && `url(${props.image}) center`};
`;
