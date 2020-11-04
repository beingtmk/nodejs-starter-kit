import React, { forwardRef /* useImperativeHandle */ } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withAddDiscount } from './DiscountOperations';
import AddDiscountComponentView from '../components/AddDiscountComponentView';

// eslint-disable-next-line react/display-name
const AddDiscountComponent = forwardRef((props /* ref */) => {
  // const { addDiscount } = props;
  // useImperativeHandle(ref, () => {
  //   const handleAdd = () => {
  //     console.log('handleAdd called');
  //   };
  // });
  // const handleAdd = useCallback(async () => {
  //   // const modalId = getModalId();
  //   // modalId && addDiscount({ modalId, ...values });
  //   console.log('modalId1', modalId);
  // }, [modalId]);

  console.log('props', props);
  return <AddDiscountComponentView {...props} />;
});

AddDiscountComponent.propTypes = {
  getModalId: PropTypes.func,
  addDiscount: PropTypes.func
};

export default compose(withAddDiscount, translate('discount'))(AddDiscountComponent);
