import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Divider, Alert, Button, Empty, Typography } from "antd";

import MiniBlogImageComponent from "@gqlapp/blog-client-react/components/MiniBlogImageComponent";

import moment from "moment";
import { Name, emptyCover } from "../constants";

const { Meta } = Card;
const { Title, Text, Paragraph} = Typography;
const GroupComponent = ({ group }) => {
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
        <Title>Group Info</Title>
        <Divider />
        <Card
          cover={
            <div align='center'>
            <img alt='' src={group.avatar}  className='group-info-avatar' />
            </div>
          }
          className="blog-detailview-card"
          style={{position:'relative'}}
          bodyStyle={{ padding: "10px", background:'transparent' }}
        >
          <Title level={2}>
          {group.title}
          </Title>
          <Paragraph>
          {group.description}
          </Paragraph>

          <br />

            <Text>Group Type: <Text mark>{group.groupType}</Text></Text>


          <br />
          <Text>Created At: <Text >{moment(group.createdAt).format(
                "MMM DD, YYYY"
              )}</Text></Text>

          <Link to={`/group/edit/${group.id}`}>
            <Button
              icon="edit"
              type="primary"
              size="small"
              ghost
              style={{ position:'absolute', top:'0', right:'0' }}
            >
              Edit
            </Button>
          </Link>

          {/* <Divider />
            <h1
              style={{
                padding: '0 20px'
              }}
            >
              Members
            </h1>
            <Divider />
            {joinees.length > 0 ? (
              joinees.map(item => (
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Card
                    hoverable
                    cover={
                      <img
                        style={{ height: '200px' }}
                        alt={item.email}
                        src={(item.member.profile && item.member.profile.avatar) || emptyCover}
                      />
                    }
                  >
                    <Meta
                      title={
                        <span
                          style={{
                            fontSize: '15px'
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
                      description={`Added on ${moment(item.createdAt).format('MMM DD, YYYY')}`}
                    />
                    <br />
                    <Alert type="success" message={item.type} />
                  </Card>
                </Col>
              ))
            ) : (
              <Empty />
            )}
            <br />
            <Divider />
            <h1
              style={{
                padding: '0 20px'
              }}
            >
              Invites
            </h1>
            <Divider />
            {invites.length > 0 ? (
              invites.map(item => (
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Card hoverable title={item.email}>
                    <Alert type="warning" message="Invited" />
                  </Card>
                </Col>
              ))
            ) : (
              <Empty />
            )} */}
        </Card>
      </Col>
    </Row>
  );
};

GroupComponent.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default translate("group")(GroupComponent);
