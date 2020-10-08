import React from 'react';
import { PropTypes } from 'prop-types';

const Underline = props => {
  const array = props.children.props.children;
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
  Length = Length * 10;
  console.log(Length);
  return (
    <React.Fragment>
      <div>
        {props.children}
        <div key="line" className="title-line-wrapper" align="left" style={{ Width: `${Length}px` }}>
          <div
            className="title-line"
            // style={{ transform: "translateX(-64px)" }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

Underline.propTypes = {
  length: PropTypes.object,
  children: PropTypes.object
};
export default Underline;
