import React from "react";
import { Spin as ADSpin } from "antd";

const Loader = ({ ...props }) => {
  return (
    <div align="center" style={{ paddingTop: "40px" }}>
      <ADSpin {...props} />
    </div>
  );
};

export default Loader;
