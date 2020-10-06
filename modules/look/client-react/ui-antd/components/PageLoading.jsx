import React from "react";
import { Spin as ADSpin } from "antd";

const PageLoading = ({ ...props }) => {
  return (
    <div style={{ display:'grid', placeItems:'center' }}>
      <ADSpin {...props} />
    </div>
  );
};

export default PageLoading;
