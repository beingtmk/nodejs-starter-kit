import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { FormItem } from '@gqlapp/look-client-react';

const { TextArea } = Input;

const RenderField = ({ input, label, type, meta: { touched, error }, placeholder, rows = 6, tooltip }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem
      label={label}
      hasFeedback={type != 'textarea'}
      validateStatus={validateStatus}
      help={touched && error}
      tooltip={tooltip}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      {type != 'textarea' ? <Input {...input} placeholder={placeholder || label} type={type} /> : null}

      {type == 'textarea' ? <TextArea rows={rows} {...input} placeholder={placeholder || label} /> : null}
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string,
  meta: PropTypes.object,
  tooltip: PropTypes.object
};

export default RenderField;
