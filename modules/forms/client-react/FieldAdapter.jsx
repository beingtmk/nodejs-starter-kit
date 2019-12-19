import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import { get as getPath } from 'lodash';
import { isString } from 'util';
import { PLATFORM } from '../../../packages/common/utils';

class FieldAdapter extends Component {
  static propTypes = {
    formik: PropTypes.object.isRequired,
    component: PropTypes.func,
    type: PropTypes.string,
    onChangeText: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  // To Do - ReConfirm that this works
  onChange = (e, secondArg) => {
    const { onChange } = this.props;
    // console.log(this.props);
    if (onChange) {
      onChange(e);
    }
    if (e._isAMomentObject && secondArg) {
      this.props.formik.setFieldValue(this.props.name, secondArg);
    } else if (Array.isArray(e) && e[0]._isAMomentObject && e[1]._isAMomentObject && secondArg) {
      this.props.formik.setFieldValue(this.props.name, secondArg);
    } else if (isString(e)) {
      // for Option Field
      this.props.formik.setFieldValue(this.props.name, e);
    } else if (e.target.type == 'radio') {
      this.props.formik.setFieldValue(e.target.name, e.target.value);
    } else if (e.target.checked) {
      this.props.formik.setFieldValue(e.target.name, e.target.checked);
    } else if (e.target.type == 'number') {
      this.props.formik.setFieldValue(e.target.name, parseInt(e.target.value));
    } else {
      this.props.formik.setFieldValue(this.props.name, e.target.value || e.target.checked);
    }
  };

  onBlur = e => {
    const { formik, onBlur, name } = this.props;
    if (onBlur) {
      onBlur(e);
    } else {
      if (PLATFORM === 'mobile') {
        formik.setFieldTouched(name, true);
      } else {
        // console.log(name);
        // formik.handleBlur(e);
        formik.setFieldTouched(name, true);
      }
    }
  };

  onChangeText = value => {
    const { formik, onChangeText, onChange, name } = this.props;
    if (onChange && !onChangeText) {
      onChange(value);
    } else if (onChangeText) {
      onChangeText(value);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  render() {
    const { formik, component, name, defaultChecked, disabled } = this.props;
    let { defaultValue } = this.props;
    let { value, checked } = this.props;
    value = value || '';
    // const type = this.props.type;
    // if (type == 'number') {
    //   value = parseInt(value);
    //   defaultValue = parseInt(defaultValue);
    //   console.log(value);
    // }

    checked = checked || false;
    const meta = {
      touched: getPath(formik.touched, name),
      error: getPath(formik.errors, name)
    };

    const input = {
      onBlur: this.onBlur,
      name,
      value,
      checked,
      defaultValue,
      defaultChecked,
      disabled
    };

    const changeEventHandler = PLATFORM === 'mobile' ? 'onChangeText' : 'onChange';
    input[changeEventHandler] = this[changeEventHandler];

    return React.createElement(component, {
      ...this.props,
      input,
      meta
    });
  }
}

export default connect(FieldAdapter);
