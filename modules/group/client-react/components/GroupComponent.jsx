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
            <Title style={{ display: "inline" }} level={2}>
              {group.title}
            </Title>
          }
          backIcon={
            group.groupId ? (
              <Icon type="arrow-left" style={{ fontSize: "25px" }} />
            ) : (
              <Icon type="team" style={{ fontSize: "25px" }} />
            )
          }
          onBack={() =>
            group.groupId ? history.push(`/group/${group.groupId}/info`) : null
          }
          extra={[
            <Link to={`/group/edit/${group.id}`}>
              <Button icon="edit" type="primary" size="small" ghost>
                Edit
              </Button>
            </Link>,
          ]}
        >
          <Row type="flex">
            <Col xs={{span:24, order:2}} md={{span:16, order:1}} lg={{span:18, order:1}}>
              <Paragraph style={{ display: "inline" }}>
                {group.description}
              </Paragraph>

              <Text>
                Group Type: <Text mark>{group.groupType}</Text>
              </Text>

              <br />
              <Text>
                Created At:{" "}
                <Text>{moment(group.createdAt).format("MMM DD, YYYY")}</Text>
              </Text>
            </Col>
            <Col xs={{span:24, order:1}} md={{span:8, order:2}} lg={{span:6, order:2}} align="right">
              <div align="center" style={{ overflow: "hidden" }}>
                <img alt="" src={group.avatar} className="group-info-avatar" />
              </div>
            </Col>
          </Row>
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
