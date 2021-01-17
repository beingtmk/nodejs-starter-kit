import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Tooltip, Icon, Button } from '@gqlapp/look-client-react';
import { DISCOUNT_ROUTES } from '@gqlapp/discount-client-react';

const DiscountBtnView = props => {
  const { loading, modalDiscount, modalName, modalId } = props;
  return (
    <Tooltip title={`${modalDiscount ? 'Edit' : 'Add'} Discount`}>
      <a href={`${modalDiscount ? DISCOUNT_ROUTES.editLink : DISCOUNT_ROUTES.addLink}${modalName}/${modalId}`}>
        <Button
          color="primary"
          shape="circle"
          loading={loading}
          icon={modalDiscount ? <Icon type="EditOutlined" /> : <Icon type="PlusOutlined" />}
        />
        <Divider type="vertical" />
      </a>
    </Tooltip>
  );
};

DiscountBtnView.propTypes = {
  loading: PropTypes.bool,
  modalDiscount: PropTypes.object,
  modalName: PropTypes.string,
  modalId: PropTypes.number
};

export default DiscountBtnView;
