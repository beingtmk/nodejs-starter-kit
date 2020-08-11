import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Divider,
  Alert,
  Button,
  Empty,
  Typography,
  Select,
} from "antd";

import MiniBlogImageComponent from "@gqlapp/blog-client-react/components/MiniBlogImageComponent";

import moment from "moment";
import { Name, emptyCover } from "../constants";
import AddInviteModal from "../containers/AddInviteModal";
import { MemberStatus, MemberType } from "../constants";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const SelectOption = Select.Option;
const GroupComponent = ({ group, changeGroupMemberType }) => {
  const handleMemberTypeChange = async (e, userEmail) => {
    const { id } = group;
    console.log(e);
    await changeGroupMemberType({ groupId: id, userEmail, type: e });
  };

  let invites = [],
    joinees = [];

  group.members.map((item) => {
    if (item.member) joinees.push(item);
    else invites.push(item);
  });
  console.log("groupComponent", group);
  return (
    <Row gutter={24}>
      <Col span={24}>
        <Title>Members</Title>
        <Divider />
        {joinees.length > 0 ? (
          joinees.map((item) => (
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card
                hoverable
                cover={
                  <img
                    style={{ height: "200px" }}
                    alt={item.email}
                    src={
                      (item.member.profile && item.member.profile.avatar) ||
                      emptyCover
                    }
                  />
                }
              >
                <Meta
                  title={
                    <span
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      <strong>{item.member.email}</strong>
                      <br />
                      <span>{Name(item.member.profile)}</span>
                      <br />
                      <span>
                        Username: <i>{item.member.username} </i>
                      </span>
                    </span>
                  }
                  description={`Added on ${moment(item.createdAt).format(
                    "MMM DD, YYYY"
                  )}`}
                />
                <br />
                <Select
                  value={item.type}
                  style={{ display: "block", marginBottom:'20px' }}
                  onChange={(e) => handleMemberTypeChange(e, item.email)}
                >
                  <SelectOption key={MemberType.ADMIN} value={MemberType.ADMIN}>
                    {MemberType.ADMIN}
                  </SelectOption>
                  <SelectOption
                    key={MemberType.MEMBER}
                    value={MemberType.MEMBER}
                  >
                    {MemberType.MEMBER}
                  </SelectOption>
                </Select>
                <Alert type="success" message={item.type} />
              </Card>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Col>
      <Col span={24}>
        <Divider />
        <Row>
          <Col span={18}>
            <Title level={2}>Invites</Title>
          </Col>
          <Col span={6} align="right">
            <AddInviteModal groupId={group && group.id} />
          </Col>
        </Row>
        <Divider />
        {invites.length > 0 ? (
          invites.map((item) => (
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card hoverable title={item.email}>
                <Alert type="warning" message="Invited" />
              </Card>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
};

GroupComponent.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default translate("group")(GroupComponent);
