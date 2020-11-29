import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { DropDown, Card, Icon, Badge /* , SlickCarousel */ } from '@gqlapp/look-client-react';

import { withCurrentUser, withGetCart } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';
import SlickCarousel from './SlickCarousel';
import CartItemComponent from '../components/CartItemComponent';
import ROUTES from '../routes';

const StyleCard = styled(Card)`
  border: 0px !important;
  border-radius: 0px !important;
  margin-right: 15px !important;
`;

const NavItemCart = props => {
  const { getCart, subscribeToMore, history, currentUserLoading, t } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  const itemLength = props.getCart && props.getCart.orderDetails && props.getCart.orderDetails.length;
  const carouselSettings = () => {
    return {
      className: 'slider variable-width',
      // variableWidth: true,
      autoplay: false,
      easing: 1000,
      // infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,

      arrows: true,
      dots: false
    };
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
                <Icon type="ShoppingCartOutlined" /> Cart{' '}
                <Badge
                  style={{ marginTop: '-5px' }}
                  count={getCart && getCart.orderDetails && getCart.orderDetails.length}
                />
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
              settings={carouselSettings(itemLength)}
              data={props.getCart.orderDetails}
              height={'500px'}
              width={'300px'}
              // node={true}
              itemName={'item'}
              componentProps={{
                mobile: true,
                t
              }}
              componentStyle={{ margin: '0px', width: '300px' }}
            />
          ) : (
            <h5>No Items in cart</h5>
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
  subscribeToMore: PropTypes.func,
  t: PropTypes.func
};

export default compose(withCurrentUser, withGetCart, translate('order'))(NavItemCart);
