import React from 'react';
import PropTypes from 'prop-types';

// import { LeftArrow, RightArrow } from './CarouselArrows';
import { Row, Col, Carousel } from '@gqlapp/look-client-react';

const SlickCarousel = props => {
  // console.log('carousel', props);
  const { Compo, componentProps, itemName, height, width, showArrow } = props;

  return (
    <>
      <div style={{ position: 'relative', height, width }}>
        <Carousel {...props.settings} showArrow={showArrow}>
          {props.data.map((item, key) => {
            const obj = {};
            obj[itemName] = props.node ? item.node : item;
            return (
              <Row>
                <Col>
                  <Compo {...componentProps} componentStyle={props.componentStyle} {...obj} key={key} />
                </Col>
              </Row>
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
  width: PropTypes.string,
  itemName: PropTypes.string
};

export default SlickCarousel;
