import React from "react";
import PropTypes from "prop-types";

import { Col, Row, Card, Button, Tooltip, Empty, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import MiniBlogImageComponent from "@gqlapp/blog-client-react/components/MiniBlogImageComponent";

export const GroupCatalogueComponent = (props) => {
  const { item, key, deleteGroup } = props;

  const cancel = () => {
    message.error("Task cancelled");
  };

  return (
    <Card
      key={key}
      hoverable
      title={
        <Tooltip placement="bottomLeft" title={item.title}>
          <h4 style={{ fontSize: "20px" }}>
            <p>{`${item.title.substring(0, 20)}${
              item.description.length > 20 ? "..." : ""
            }`}</p>
          </h4>
        </Tooltip>
      }
      cover={<MiniBlogImageComponent title={item.title} image={item.avatar} />}
      className="blog-catalogue-card"
      style={{ marginBottom: "20px" }}
      extra={
        <Popconfirm
          title="Delete Group"
          onConfirm={() => deleteGroup(item.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button icon="delete" />
        </Popconfirm>
      }
      actions={[
        <Link to={`/group/${item.id}/info`}>Details</Link>,
        <Link to={`/group/edit/${item.id}`}>Edit</Link>,
      ]}
    >
      <div style={{ height: "100px", width: "100%" }}>
        <Tooltip placement="bottomLeft" title={item.description}>
          <h2
            style={{
              fontSize: "15px",
              color: "rgba(0, 0, 0, 0.44)",
            }}
          >
            {`${item.description.substring(0, 40)}${
              item.description.length > 40 ? "..." : ""
            }`}
          </h2>
        </Tooltip>
        <br />
        <h3
          style={{
            color: "rgba(0, 0, 0, 0.74)",
          }}
        >
          {`Group Type: ${item.groupType}`}
        </h3>
      </div>
    </Card>
  );
};

const MyGroupsComponent = ({ groups }) => {
  return (
    <Row gutter={32} className="groups-list-row">
      <div style={{ marginBottom: "30px", marginLeft: "16px" }}>
        <h1 style={{ fontSize: "32px" }}>My Groups</h1>

        <div align="left">
          <div
            key="line"
            className="title-line-wrapper"
            style={{ width: "200px" }}
            align="left"
          >
            <div className="title-line" />
          </div>
        </div>
      </div>
      {groups ? (
        groups.map((item, key) => (
          <Col xs={24} md={12} sm={12} lg={8}>
            <GroupCatalogueComponent item={item} key={key} />
          </Col>
        ))
      ) : (
        <Empty />
      )}
    </Row>
  );
};

MyGroupsComponent.propTypes = {
  groups: PropTypes.array,
};

export default MyGroupsComponent;
