import React from 'react';
import PropTypes from 'prop-types';

// import { LeftArrow, RightArrow } from './CarouselArrows';
import { Row, Col, Divider, Button } from '@gqlapp/look-client-react';
import { TotalPrice } from '../components/CheckoutCartView';

const SlickCarousel = props => {
  // console.log('carousel', props);
  const { Compo, componentProps, itemName, height, width } = props;

  return (
    <>
      <div style={{ position: 'relative', height, width }}>
        {props.data.map((item, key) => {
          const obj = {};
          obj[itemName] = props.node ? item.node : item;
          return (
            <Row>
              <Col>
                <Compo {...componentProps} componentStyle={props.componentStyle} {...obj} key={key} />
              </Col>
              <Divider style={{ margin: '0px', width: '80%', minWidth: '80%' }} />
            </Row>
          );
        })}
        <Row>
          <Col span={24}>
            <Row>
              <Col span={16}>
                <h3 style={{ padding: '15px 0px 0px 15px' }}>
                  <strong>subtotal</strong>
                </h3>
              </Col>
              <Col span={8}>
                <h3 style={{ padding: '15px 0px 0px 15px' }}>
                  <strong>&#8377;{TotalPrice(props.data)}</strong>
                </h3>
              </Col>
            </Row>
            <Row style={{ padding: '24px' }}>
              <Button block color="primary">
                checkout
              </Button>
            </Row>
          </Col>
        </Row>
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
