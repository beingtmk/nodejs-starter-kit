import React, { Component } from "react";
import PropTypes from "prop-types";

import { PageLayout, Tooltip } from "@gqlapp/look-client-react";
import { Avatar, Card, Button, Divider, Icon, Row, Col } from "antd";
const { Meta } = Card;

class ProfileView extends Component {
  render() {
    const user = this.props.user;

    return (
      <PageLayout type="home">
        {/*Cover photo*/}

        <Card
          cover={
            <div
              className="profile-view-card-cover"
              style={{ backgroundImage: `url("${user.profile.cover}")` }}
            />
          }
          className="profile-view-card-style"
          bodyStyle={{
            maxWidth: "1200px",
            margin: "auto",
            position: "inherit",
            paddingTop: "104px",
          }}
        >
          {/*Avatar*/}

          <Avatar
            className="profile-view-avatar"
            size={160}
            icon="user"
            src={user.profile.avatar}
          />

          {/*Avatar description*/}
          <Meta
            title={
              <h2>
                {user.profile && user.profile.firstName && user.profile.lastName
                  ? user.profile.firstName + " " + user.profile.lastName
                  : "No Name Provided"}
              </h2>
            }
            //description={<h4>{`${user.skillDisplay.skill || ""} ${user.userType.type}`}</h4>}
          />

          <br />

          {/*edit and export buttons*/}
          <div className="profile-view-edit-export-buttons">
            <Tooltip title="View Your Public Profile">
              <Button
                className="profile-view-export-button"
                size="large"
                type="primary"
                shape="circle-outline"
                ghost
              >
                <Icon type="export" />
              </Button>
            </Tooltip>

            <Button size="large" type="primary" shape="circle-outline">
              <Icon type="edit" />
            </Button>
          </div>

          {/*about and socialmedia links*/}
          <Row gutter={24}>
            <Col xs={24} md={16}>
              <div className="profile-view-user-about">
                About Me!? Haha U already know!
              </div>
            </Col>
            {/*}
            <Col md={8} xs={24}>
              <Col span={4}>
                <a href={this.props && user.facebook}>
                  <Icon className="profile-view-social-icons" type="facebook" />
                </a>
              </Col>

              <Col span={4}>
                <a href={this.props && user.instagram}>
                  <Icon
                    className="profile-view-social-icons"
                    type="instagram"
                  />
                </a>
              </Col>

              <Col span={4}>
                <a href={this.props && user.linkedin}>
                  <Icon className="profile-view-social-icons" type="linkedin" />
                </a>
              </Col>

              <Col span={4}>
                <a href={this.props && user.twitter}>
                  <Icon className="profile-view-social-icons" type="twitter" />
                </a>
              </Col>

              <Col span={4}>
                <a href={this.props && user.youtube}>
                  <Icon className="profile-view-social-icons" type="youtube" />
                </a>
              </Col>
            </Col>
*/}
          </Row>

          <Divider orientation="left" style={{ marginTop: "20px" }}>
            info
          </Divider>

          {/*   
       <Descriptions>
            <Descriptions.Item label="❤ Loves">-&gt; No One</Descriptions.Item>
          </Descriptions>

          <Descriptions>
            <Descriptions.Item label="🔰 Lives in">
              -&gt; Hyderabad
            </Descriptions.Item>
          </Descriptions>

          <Descriptions>
            <Descriptions.Item label="🏙 Owner of">
              -&gt; My mind
            </Descriptions.Item>
          </Descriptions>

          <Descriptions>
            <Descriptions.Item label="💬 Speaks">
              -&gt; Telugu,Hindi,English
            </Descriptions.Item>
          </Descriptions>

          <Divider></Divider>

         

          <Row>
            <Col span={20}>
              <h2 className="profile-view-portfolio-name">Portfolio</h2>
            </Col>

            <div className="profile-view-portfolio-add-button">
              <Button>
                <Icon type="plus" />
              </Button>
            </div>
          </Row>

          <br />
          <br />

         

          <Row className="profile-view-portfolios">
            <Col span={7} className="profile-view-portfolio-col">
              <Card
                className="profile-view-portfolio-card"
                cover={<img alt="example" src={user.portfolio} />}
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta
                  title={user.portfolioTitle}
                  description={user.portfolioDescription}
                />
              </Card>
            </Col>

            <Col span={7} className="profile-view-portfolio-col">
              <Card
                className="profile-view-portfolio-card"
                cover={<img alt="example" src={user.portfolio} />}
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta
                  title={user.portfolioTitle}
                  description={user.portfolioDescription}
                />
              </Card>
            </Col>

            <Col span={7} className="profile-view-portfolio-col">
              <Card
                className="profile-view-portfolio-card"
                cover={<img alt="example" src={user.portfolio} />}
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta
                  title={user.portfolioTitle}
                  description={user.portfolioDescription}
                />
              </Card>
            </Col>
          </Row>
*/}
        </Card>
      </PageLayout>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    role: PropTypes.string,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      cover: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }),
};

export default ProfileView;
