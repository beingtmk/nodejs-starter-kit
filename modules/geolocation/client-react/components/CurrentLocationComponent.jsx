import React from "react";
import { Input, Button } from "antd";
import { DebounceInput } from "react-debounce-input";

class CurrentLocationComponent extends React.Component {
  state = { distance: this.props.filter.distance };
  handleChange = (distance) => {
    this.setState({ distance });
  };
  render() {
    const {
      currentLocation: { latitude, longitude },
      filter: { distance },
      onDistanceChange,
    } = this.props;
    return (
      <div>
        <h2>Your Current Location</h2>
        <p>
          <strong>Latitude: </strong>
          {latitude}
        </p>
        <p>
          <strong>Longitude: </strong>
          {longitude}
        </p>
        <br />
        <p>
          <strong>Enter the distance below: </strong>
        </p>
        <DebounceInput
          debounceTimeout={300}
          placeholder={"Enter the distance below:"}
          element={Input}
          type="number"
          value={distance}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <Button onClick={() => onDistanceChange(Number(this.state.distance))}>
          Submit
        </Button>
      </div>
    );
  }
}

export default CurrentLocationComponent;
