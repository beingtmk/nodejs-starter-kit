import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { translate } from '@gqlapp/i18n-client-react';
import { DropDown, Card, Icon, Message, Empty, AddButton /* , SlickCarousel */ } from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';

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
  const {
    loading,
    getCart,
    subscribeToMore,
    history,
    editOrderDetail,
    deleteOrderDetail,
    currentUserLoading,
    t
  } = props;

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
      {!loading && (
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
                <div style={{ padding: '10px' }}>
                  <div className="centerAlign marginT30">
                    <Empty description="You have no items in your Cart" imageStyle={{ height: '80px' }}>
                      <Link to={`${LISTING_ROUTES.listingCatalogue}`}>
                        <AddButton style={{ width: 'fit-content' }}>{t('checkoutCart.btn.add')}</AddButton>
                      </Link>
                    </Empty>
                  </div>
                </div>
              )}
            </DropDown>
          )}
        </>
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
  t: PropTypes.func,
  loading: PropTypes.bool
};

export default compose(
  withCurrentUser,
  withGetCart,
  withEditOrderDetail,
  withDeleteCartItem,
  translate('order')
)(NavItemCart);
