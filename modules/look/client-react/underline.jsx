import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Underline extends Component {
  state = {};

  render() {
    // console.log(this.props);
    const array = this.props.children.props.children;
    var Result = 0;
    for (var i in array) {
      Result = Result + array[i].length;
    }
    // console.log(Result, 're');
    // console.log(array, ' array');
    var Length = 0;
    if (array.length === 3) {
      if (array[0].length === undefined) {
        Length = array[2].length;
      } else {
        Length = Result;
      }
    } else {
      Length = array.length;
    }
    console.log(Length);
    Length = Length * 10;
    return (
      <React.Fragment>
        <div>
          {this.props.children}
          <div key="line" className="title-line-wrapper" align="left" style={{ MaxWidth: `${Length}px` }}>
            <div
              className="title-line"
              // style={{ transform: "translateX(-64px)" }}
            />
          </div>
          <br />
        </div>
      </React.Fragment>
    );
  }
}

Underline.propTypes = {
  length: PropTypes.object,
  children: PropTypes.object
};
export default Underline;
