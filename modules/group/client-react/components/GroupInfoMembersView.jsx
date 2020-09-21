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
import AddMembersFromParentGroup from "../containers/AddMembersFromParentGroup";
import MembersCard from "./MembersCard";
import { MemberStatus, MemberType } from "@gqlapp/group-common";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const SelectOption = Select.Option;
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;

const GroupInfoMembersView = ({
  group,
  changeGroupMemberType,
  match,
  navigation,
}) => {
  let gid = 0;
  if (match) {
    gid = match.params.id;
  } else if (navigation) {
    gid = navigation.state.params.id;
  }

  let invites = [],
    joinees = [];

  group &&
    group.members &&
    group.members.map((item) => {
      if (item.member) joinees.push(item);
      else invites.push(item);
    });
  return (
    <GroupLayout id={gid} path={match && match.path}>
      {
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Title className="group-members-tabs-heading" level={4}>
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
                    <MembersCard
                      changeGroupMemberType={changeGroupMemberType}
                      item={item}
                    />
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
                <Title className="group-members-tabs-heading" level={4}>
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
          <TabPane
            tab={
              <span>
                <Title className="group-members-tabs-heading" level={4}>
                  <Icon type="plus" /> Add Members
                </Title>
              </span>
            }
            key="3"
          >
            <Button.Group size="large">
              <Button
                type="primary"
                href={`/group/members-edit/${group && group.id}`}
                icon="usergroup-add"
                size="large"
              >
                Manage Multiple
              </Button>

              <AddInviteModal groupId={group && group.id} />
            </Button.Group>
            {group && group.groupId && (
              <>
                <AddMembersFromParentGroup childGroup={group} />
              </>
            )}
          </TabPane>
        </Tabs>
      }
    </GroupLayout>
  );
};

GroupInfoMembersView.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default translate("group")(GroupInfoMembersView);
