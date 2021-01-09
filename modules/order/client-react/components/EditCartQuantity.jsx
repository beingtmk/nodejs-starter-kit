import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { RenderSelect, Option } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

import { withEditOrderDetail } from '../containers/OrderOperations';

const EditCartQuantity = props => {
  const { item, disable, maxQuantity, editOrderDetail, t } = props;

  const handleEdit = async quantity => {
    try {
      await editOrderDetail({ id: item.id, orderOptions: { quantity } });
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <Field
      name="quantity"
      component={RenderSelect}
      placeholder={t('cartItem.quantity')}
      defaultValue={item.orderOptions.quantity}
      disabled={disable}
      onChange={e => handleEdit(e)}
      style={{ width: '100%' }}
      value={item.orderOptions.quantity}
      inFilter={true}
    >
      {maxQuantity &&
        [...Array(maxQuantity - 1).keys()].map(i => (
          <Option key={i + 1} value={i + 1}>
            {i + 1}
          </Option>
        ))}
    </Field>
  );
};

EditCartQuantity.propTypes = {
  item: PropTypes.func,
  disable: PropTypes.bool,
  maxQuantity: PropTypes.number,
  editOrderDetail: PropTypes.func,
  t: PropTypes.func
};

export default compose(withEditOrderDetail)(EditCartQuantity);
