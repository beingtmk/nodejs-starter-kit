import React, { Component } from "react";

import { PageLayout, Tooltip } from "@gqlapp/look-client-react";
import {
  Avatar,
  Card,
  Button,
  Divider,
  Descriptions,
  Icon,
  Row,
  Col,
} from "antd";
const { Meta } = Card;

const user = {
  coverSrc:
    "https://res.cloudinary.com/dpvrqxttb/image/upload/v1604566920/edgenus/image/nkzfil4lqjf556ipjwi5.png",
  avatarSrc:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQV9IZZN1faELpjixZnAeYWoESqnPoIpFiPcw&usqp=CAU",
  username: "username",
  avatarTitle: {
    firstName: "Yashwanth",
    lastName: "Sambaraj",
  },
  userType: {
    type: "STUDENT",
  },
  skillDisplay: {
    skill: "Web Developer",
  },
  facebook: "https://www.facebook.com",
  instagram: "https://www.instagram.com",
  linkedin: "https://www.linkedin.com",
  twitter: "https://www.twitter.com",
  youtube: "https://www.youtube.com",
  portfolioSrc:
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  portfolioTitle: "Title",
  portfolioDescription: "Description",
};

class ProfileView extends Component {
  render() {
    return (
      <PageLayout type="home">
        {/*Cover photo*/}

        <Card
          cover={
            <div
              className="profile-view-card-cover"
              style={{ backgroundImage: `url(${user.coverSrc})` }}
            ></div>
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
            src={user.avatarSrc}
          />

          {/*Avatar description*/}
          <Meta
            title={
              <h2>
                {user.avatarTitle &&
                user.avatarTitle.firstName &&
                user.avatarTitle.lastName
                  ? user.avatarTitle.firstName + " " + user.avatarTitle.lastName
                  : "No Name Provided"}
              </h2>
            }
            description={
              <h4>{`${user.skillDisplay.skill || ""} ${
                user.userType.type
              }`}</h4>
            }
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
              <div className="profile-view-profile-about">
                About Me!? Haha U already know!
              </div>
            </Col>

            <Col md={8} xs={24}>
              <Col span={4}>
                <a href={user && user.facebook}>
                  <Icon className="profile-view-social-icons" type="facebook" />
                </a>
              </Col>

              <Col span={4}>
                <a href={user && user.instagram}>
                  <Icon
                    className="profile-view-social-icons"
                    type="instagram"
                  />
                </a>
              </Col>

              <Col span={4}>
                <a href={user && user.linkedin}>
                  <Icon className="profile-view-social-icons" type="linkedin" />
                </a>
              </Col>

              <Col span={4}>
                <a href={user && user.twitter}>
                  <Icon className="profile-view-social-icons" type="twitter" />
                </a>
              </Col>

              <Col span={4}>
                <a href={user && user.youtube}>
                  <Icon className="profile-view-social-icons" type="youtube" />
                </a>
              </Col>
            </Col>
          </Row>

          <Divider orientation="left" style={{ marginTop: "20px" }}>
            info
          </Divider>
          {/*intrests*/}

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

          {/*Portfolio and add button*/}

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

          {/*portfolios*/}

          <Row className="profile-view-portfolios">
            <Col span={7} className="profile-view-portfolio-col">
              <Card
                className="profile-view-portfolio-card"
                cover={<img alt="example" src={user.portfolioSrc} />}
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
                cover={<img alt="example" src={user.portfolioSrc} />}
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
                cover={<img alt="example" src={user.portfolioSrc} />}
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
        </Card>
      </PageLayout>
    );
  }
}

export default ProfileView;
