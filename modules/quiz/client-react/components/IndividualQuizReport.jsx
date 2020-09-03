import React from "react";
import { Typography, Divider } from "antd";
import { getResult } from "../helpers";

const { Text, Title, Paragraph } = Typography;

const IndividualQuizReport = (props) => {
  const { questionsData, currentAttempt } = props;

  return (
    <>
      {props.questionsData && props.questionsData.map((queData, i) => (
        <>
          <Title level={4} id={queData.id}>
            {`${i + 1} -> ${queData.description}`}
          </Title>
          <Text>{`A -> ${getResult(queData, currentAttempt)}`}</Text>
          <Divider />
        </>
      ))}
    </>
  );
};

export default IndividualQuizReport;
