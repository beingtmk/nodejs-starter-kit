import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Row, Col, Divider, Button } from '@gqlapp/look-client-react';
import { priceCommaSeparator } from '@gqlapp/listing-client-react';

import { TotalPrice } from './function';
import ROUTES from '../routes/index';

const NavItemCartLayout = props => {
  // console.log('carousel', props);
  const { Compo, itemName, height, width, onEdit, onDelete } = props;

  return (
    <>
      <div style={{ position: 'relative', width }}>
        <div style={{ maxHeight: height, overflow: 'hidden', overflowY: 'auto' }}>
          {props.data.map((item, key) => {
            const obj = {};
            obj[itemName] = props.node ? item.node : item;
            return (
              <Row>
                <Col>
                  <Compo
                    {...obj}
                    key={key}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    modalName={item.modalName}
                    modalId={item.modalId}
                  />
                </Col>
                <Divider style={{ margin: '0px', borderWidth: '2px' }} />
              </Row>
            );
          })}
        </div>
        <Row style={{ backgroundColor: 'whitesmoke' }}>
          <Col span={24}>
            <Row style={{ padding: '12px 12px 0 12px' }}>
              <Col span={16}>
                {/* <h3 style={{ padding: '15px 0px 0px 12px' }}> */}
                SHIPING:
                {/* </h3> */}
              </Col>
              <Col span={8}>
                <Row justify="end">
                  {/* <h3 style={{ padding: '15px 0px 0px 15px' }}> */}
                  FREE
                  {/* </h3> */}
                </Row>
              </Col>
            </Row>
            <Row style={{ padding: '12px 12px 0 12px' }}>
              <Col span={16}>
                {/* <h3 style={{ padding: '15px 0px 0px 12px' }}> */}
                Total:
                {/* </h3> */}
              </Col>
              <Col span={8}>
                <Row justify="end">
                  {/* <h3 style={{ padding: '15px 0px 0px 15px' }}> */}
                  &#8377;&nbsp;{priceCommaSeparator(TotalPrice(props.data))}
                  {/* </h3> */}
                </Row>
              </Col>
            </Row>
            <Row style={{ padding: '5px 12px' }}>
              <Button block color="primary">
                <Link to={ROUTES.checkoutCart}>CHECKOUT</Link>
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

NavItemCartLayout.propTypes = {
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

export default NavItemCartLayout;
