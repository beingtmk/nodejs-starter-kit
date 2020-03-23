import React from 'react';
import { PropTypes } from 'prop-types';

const New = ({ length }) => {
  return (
    <React.Fragment>
      <div key="line" className="title-line-wrapper" align="left" style={{ maxWidth: `${length}` }}>
        <div
          className="title-line"
          // style={{ transform: "translateX(-64px)" }}
        />
      </div>
      <br />
    </React.Fragment>
  );
};

New.propTypes = {
  length: PropTypes.object
};
export default New;
