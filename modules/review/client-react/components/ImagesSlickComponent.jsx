import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, SlickCarousel } from '@gqlapp/look-client-react';

const ImagesSlickComponent = props => {
  const { images } = props;
  // console.log('props', props);
  const itemLength = images && images.length;

  const SlickComponent = ({ listing }) => (
    <Row align="middle" type="flex" justify="center">
      <Col span={24}>
        {listing.type === 'image' ? (
          <img alt="" style={{ height: '100px' }} src={listing.url} />
        ) : (
          <div key="video">
            <iframe
              width="100px"
              height="100px"
              src={listing.url.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Col>
    </Row>
  );

  const carouselSettings = itemLength => {
    return {
      className: 'slider variable-width',
      variableWidth: true,
      autoplay: true,
      easing: 1000,
      infinite: true,
      speed: 500,
      autoplaySpeed: 2000,
      slidesToShow: itemLength >= 4 ? 4 : itemLength,
      slidesToScroll: 1,
      swipeToSlide: true,

      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: itemLength >= 4 ? 4 : itemLength,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: itemLength >= 3 ? 3 : itemLength,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: itemLength >= 2 ? 2 : itemLength,
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
    };
  };

  return images ? (
    <SlickCarousel
      Compo={SlickComponent}
      settings={carouselSettings(itemLength)}
      itemName={'img'}
      data={images}
      showArrow={false}
      height={'115px'}
      node={false}
      componentStyle={{
        margin: '0 20px 0 0',
        width: '250px'
      }}
    />
  ) : null;
};
ImagesSlickComponent.propTypes = {
  images: PropTypes.array,
  listing: PropTypes.obj
};

export default ImagesSlickComponent;
