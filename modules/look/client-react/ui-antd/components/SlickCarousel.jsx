import React from 'react';
import PropTypes from 'prop-types';

// import { LeftArrow, RightArrow } from './CarouselArrows';
import Carousel from './Carousel';

const SlickCarousel = props => {
  // console.log('carousel', props);
  const { Compo, componentProps, itemName, showArrow, getCart, onDelete } = props;

  const status = {
    autoplay: props.autoplay,
    easing: 100000,
    infinite: true,
    speed: 900,
    // variableWidth: true,
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
      <div style={{ position: 'relative', height: props.height || '370px' }}>
        <Carousel {...(props.settings || status)} showArrow={showArrow}>
          {props.data.map((item, key) => {
            const listing = props.node ? item.node : item;
            const cartItemArray =
              getCart && getCart.orderDetails && getCart.orderDetails.length > 0
                ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
                : [];
            const obj = {};
            obj[itemName] = props.node ? item.node : item;
            return (
              <Compo
                inCart={cartItemArray.length === 0}
                onDelete={() => onDelete(cartItemArray[0].id)}
                {...componentProps}
                modalName={'listing'}
                modalId={listing.id}
                componentStyle={props.componentStyle}
                {...obj}
                // listing={listing}
                key={key}
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
