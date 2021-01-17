import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { translate } from '@gqlapp/i18n-client-react';
import { DropDown, Card, Icon, Message, Badge, EmptyComponent } from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { LISTING_ROUTES } from '@gqlapp/listing-client-react';

import { withCurrentUser, withGetCart, withEditOrderDetail, withDeleteCartItem } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';
import NavItemCartLayout from '../components/NavItemCartLayout';
import NavItemCartComponent from '../components/NavItemCartComponent';
import ROUTES from '../routes';

const StyleCard = styled(Card)`
  border: 0px !important;
  border-radius: 0px !important;
  margin-right: 15px !important;
`;

const NavItemCart = props => {
  const [visible, setVisible] = useState(false);
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
          quantity
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
              style={{ backgroundColor: 'whitesmoke' }}
              content={
                <NavLink to={ROUTES.checkoutCart} className="nav-link" activeClassName="active" visible={visible}>
                  <StyleCard
                    hoverable
                    bodyStyle={{
                      padding: '12px'
                    }}
                    onMouseEnter={() => setVisible(true)}
                    onMouseLeave={() => setVisible(false)}
                  >
                    <Badge count={getCart && getCart.orderDetails && getCart.orderDetails.length} size="small">
                      {visible ? (
                        <Icon type="ShoppingFilled" style={{ fontSize: '20px' }} />
                      ) : (
                        <Icon type="ShoppingOutlined" style={{ fontSize: '20px' }} />
                      )}
                    </Badge>
                  </StyleCard>
                </NavLink>
              }
              placement="bottomRight"
              className="navbar-cart-dropdown"
              noicon
            >
              {props.getCart && props.getCart.orderDetails && props.getCart.orderDetails.length !== 0 ? (
                <NavItemCartLayout
                  Compo={NavItemCartComponent}
                  data={props.getCart.orderDetails}
                  width={'300px'}
                  height={'260px'}
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
                  <EmptyComponent
                    applyClass={false}
                    description={'You have no items in your Cart'}
                    emptyLink={`${LISTING_ROUTES.listingCatalogue}`}
                    showAddBtn={true}
                    btnText={t('checkoutCart.btn.add')}
                  />
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
