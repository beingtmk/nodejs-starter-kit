import React from 'react';
import PropTypes from 'prop-types';

import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import CategoryItemComponent from '@gqlapp/category-client-react/components/CategoryItemComponent';

import { SlickCarousel } from '@gqlapp/look-client-react';

const CategoryCarousel = props => {
  const { categories } = props;

  const itemLength = categories && displayDataCheck(categories.length);
  const carouselSettings = () => {
    return {
      // className: 'slider variable-width',
      // variableWidth: true,
      autoplay: true,
      easing: 1000,
      infinite: true,
      speed: 500,
      autoplaySpeed: 2000,
      slidesToShow: 8,
      slidesToScroll: 1,
      swipeToSlide: true,
      lazyLoad: true,

      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
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
          height={'144px'}
          componentStyle={{
            margin: '0 10px'
            // width: '265px'
          }}
        />
      </div>
    </div>
  );
};

CategoryCarousel.propTypes = {
  categories: PropTypes.object
};

export default CategoryCarousel;
