import React from 'react';
import PropTypes from 'prop-types';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { FormItem, RenderField, RenderUpload, Button } from '@gqlapp/look-client-react';

import Icon from './Icon';

export default class DynamicFieldSet extends React.Component {
  add = () => {
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};
    const keys = this.props.keys;

    keys.map(k => (obj[k.key] = ''));

    arrayHelpers.push(obj);
  };

  render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 }
    //   }
    // };
    // getFieldDecorator('keys', { initialValue: [] });
    const keys = this.props.keys;
    const name = this.props.name;
    const values = this.props.values;
    const arrayHelpers = this.props.arrayHelpers;
    let formItems = null;

    if (values) {
      formItems = values.map((v, indexv) => (
        <FormItem required={false} key={indexv} style={{ margin: '0px' }}>
          {keys.map((k, indexk) => (
            <FormItem style={{ display: 'inline-block', margin: '0px 5px' }} key={indexk}>
              {k.type == 'text' ? (
                <Field
                  name={`${name}[${indexv}].${k.key}`}
                  component={RenderField}
                  placeholder={k.placeholder || k.key}
                  type="text"
                  label={`${k.label || k.key}`}
                  // label={`${k.label || k.key} #${indexv + 1}`}
                  value={v[k.key]}
                  key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                />
              ) : null}

              {k.type == 'number' ? (
                <Field
                  name={`${name}[${indexv}].${k.key}`}
                  component={RenderField}
                  placeholder={k.placeholder || k.key}
                  type="number"
                  label={`${k.label || k.key}`}
                  value={v[k.key]}
                  key={indexv}
                />
              ) : null}

              {k.type == 'image' ? (
                <Field
                  name={`${name}[${indexv}].${k.key}`}
                  component={RenderUpload}
                  type="text"
                  setload={this.props.setload}
                  label={k.label || k.key}
                  value={v[k.key]}
                  key={indexv}
                  // style={{ display: 'inline-block', margin: '0px 5px' }}
                />
              ) : null}
            </FormItem>
          ))}
          {keys.length > 1 ? (
            <Icon
              type="MinusCircleOutlined"
              style={{ paddingTop: '40px' }}
              title="Remove "
              className="dynamic-delete-button"
              onClick={() => arrayHelpers.remove(indexv)}
            />
          ) : null}
        </FormItem>
      ));
    }
    return (
      <div>
        <FormItem label={this.props.label}>
          {formItems}
          <FormItem>
            <Button style={{ width: '200px' }} onClick={this.add}>
              <Icon type="PlusOutlined" />
              {this.props.buttonText || 'Add Field'}
            </Button>
          </FormItem>
        </FormItem>
      </div>
    );
  }
}

DynamicFieldSet.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  keys: PropTypes.array,
  setload: PropTypes.func,

  buttonText: PropTypes.string,
  arrayHelpers: PropTypes.object
};
