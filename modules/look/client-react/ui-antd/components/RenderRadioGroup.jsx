import React from 'react';
import PropTypes from 'prop-types';

// Abstract Out Select & Form To Do
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const RenderRadioGroup = ({ input, label, children, meta: { touched, error } }) => {
  let validateStatus = '';
  if (error) {
    validateStatus = 'error';
  }
  const onBlur = e => {};
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <RadioGroup {...input} onBlur={onBlur}>
        {children}
      </RadioGroup>
    </FormItem>
  );
};

RenderRadioGroup.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderRadioGroup;