import React from 'react';
import PropTypes from 'prop-types';

import { Slider } from '@gqlapp/look-client-react';

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
SliderControlled.propTypes = {
  handleSliderChange: PropTypes.func,
  value: PropTypes.object
};
export default SliderControlled;
