import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { removeEmpty } from '@gqlapp/listing-client-react';

import ROUTES from '../routes';
import EditDiscountView from '../components/EditDiscountView.web';
import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount, withEditDiscount } from './DiscountOperations';

const EditDiscount = props => {
  const { editDiscount, history, discountSubscribeToMore, match, navigation } = props;
  let modalId = 0;
  let modalName = '';
  if (match) {
    modalId = Number(match.params.id);
    modalName = match.params.modalName;
  } else if (navigation) {
    modalId = Number(navigation.state.params.id);
    modalName = navigation.state.params.modalName;
  }

  useEffect(() => {
    const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
    return () => subscribe();
  }, [discountSubscribeToMore, modalId]);

  const handleSubmit = async values => {
    // console.log(values);
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      await editDiscount(removeEmpty({ modalId, modalName, ...values }));
      Message.destroy();
      Message.success('Discount edited.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <EditDiscountView onSubmit={handleSubmit} {...props} />;
};

EditDiscount.propTypes = {
  discountSubscribeToMore: PropTypes.func,
  editDiscount: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  navigation: PropTypes.object
};

export default compose(withModalDiscount, withEditDiscount, translate('discount'))(EditDiscount);
