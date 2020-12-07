import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Row, Col, Divider, Button } from '@gqlapp/look-client-react';

import { TotalPrice } from '../components/CheckoutCartView';
import ROUTES from '../routes/index';

const ColorFloat = styled.strong`
  color: #3f0869;
`;
const SlickCarousel = props => {
  // console.log('carousel', props);
  const { Compo, itemName, height, width, onEdit, onDelete } = props;

  return (
    <>
      <div style={{ position: 'relative', height, width }}>
        {props.data.map((item, key) => {
          const obj = {};
          obj[itemName] = props.node ? item.node : item;
          return (
            <Row>
              <Col>
                <Compo {...obj} key={key} onEdit={onEdit} onDelete={onDelete} />
              </Col>
              <Divider style={{ margin: '0px', borderWidth: '2px' }} />
            </Row>
          );
        })}
        <Row>
          <Col span={24}>
            <Row>
              <Col span={16}>
                <h3 style={{ padding: '15px 0px 0px 15px' }}>
                  <strong>Subtotal</strong>
                </h3>
              </Col>
              <Col span={8}>
                <h3 style={{ padding: '15px 0px 0px 15px' }}>
                  <ColorFloat>&#8377;&nbsp;{TotalPrice(props.data)}</ColorFloat>
                </h3>
              </Col>
            </Row>
            <Row style={{ padding: '14px 24px 24px 24px' }}>
              <Button block color="primary">
                <Link to={ROUTES.checkoutCart}>Checkout</Link>
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

SlickCarousel.propTypes = {
  node: PropTypes.object,
  height: PropTypes.string,
  Compo: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  getCart: PropTypes.object,
  width: PropTypes.string,
  itemName: PropTypes.string,
  onEdit: PropTypes.func
};

export default SlickCarousel;
