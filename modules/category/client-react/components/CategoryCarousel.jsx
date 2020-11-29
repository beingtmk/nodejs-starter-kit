import React from 'react';
import PropTypes from 'prop-types';

import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import CategoryItemComponent from '@gqlapp/category-client-react/components/CategoryItemComponent';

import { SlickCarousel } from '@gqlapp/look-client-react';

const ListingCarousel = props => {
  const { categories } = props;

  const itemLength = categories && displayDataCheck(categories.length);
  const carouselSettings = itemLength => {
    return {
      // className: 'slider variable-width',
      variableWidth: true,
      autoplay: true,
      easing: 1000,
      infinite: true,
      speed: 500,
      autoplaySpeed: 2000,
      slidesToShow: itemLength >= 4 ? 4 : itemLength,
      slidesToScroll: 1,
      swipeToSlide: true,
      lazyLoad: true,

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

  return (
    <div className="category-carousel-wrapper">
      <div className="category-carousel ">
        <SlickCarousel
          Compo={CategoryItemComponent}
          settings={carouselSettings(itemLength)}
          itemName={'category'}
          data={categories}
          height={'285px'}
          componentStyle={{
            margin: '0 10px',
            width: '265px'
          }}
        />
      </div>
    </div>
  );
};

ListingCarousel.propTypes = {
  categories: PropTypes.object
};

export default ListingCarousel;
