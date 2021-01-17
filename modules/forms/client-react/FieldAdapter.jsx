import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import { get as getPath } from 'lodash';
// import moment from 'moment';

import { PLATFORM } from '@gqlapp/core-common';

class FieldAdapter extends Component {
  static propTypes = {
    formik: PropTypes.object.isRequired,
    component: PropTypes.func,
    onChangeText: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  onChange = e => {
    const { formik, onChange /* name */ } = this.props;
    if (onChange) {
      onChange(e.target.value, e);
      // } else if (Array.isArray(e) && Array.isArray(name)) {
      //   formik.setFieldValue(name[0], e[0].toISOString());
      //   formik.setFieldValue(name[1], e[1].toISOString());
    } else {
      formik.handleChange(e);
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
        formik.handleBlur(e);
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
    const { formik, component, name, defaultValue, defaultChecked, disabled, min, max } = this.props;
    let { value, checked } = this.props;
    value = value || '';
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
      disabled,
      min,
      max
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
