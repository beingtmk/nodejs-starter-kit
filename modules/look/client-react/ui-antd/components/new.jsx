import React from 'react';
import { PropTypes } from 'prop-types';

const New = ({ e }) => {
  return (
    <React.Fragment>
      <div key="line" className="title-line-wrapper" align="left" style={{ maxWidth: `${e}` }}>
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
  e: PropTypes.object
};
export default New;
