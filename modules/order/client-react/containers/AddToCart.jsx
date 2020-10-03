import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import AddToCartView from '../components/AddToCartView';
import { withAddToCart } from './OrderOperations';

import ROUTES from '../routes';

const AddToCart = props => {
  const { history, currentUser, listing, addToCart } = props;

  const onSubmit = async (values, redirect = false) => {
    const max = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
    if (!currentUser) {
      history.push(`/login?redirectBack=${history && history.location && history.location.pathname}`);
      return null;
    }

    if (values.quantity > max || values.quantity <= 0) {
      message.error('Invalid quantity!');
      return null;
    }
    if (values.quantity <= max && values.quantity > 0) {
      const input = {
        consumerId: currentUser && currentUser.id,
        orderDetail: {
          vendorId: listing && listing.user && listing.user.id,
          modalName: 'listing',
          modalId: listing && listing.id,

          title: listing && listing.title,
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU',
          cost: listing && listing.listingCostArray && listing.listingCostArray[0].cost,
          orderOptions: {
            quantity: values.quantity
          }
        }
      };

      try {
        // console.log('input', input);
        await addToCart(input);
        if (redirect) {
          history.push(`${ROUTES.checkoutCart}`);
        }
      } catch (e) {
        message.error('Failed!');
        throw new Error(e);
      }

      // Add Message
      message.success('Success! Complete your Order.');
    }
  };

  // console.log('AddToCart, props', props);
  return <AddToCartView onSubmit={onSubmit} {...props} />;
};

AddToCart.propTypes = {
  history: PropTypes.object,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  addToCart: PropTypes.func
};

export default compose(withAddToCart, translate('orders'))(AddToCart);
