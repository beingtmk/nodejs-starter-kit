import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
// import { isImg } from './utils';
import { SlickCarousel } from '@gqlapp/look-client-react';
import 'rc-banner-anim/assets/index.css';

const { BgElement } = Element;

const ItemComponent = props => {
  return (
    <div style={{ width: '100vw', margin: '5px' }}>
      <img src={props.item.bg.image} alt="" width="100%" />
    </div>
  );
};

class DynamicCarouselComponentView extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const Banner10DataSource = {
      // wrapper: { className: 'banner0' },
      wrapper: { className: 'current-banner1' },
      BannerAnim: {
        children:
          props.data &&
          props.data.edges &&
          props.data.edges.map((d, indx) => {
            return {
              name: `elem${indx}`,
              BannerElement: { className: 'banner-user-elem' },
              textWrapper: { className: 'current-banner1-text-wrapper' },
              bg: {
                className: `bg bg${indx}`,
                image: d.node && d.node.imageUrl,
                link: d.node && d.node.link
              },
              title: {
                className: 'current-banner1-title',
                children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png'
              },
              content: {
                className: 'current-banner1-content',
                children: '一个高效的页面动画解决方案'
              },
              button: { className: 'current-banner1-button', children: 'Learn More' }
            };
          })
      }
    };
    const dataSource = Banner10DataSource;
    delete props.isMobile;
    const childrenToRender = dataSource.BannerAnim.children.map((item, i) => {
      const elem = item.BannerElement;
      const elemClassName = elem.className;
      delete elem.className;
      const { bg, textWrapper, title, content, button } = item;
      return (
        <Element key={i.toString()} {...elem} prefixCls={elemClassName}>
          <BgElement key="bg" className={bg.className} style={{ height: 'fit-content' }}>
            {bg.link ? (
              <a href={bg.link}>
                <img src={bg.image} alt="" width="100%" />
              </a>
            ) : (
              <img src={bg.image} alt="" width="100%" />
            )}
          </BgElement>
          {/* <QueueAnim type={['bottom', 'top']} delay={200} key="text" {...textWrapper}>
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
          </QueueAnim> */}
        </Element>
      );
    });
    const itemLength = dataSource.BannerAnim.children.length;
    const carouselSettings = itemLength => {
      return {
        // className: "slider variable-width",
        // centerMode: true,
        className: '',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,

        arrows: false,
        dots: true,
        appendDots: dots => (
          <div
            style={{
              backgroundColor: 'transparent',
              borderRadius: '10px',
              padding: '10px'
            }}
          >
            <ul style={{}}> {dots} </ul>
          </div>
        ),
        customPaging: i => (
          <div
            className="banner-custom-dots"
            style={{
              margin: '0 5px',
              height: '10px',
              width: '10px',
              border: '0',
              background: 'white',
              borderRadius: '50%'
            }}
          ></div>
        )
      };
    };
    return (
      <div {...props} {...dataSource.wrapper}>
        <TweenOneGroup key="bannerGroup" enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} component="">
          <div className="current-banner1-wrapper" key="wrapper">
            <BannerAnim autoPlay={true} key="BannerAnim" type="across" {...dataSource.BannerAnim}>
              {childrenToRender}
            </BannerAnim>
            {/* <SlickCarousel
            Compo={ItemComponent}
            settings={carouselSettings(itemLength)}
            data={dataSource.BannerAnim.children}
            height={'fit-content'}
            // node={true}
            componentStyle={{ width: '100%' }}
          /> */}
          </div>
        </TweenOneGroup>
        {/* <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="current-banner1-icon"
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne> */}
      </div>
    );
  }
}

export default DynamicCarouselComponentView;

// const Carousel = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: relative;
//   text-align: center;
//   border-color: #666;
//   background-image: ${props => props.img && `url(${props.img})`};
//   background-size: cover;
//   background-attachment: fixed;
//   background-position: center;
//   & &-text-wrapper {
//     display: inline-block;
//     position: absolute;
//     top: 20%;
//     margin: auto;
//     left: 0;
//     right: 0;
//     font-size: 14px;
//     width: 550px;
//     > .queue-anim-leaving {
//       position: relative !important;
//     }
//   }
//   & &-title {
//     width: 350px;
//     min-height: 60px;
//     margin: auto;
//     display: inline-block;
//     font-size: 40px;
//     position: relative;
//   }
//   & &-content {
//     margin-bottom: 20px;
//     word-wrap: break-word;
//     min-height: 24px;
//   }
//   & &-button {
//     border: 1px solid #fff;
//     color: #fff;
//     background: transparent;
//     box-shadow: 0 0 0 transparent;
//     line-height: 40px;
//     font-size: 16px;
//     height: 40px;
//     &:hover {
//       color: #fff;
//       border-color: #fff;
//       background: rgba(255, 255, 255, 0.1);
//       box-shadow: 0 0 10px rgba(50, 250, 255, 0.75);
//     }
//     &:focus {
//       color: #fff;
//       border-color: #fff;
//     }
//     &.queue-anim-leaving {
//       width: auto;
//     }
//   }
//   & &-icon {
//     bottom: 20px;
//     font-size: 24px;
//     position: absolute;
//     left: 50%;
//     margin-left: -12px;
//   }

//   @media screen and (max-width: 767px) {
//     background-attachment: inherit;
//     & &-text-wrapper {
//       width: 90%;
//     }
//     & &-title {
//       width: 90%;
//       left: 0;
//     }
//   }
// `;
