import React, { useState } from "react";
import { Row, Col } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { getChildrenToRender } from "./utils";
// import { Carousel } from "@gqlapp/look-client-react";
import Slider from "react-slick";


const Content50DataSource = {
  wrapper: { className: "home-page-wrapper content5-wrapper" },
  page: { className: "home-page content5" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      { name: "title", children: "客户案例", className: "title-h1" },
      {
        name: "content",
        className: "title-content",
        children: "在这里用一段话介绍服务的案例情况",
      },
    ],
  },
  block: {
    className: "content5-img-wrapper",
    gutter: 16,
    children: [
      {
        name: "block0",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243326/nodejs-starterkit/pyybkfcnaq19wk1wnhao.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block1",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Motion" },
        },
      },
      {
        name: "block2",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243326/nodejs-starterkit/pyybkfcnaq19wk1wnhao.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block3",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Motion" },
        },
      },
      {
        name: "block4",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243326/nodejs-starterkit/pyybkfcnaq19wk1wnhao.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block5",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Motion" },
        },
      },
      {
        name: "block6",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243326/nodejs-starterkit/pyybkfcnaq19wk1wnhao.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block7",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children: [
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243323/nodejs-starterkit/q47ls48ql2ij021iezrc.jpg",
              "https://res.cloudinary.com/dpvrqxttb/image/upload/v1590243318/nodejs-starterkit/ws6kekgvaraap60t1pnx.png",
            ],
          },
          content: { children: "Ant Motion" },
        },
      },
    ],
  },
};

const ImageComponent = ({ item, key, componentStyle }) => {
  return (
    <div key={key}>
      <img src={item} alt="" height="100%" />
    </div>
  );
};

class CatalogueCardComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   mouseOn: false,
    //   mouseOut: false,
    // };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.slider = React.createRef();
  }

  handleMouseOut = (pauseSlide) => {
    // this.setState({
    //   mouseOn: false,
    //   mouseOut: true,
    // });
    pauseSlide();
  };

  handleMouseEnter = (playSlide) => {
    // this.setState({
    //   mouseOn: true,
    // });
    playSlide();
  };
  render() {
    const { keyC, item } = this.props;
    // console.log("key: ", keyC, "->", this.state.mouseOn);
    const playSlide = () => {
      this.slider.slickPlay();
    };
    const pauseSlide = () => {
      this.slider.slickPause();
    };
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

      className:'listing-catalogue-card-carousel-inner'
    };
    return (
      <Col
        key={keyC}
        {...item}
        onMouseEnter={() => this.handleMouseEnter(playSlide)}
        onMouseLeave={() => this.handleMouseOut(pauseSlide)}
      >
        <div {...item.children.wrapper}>
          <span {...item.children.img}>
            <Slider
              {...settings}
              style={{ height: "160px" }}
              // dots={this.state.mouseOn}
              // pauseOnHover={false}
              ref={(node) => (this.slider = node)}
            >
              {item.children.img.children.map((item, key) => (
                <div style={{ height: "160px", overflow:'hidden', margin:'auto', width:'100%' }} align='center'>
                  <img src={item} alt="" height="160px" />
                </div>
              ))}
            </Slider>
          </span>

          <p {...item.children.content}>{item.children.content.children}</p>
        </div>
      </Col>
    );
  }
}

class Content5 extends React.PureComponent {
  getChildrenToRender = (data) =>
    data.map((item, keyC) => {
      return <CatalogueCardComponent item={item} keyC={keyC} />;
    });

  render() {
    const { ...props } = this.props;
    const dataSource = Content50DataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(
      dataSource.block.children
    );
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: "+=30",
                opacity: 0,
                type: "from",
                ease: "easeInOutQuad",
              }}
              leave={{ y: "+=30", opacity: 0, ease: "easeInOutQuad" }}
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

export default Content5;
