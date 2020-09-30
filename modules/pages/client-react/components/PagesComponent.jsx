import React from "react";
import { Typography, Divider } from "antd";
import Helmet from "react-helmet";
import settings from "@gqlapp/config";

const { Title, Paragraph, Text } = Typography;

const PagesComponent = ({ title, t }) => {
  const renderMetaData = (t) => (
    <Helmet
      title={`${settings.app.name} - ${title}`}
      meta={[
        { name: "description", content: `${settings.app.name} - ${title}` },
      ]}
    />
  );
  return (
    <div style={{ background: "white", padding: "24px" }}>
      {renderMetaData(t)}
      <Title level={1}>{title}</Title>
      <Divider />
    </div>
  );
};

export default PagesComponent;
