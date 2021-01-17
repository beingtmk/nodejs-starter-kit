import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { LISTING_ROUTES } from '@gqlapp/listing-client-react';
import { Row, Col, Card, Tooltip } from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
import { DiscountComponentView, withModalDiscount } from '@gqlapp/discount-client-react';

// const AlignButton = styled.div`
//   position: absolute;
//   right: 0;
//   z-index: 1;
//   margin: 80px 110px;
// `;

const CartItemComponent = props => {
  const { item, /* onEdit, onDelete, */ modalDiscount } = props;
  // const handleQuantity = ele => {
  //   let quantity = item.orderOptions.quantity;
  //   if (ele === 'plus') quantity = quantity + 1;
  //   if (ele === 'minus') quantity = quantity - 1;
  //   console.log(quantity);
  //   if (quantity === 0) {
  //     onDelete(item.id);
  //   } else {
  //     onEdit(item.id, item.orderOptions && item.orderOptions.id, quantity);
  //   }
  // };
  const now = new Date().toISOString();
  const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
  const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
  const isDiscountPercent =
    startDate && endDate
      ? startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0
      : modalDiscount && modalDiscount.discountPercent > 0;
  const discountPercent = isDiscountPercent ? modalDiscount && modalDiscount.discountPercent : null;
  const isDiscount = isDiscountPercent;
  const discount = discountPercent;
  return (
    <div /* style={{ paddingRight: '10px' }} */>
      {/* <AlignButton>
        <ButtonGroup>
          <Button size="sm" icon={<Icon type="MinusOutlined" />} onClick={() => handleQuantity('minus')} />
          <Button size="sm" style={{ width: '24px', padding: '0px 0px' }}>
            {item.orderOptions.quantity}
          </Button>
          <Button size="sm" icon={<Icon type="PlusOutlined" />} onClick={() => handleQuantity('plus')} />
        </ButtonGroup>
      </AlignButton> */}
      <Link className="navItemLink" target="_blank" to={`${LISTING_ROUTES.listingDetailLink}${item.modalId}`}>
        <Card bordered={false}>
          <Row gutter={24} style={{ paddingBottom: '0px' }}>
            <Col span={9}>
              <img alt="" src={item.imageUrl || NO_IMG} style={{ height: '100px', width: '100%' }} />
            </Col>
            <Col span={15}>
              <Row>
                <Col span={24}>
                  <Tooltip title={item && item.title}>
                    <div className="ant-card-meta-title">
                      <span
                        style={{
                          fontSize: '18px',
                          overflow: 'hidden',
                          lineClamp: 1,
                          display: 'box',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item && item.title}
                      </span>
                    </div>
                  </Tooltip>
                  {/* <h3>{item.title}</h3> */}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row justify="start" style={{ color: 'gray' }}>
                    Quantity:
                  </Row>
                </Col>
                <Col span={12}>
                  <Row justify="end">{item.orderOptions.quantity}</Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={6}>
                  <Row justify="start" style={{ color: 'gray' }}>
                    Price:
                  </Row>
                </Col>
                <Col span={18}>
                  <Row justify="end">
                    <DiscountComponentView
                      isDiscount={isDiscount}
                      cost={item.cost}
                      discount={discount}
                      span={[16, 8]}
                      card={true}
                      rowStyle={{ height: '75px' }}
                      NavitemCart={true}
                    />
                    {/* <strong>&#8377; {priceCommaSeparator(` ${item.cost * item.orderOptions.quantity}`)}</strong> */}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Link>
    </div>
  );
};
// const CartItemComponent = props => {
//   const { item, onEdit, onDelete } = props;
//   const handleQuantity = ele => {
//     let quantity = item.orderOptions.quantity;
//     if (ele === 'plus') quantity = quantity + 1;
//     if (ele === 'minus') quantity = quantity - 1;
//     console.log(quantity);
//     if (quantity === 0) {
//       onDelete(item.id);
//     } else {
//       onEdit(item.id, item.orderOptions && item.orderOptions.id, quantity);
//     }
//   };
//   return (
//     <div style={{ paddingRight: '10px' }}>
//       <AlignButton>
//         <ButtonGroup>
//           <Button size="sm" icon={<Icon type="MinusOutlined" />} onClick={() => handleQuantity('minus')} />
//           <Button size="sm" style={{ width: '24px', padding: '0px 0px' }}>
//             {item.orderOptions.quantity}
//           </Button>
//           <Button size="sm" icon={<Icon type="PlusOutlined" />} onClick={() => handleQuantity('plus')} />
//         </ButtonGroup>
//       </AlignButton>
//       <Link className="navItemLink" target="_blank" to={`${LISTING_ROUTES.listingDetailLink}${item.modalId}`}>
//         <Card bordered={false}>
//           <Row gutter={24} style={{ paddingBottom: '0px' }}>
//             <Col span={9} offset={0}>
//               <img alt="" src={item.imageUrl || NO_IMG} style={{ height: '100px', width: '100%' }} />
//             </Col>
//             <Col span={9}>
//               <h3>{item.title}</h3>
//             </Col>
//             <Col span={6} offset={0}>
//               <Row justify="end">
//                 <strong>&#8377; {priceCommaSeparator(` ${item.cost * item.orderOptions.quantity}`)}</strong>
//               </Row>
//             </Col>
//           </Row>
//         </Card>
//       </Link>
//     </div>
//   );
// };

CartItemComponent.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  modalDiscount: PropTypes.object,
  mobile: PropTypes.func,
  t: PropTypes.func
};

export default withModalDiscount(CartItemComponent);
