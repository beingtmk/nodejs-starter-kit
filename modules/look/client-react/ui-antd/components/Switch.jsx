import React from 'react';
import PropTypes from 'prop-types';
import { Switch as ADSwitch } from 'antd';

import { FormItem } from '@gqlapp/look-client-react';

const Switch = ({ label, meta: { touched, error }, ...props }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <div>
        <ADSwitch {...props} />
      </div>
    </FormItem>
  );
};

Switch.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object
};
export default Switch;
