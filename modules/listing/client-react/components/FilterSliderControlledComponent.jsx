import React from 'react';
import PropTypes from 'prop-types';

import { Slider, FormItem, Space, Icon } from '@gqlapp/look-client-react';

class SliderControlled extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps /* prevState */) {
    if (prevProps !== this.props) {
      this.setState({ value: this.props.value });
    }
  }
  handleChange(e) {
    this.setState({ value: e });
  }

  handleSubmit(e) {
    const { handleSliderChange } = this.props;
    setTimeout(function() {
      handleSliderChange(e);
    }, 500);
  }

  render() {
    var { icon, ...currentProps } = this.props;
    delete currentProps.value;
    delete currentProps.handleSliderChange;
    let labels = currentProps.inFilter
      ? {}
      : {
          labelCol: { span: 24 },
          wrapperCol: { span: 24 }
        };
    return (
      <FormItem
        label={
          <Space align="center">
            {icon ? <Icon type={icon} /> : <>&#8377;</>}
            {currentProps.label}
          </Space>
        }
        style={{ height: '60px', width: '100%' }}
        {...labels}
      >
        <Slider
          {...currentProps}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
          onAfterChange={e => this.handleSubmit(e)}
        />
      </FormItem>
    );
  }
}
SliderControlled.propTypes = {
  handleSliderChange: PropTypes.func,
  value: PropTypes.object,
  icon: PropTypes.string
};
export default SliderControlled;
