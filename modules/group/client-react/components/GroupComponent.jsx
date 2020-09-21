import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import { Link, NavLink } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Divider,
  Alert,
  Button,
  Empty,
  Typography,
  PageHeader,
  Icon,
  Avatar,
} from "antd";

import MiniBlogImageComponent from "@gqlapp/blog-client-react/components/MiniBlogImageComponent";

import moment from "moment";
import { Name, emptyCover } from "../constants";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const GroupComponent = ({ group, history }) => {
  let invites = [],
    joinees = [];

  group.members.map((item) => {
    if (item.member) joinees.push(item);
    else invites.push(item);
  });

  return (
    <Row>
      <Col
      // xs={{ span: 22, offset: 1 }}
      // sm={{ span: 22, offset: 1 }}
      // md={{ span: 22, offset: 1 }}
      // lg={{ span: 20, offset: 2 }}
      >
        <PageHeader
          style={{ padding: 0 }}
          title={
            <Title
              className="group-page-heading"
              style={{ display: "inline" }}
              level={2}
            >
              {group.title}
            </Title>
          }
          backIcon={
            group.groupId ? (
              <Icon
                type="arrow-left"
                style={{ fontSize: "25px", marginTop: "-5px" }}
              />
            ) : (
              <Icon
                type="team"
                style={{ fontSize: "25px", marginTop: "-5px" }}
              />
            )
          }
          onBack={() =>
            group.groupId ? history.push(`/group/${group.groupId}/info`) : null
          }
          extra={[
            <Link to={`/group/edit/${group.id}`}>
              <Button icon="edit" type="primary" size="large" ghost>
                Edit
              </Button>
            </Link>,
          ]}
        >
          <Text style={{ fontSize: "15px", marginBottom: "10px" }}>
            Group Type:{" "}
            <Text style={{ fontSize: "inherit" }} mark>
              {group.groupType}
            </Text>
          </Text>
          <br />
          <Text style={{ fontSize: "12px" }}>
            Created At:{" "}
            <Text style={{ fontSize: "inherit" }}>
              {moment(group.createdAt).format("MMM DD, YYYY")}
            </Text>
          </Text>
          <Card style={{ border: 0, marginTop:'24px' }} bodyStyle={{ padding: "0" }}>
            <Meta
              avatar={<Avatar src={group.avatar} size={130} />}
              description={
                <Paragraph style={{ display: "inline" }}>
                  {group.description}
                </Paragraph>
              }
            />
          </Card>
        </PageHeader>
      </Col>
    </Row>
  );
};

GroupComponent.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default translate("group")(GroupComponent);
