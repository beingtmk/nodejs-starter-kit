import React from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem';
import Select from './Select';
import Space from './Space';
import Icon from './Icon';

const RenderSelect = props => {
  const {
    icon,
    input,
    label,
    type,
    children,
    meta: { touched, error },
    onChange,
    selectStyle,
    inFilter = false
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

  let labels = inFilter
    ? {}
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      };

  const labelObj = label
    ? {
        label: (
          <Space align="center">
            {icon && <Icon type={icon} />}
            {label}
          </Space>
        )
      }
    : {};
  return (
    <FormItem {...labelObj} validateStatus={validateStatus} help={error} style={{ width: '100%' }} {...labels}>
      <Select type={type} style={selectStyle} {...input} onChange={handleChange}>
        {children}
      </Select>
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
  inFilter: PropTypes.bool,
  icon: PropTypes.string
};

export default RenderSelect;
