import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

import { FormItem } from '@gqlapp/look-client-react';

const RenderCheckBox = ({ input, label, meta: { touched, error }, inFilter = false }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  let labels = inFilter
    ? {}
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      };
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error} {...labels}>
      <Checkbox {...input}>{label}</Checkbox>
    </FormItem>
  );
};

RenderCheckBox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  inFilter: PropTypes.bool
};

export default RenderCheckBox;
