import React from 'react';
import PropTypes from 'prop-types';

import { Form as ADForm } from 'antd';

const Form = ({ children, onSubmit, ...props }) => {
  return (
    <ADForm onFinish={onSubmit} {...props}>
      {children}
    </ADForm>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onSubmit: PropTypes.func
};

export default Form;
