import React from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '@gqlapp/look-client-react';

import Select from './Select';

const RenderSelect = props => {
  const {
    input,
    label,
    type,
    children,
    meta: { touched, error },
    onChange,
    selectStyle,
    inFilter
  } = props;
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  const handleChange = value => {
    const { formik, name } = props;
    if (onChange) {
      onChange(value);
    } else {
      formik.handleChange({ target: { value, name } });
    }
  };
  let labels = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };
  if (inFilter) {
    labels = null;
  }

  // console.log(props);
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error} {...labels} style={{ width: '100%' }}>
      <div>
        <Select type={type} style={selectStyle} {...input} onChange={handleChange}>
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
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  selectStyle: PropTypes.object,
  inFilter: PropTypes.bool
};

export default RenderSelect;
