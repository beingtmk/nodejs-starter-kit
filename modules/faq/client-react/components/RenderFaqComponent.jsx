import React from "react";

import { Card, Typography, Icon, Popconfirm } from "antd";

import EditFaqModal from "../containers/EditFaqModal";
const { Text } = Typography;

const RenderFaqComponent = (props) => {
  const {
    item: { id, question, answer },
  } = props;
  
  return (
    <div>
      <h2>
        {question}
      </h2>
      <h3>
        {answer}
      </h3>
    </div>
  );
};

export default RenderFaqComponent;
