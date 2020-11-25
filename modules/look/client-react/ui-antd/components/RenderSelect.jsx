import React from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem';
import Select from './Select';

const RenderSelect = props => {
  const {
    input,
    label,
    type,
    children,
    meta: { touched, error }
  } = props;
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
        <Select {...input} type={type}>
          {children}
        </Select>
      </div>
    </FormItem>
  );
};

RenderSelect.propTypes = {
  formik: PropTypes.object.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default RenderSelect;
