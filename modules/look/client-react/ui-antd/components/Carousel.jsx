import React from "react";
import PropTypes from "prop-types";
import { Carousel as ADCarousel, Icon } from "antd";

// import '../resources/listingCatalogue.css';

// function SampleNextArrow(props) {
//   return (
//     <div
//       style={{ ...style, display: "block", background: "red", zIndex: "10" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow() {
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green", zIndex: "10" }}
//       onClick={onClick}
//     />
//   );
// }

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }

  next() {
    this.carousel.next();
  }

  previous() {
    this.carousel.prev();
  }
  render() {
    // console.log('carousel', this.props);
    const Compo = this.props.Compo;
    const prevSlide = () => {
      this.carousel.prev();
    };
    const nextSlide = () => {
      this.carousel.next();
    };
    // const tileNo = this.props.tileNo || null;
    const getSlides = (length) => {
      if (length < 4) {
        return length;
      } else {
        return 4;
      }
    };
    const status = {
      autoplay: this.props.autoplay,
      easing: 100000,
      infinite: true,
      speed: 900,
      variableWidth: true,
      centerMode: true,
      className: "slider variable-width",
      // slidesToScroll:3, // getSlides(this.props.data.length) === 0 ? '1' : getSlides(this.props.data.length),
      // slidesToShow:3, // getSlides(this.props.data.length),

      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],

      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };
    // console.log('key', this.props.keyC, ":", this.props.autoplay);
    return (
      <div
        style={{ position: "relative", height: this.props.height || "370px" }}
      >
        {this.props.autoplay && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "1000",
              background: "red",
            }}
          >
            Absolute
          </div>
        )}
        {this.props.arrow && (
          <div
            className="carousel-arrow carousel-arrow-left"
            onClick={prevSlide}
          >
            <Icon type="left" className="carousel-arrow-icon" />
          </div>
        )}
        <ADCarousel
          autoplay={this.props.autoplay}
          pauseOnHover={false}
          dots={this.props.dots}
          ref={(node) => (this.carousel = node)}
          {...this.props.settings}
        >
          {this.props.data.map((item, key) => (
            <Compo
              componentStyle={this.props.componentStyle}
              item={this.props.node ? item.node : item}
              key={key}
            />
          ))}
        </ADCarousel>
        {this.props.arrow && (
          <div
            className="carousel-arrow carousel-arrow-right"
            onClick={nextSlide}
          >
            <Icon type="right" className="carousel-arrow-icon" />
          </div>
        )}
      </div>
    );
  }
}
Carousel.propTypes = {
  settings: PropTypes.object.isRequired,
  Compo: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  autoplay: PropTypes.bool,
  arrow: PropTypes.bool,
};
