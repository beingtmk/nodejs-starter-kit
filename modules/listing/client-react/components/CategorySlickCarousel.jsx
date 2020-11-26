import React from 'react';
import PropTypes from 'prop-types';

import { Carousel as ADCarousel } from '@gqlapp/look-client-react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }

  render() {
    // console.log('carousel', this.props);
    const { Compo, componentProps, showArrow } = this.props;

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
    };
    return (
      <>
        <div style={{ position: 'relative', height: this.props.height || '370px' }}>
          <ADCarousel showArrow={showArrow} ref={node => (this.carousel = node)} {...(this.props.settings || status)}>
            {this.props.data.map((item, key) => {
              return <Compo {...componentProps} componentStyle={this.props.componentStyle} category={item} key={key} />;
            })}
          </ADCarousel>
        </div>
      </>
    );
  }
}
Carousel.propTypes = {
  componentStyle: PropTypes.object,
  componentProps: PropTypes.object,
  settings: PropTypes.object,
  height: PropTypes.string,
  Compo: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  autoplay: PropTypes.bool,
  showArrow: PropTypes.bool
};
