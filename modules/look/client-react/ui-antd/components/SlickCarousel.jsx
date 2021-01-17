import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './Carousel';

const SlickCarousel = props => {
  const {
    data,
    node,
    componentStyle,
    modalName = 'listing',
    Compo,
    height = '370px',
    componentProps,
    settings,
    itemName,
    showArrow,
    getCart,
    onDelete,
    autoplay = true
  } = props;

  const status = {
    autoplay: autoplay,
    variableWidth: true,
    easing: 1000,
    infinite: true,
    speed: 900,
    autoplaySpeed: 2000,
    centerMode: true,
    className: 'slider variable-width',
    // slidesToScroll:3, // getSlides(props.data.length) === 0 ? '1' : getSlides(props.data.length),
    // slidesToShow:3, // getSlides(props.data.length),

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
      <div style={{ position: 'relative', height, overflow: 'hidden' }}>
        <Carousel {...(settings || status)} showArrow={showArrow}>
          {data.map((item, key) => {
            const listing = node ? item.node : item;
            const cartItemArray =
              getCart && getCart.orderDetails && getCart.orderDetails.length > 0
                ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
                : [];
            const obj = {};
            obj[itemName] = node ? item.node : item;
            return (
              <Compo
                key={key}
                modalName={modalName}
                modalId={listing.id}
                inCart={cartItemArray.length === 0}
                onDelete={() => onDelete(cartItemArray[0].id)}
                componentStyle={componentStyle}
                {...componentProps}
                {...obj}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
};
SlickCarousel.propTypes = {
  settings: PropTypes.object.isRequired,
  componentStyle: PropTypes.object,
  componentProps: PropTypes.object,
  node: PropTypes.object,
  modalName: PropTypes.string,
  height: PropTypes.string,
  Compo: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  autoplay: PropTypes.bool,
  showArrow: PropTypes.bool,
  onDelete: PropTypes.func,
  getCart: PropTypes.object,
  itemName: PropTypes.string
};
export default SlickCarousel;
