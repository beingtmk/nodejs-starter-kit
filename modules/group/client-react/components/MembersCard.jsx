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
  Tabs,
  Icon,
} from "antd";

import moment from "moment";
import { Name, emptyCover } from "../constants";

import { MemberStatus, MemberType } from "@gqlapp/group-common";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const SelectOption = Select.Option;
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;

const MembersCard = ({ item, changeGroupMemberType }) => {
  const handleMemberTypeChange = async (e, id) => {
    await changeGroupMemberType({ id, type: e });
  };

  return (
    <Card
      key={item.id}
      hoverable
      style={{ marginBottom: "10px" }}
      cover={
          <div style={{ height: "200px", overflow:'hidden', width:'100%' }} align='center'>
        <img
          
          alt={item.email}
          height='100%'
          src={
            (item.member.profile && item.member.profile.avatar) || emptyCover
          }
        /></div>
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
        style={{ display: "block", marginBottom: "20px" }}
        onChange={(e) => handleMemberTypeChange(e, item.id)}
      >
        <SelectOption key={MemberType.MANAGER} value={MemberType.MANAGER}>
          {MemberType.MANAGER}
        </SelectOption>
        <SelectOption key={MemberType.MEMBER} value={MemberType.MEMBER}>
          {MemberType.MEMBER}
        </SelectOption>
      </Select>
    </Card>
  );
};

MembersCard.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default translate("group")(MembersCard);
