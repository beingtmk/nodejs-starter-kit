import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ADCarousel } from 'antd';

import { LeftArrow, RightArrow } from '@gqlapp/look-client-react/ui-antd/components';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }

  render() {
    // console.log('carousel', this.props);
    const { Compo, componentProps, showArrow = true, getCart, onDelete } = this.props;

    const prevSlide = () => {
      this.carousel.prev();
    };
    const nextSlide = () => {
      this.carousel.next();
    };
    const status = {
      autoplay: this.props.autoplay,
      easing: 100000,
      infinite: true,
      speed: 900,
      // variableWidth: true,
      centerMode: true,
      className: 'slider variable-width',
      // slidesToScroll:3, // getSlides(this.props.data.length) === 0 ? '1' : getSlides(this.props.data.length),
      // slidesToShow:3, // getSlides(this.props.data.length),

      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };
    return (
      <>
        <div style={{ position: 'relative', height: this.props.height || '370px' }}>
          {showArrow && <LeftArrow prevSlide={prevSlide} />}
          <ADCarousel ref={node => (this.carousel = node)} {...(this.props.settings || status)}>
            {this.props.data.map((item, key) => {
              const listing = this.props.node ? item.node : item;
              const cartItemArray =
                getCart && getCart.orderDetails && getCart.orderDetails.length > 0
                  ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
                  : [];
              return (
                <Compo
                  inCart={cartItemArray.length === 0}
                  onDelete={() => onDelete(cartItemArray[0].id)}
                  {...componentProps}
                  modalName={'listing'}
                  modalId={listing.id}
                  componentStyle={this.props.componentStyle}
                  listing={listing}
                  key={key}
                />
              );
            })}
          </ADCarousel>
          {showArrow && <RightArrow nextSlide={nextSlide} />}
        </div>
      </>
    );
  }
}
Carousel.propTypes = {
  settings: PropTypes.object.isRequired,
  componentStyle: PropTypes.object,
  componentProps: PropTypes.object,
  node: PropTypes.object,
  height: PropTypes.string,
  Compo: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  autoplay: PropTypes.bool,
  showArrow: PropTypes.bool,
  onDelete: PropTypes.func,
  getCart: PropTypes.object
};
