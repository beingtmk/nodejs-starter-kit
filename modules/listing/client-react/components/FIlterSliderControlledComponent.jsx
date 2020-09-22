import React from 'react';
import { Slider } from 'antd';

class SliderControlled extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
    var { ...currentProps } = this.props;
    delete currentProps.value;
    delete currentProps.handleSliderChange;
    return (
      <Slider
        {...currentProps}
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        onAfterChange={e => this.handleSubmit(e)}
      />
    );
  }
}

export default SliderControlled;
