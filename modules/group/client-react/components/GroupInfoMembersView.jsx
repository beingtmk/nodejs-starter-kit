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
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import { Name, emptyCover } from "../constants";
import AddInviteModal from "../containers/AddInviteModal";
import { MemberStatus, MemberType } from "../constants";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const SelectOption = Select.Option;
const { TabPane } = Tabs;

const GroupInfoMembersView = ({ group, changeGroupMemberType, match, navigation }) => {
  let gid = 0;
  if (match) {
    gid = match.params.id;
  } else if (navigation) {
    gid = navigation.state.params.id;
  }
  const handleMemberTypeChange = async (e, userEmail) => {
    const { id } = group;
    console.log(e);
    await changeGroupMemberType({ groupId: id, userEmail, type: e });
  };

  let invites = [],
    joinees = [];

    group && group.members && group.members.map((item) => {
    if (item.member) joinees.push(item);
    else invites.push(item);
  });
  console.log("groupComponent", group);
  return (
    <GroupLayout id={gid} path={match && match.path}>
      {(<Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <Row gutter={24}>
            <Col span={12}>
              <Link to={`/group/members-edit/${group && group.id}`}>
                <Button type="primary" icon="usergroup-add" size="large" />
              </Link>
            </Col>
            <Col span={12}>
              <AddInviteModal groupId={group && group.id} />
            </Col>
          </Row>
        }
      >
        <TabPane
          tab={
            <span>
              <Title className='group-members-tabs-heading' level={4}>
                <Icon type="idcard" />
                Registered Users
              </Title>
            </span>
          }
          key="1"
        >
          <Row gutter={24}>
            {joinees.length > 0 ? (
              joinees.map((item) => (
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ marginBottom:'10px' }}
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
                      style={{ display: "block", marginBottom: "20px" }}
                      onChange={(e) => handleMemberTypeChange(e, item.email)}
                    >
                      <SelectOption
                        key={MemberType.ADMIN}
                        value={MemberType.ADMIN}
                      >
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
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Title className='group-members-tabs-heading' level={4}>
                <Icon type="arrow-right" /> Invitees
              </Title>
            </span>
          }
          key="2"
        >
          <Row gutter={24}>
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
          </Row>
        </TabPane>
      </Tabs>)}
    </GroupLayout>
  );
};

GroupInfoMembersView.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default translate("group")(GroupInfoMembersView);
