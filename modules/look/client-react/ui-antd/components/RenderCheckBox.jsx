import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

import { FormItem } from '@gqlapp/look-client-react';

const RenderCheckBox = ({ input, label, meta: { touched, error } }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  return (
    <FormItem
      label={label}
      validateStatus={validateStatus}
      help={error}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <div>
        <Checkbox {...input}>{label}</Checkbox>
      </div>
    </FormItem>
  );
};

RenderCheckBox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderCheckBox;
