import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Title, Text } = Typography;

const QuizCatalogueComponent = (props) => {
  const { id, cover, title, description } = props.node;
  return (
    <Link to={`/quiz/${id}`}>
      <Card
        hoverable
        style={{ marginBottom: "24px" }}
        cover={
          <div align="center" style={{ height: "200px", overflow: "hidden" }}>
            <img src={cover} height="100%" alt="" />
          </div>
        }
      >
        <Meta
          title={<Title level={3}>{title}</Title>}
          description={<Text>{description}</Text>}
        />
      </Card>
    </Link>
  );
};

export default QuizCatalogueComponent;
