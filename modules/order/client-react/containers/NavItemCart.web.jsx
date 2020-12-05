import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { DropDown, Card, Icon, Message /* , SlickCarousel */ } from '@gqlapp/look-client-react';

import { withCurrentUser, withGetCart, withEditOrderDetail, withDeleteCartItem } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';
import SlickCarousel from './SlickCarousel';
import CartItemComponent from '../components/NavItemCartComponent';
import ROUTES from '../routes';

const StyleCard = styled(Card)`
  border: 0px !important;
  border-radius: 0px !important;
  margin-right: 15px !important;
`;

const NavItemCart = props => {
  const { getCart, subscribeToMore, history, editOrderDetail, deleteOrderDetail, currentUserLoading, t } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  const handleEdit = (id, optionsId, quantity) => {
    // console.log(id, optionsId, quantity);
    try {
      const input = {
        id,
        orderOptions: {
          id: optionsId,
          quantity: quantity
        }
      };
      // console.log(input);
      const output = editOrderDetail(input);
      output ? Message.success('Edited successfully') : Message.error('Try again');
    } catch (e) {
      throw Error(e);
    }
  };
  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props navCart', props);
  return (
    <>
      {!currentUserLoading && (
        <DropDown
          content={
            <NavLink to={ROUTES.checkoutCart} className="nav-link" activeClassName="active">
              <StyleCard
                hoverable
                bodyStyle={{
                  padding: '12px'
                }}
              >
                <Icon type="ShoppingCartOutlined" />
                &nbsp;&nbsp;{getCart && getCart.orderDetails && getCart.orderDetails.length}
              </StyleCard>
            </NavLink>
          }
          placement="bottomRight"
          className="navbar-cart-dropdown"
          noicon
        >
          {props.getCart && props.getCart.orderDetails && props.getCart.orderDetails.length !== 0 ? (
            <SlickCarousel
              Compo={CartItemComponent}
              data={props.getCart.orderDetails}
              width={'300px'}
              // node={true}
              itemName={'item'}
              componentProps={{
                mobile: true,
                t
              }}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <h3 style={{ padding: '10px' }}>No Items in cart</h3>
          )}
        </DropDown>
      )}
    </>
  );
};

NavItemCart.propTypes = {
  currentUserLoading: PropTypes.bool.isRequired,
  getCart: PropTypes.object,
  history: PropTypes.object,
  editOrderDetail: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  subscribeToMore: PropTypes.func,
  t: PropTypes.func
};

export default compose(
  withCurrentUser,
  withGetCart,
  withEditOrderDetail,
  withDeleteCartItem,
  translate('order')
)(NavItemCart);
