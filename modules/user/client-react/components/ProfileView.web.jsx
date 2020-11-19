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
const userData = {
  avatarSrc:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQV9IZZN1faELpjixZnAeYWoESqnPoIpFiPcw&usqp=CAU",
  avatarTitle: "Yashwanth Sambaraj",
  avatarDescription: "Web Developer STUDENT",
  portfolioSrc:
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  portfolioTitle: "Title",
  portfolioDescription: "Description",
};

class ProfileView extends Component {
  render() {
    return (
      <PageLayout type="Home">
        {/*Cover photo*/}

        <Card
          cover={<div className="card-cover"></div>}
          className="card-style"
          bodyStyle={{
            maxWidth: "1200px",
            margin: "auto",
            position: "inherit",
            paddingTop: "104px",
          }}
        >
          {/*Avatar*/}

          <Avatar
            className="avatar"
            size={160}
            icon="user"
            src={userData.avatarSrc}
          />

          {/*Avatar description*/}
          <Meta
            title={<h2>{userData.avatarTitle}</h2>}
            description={<h4>{userData.avatarDescription}</h4>}
          />

          <br />

          {/*edit and export buttons*/}
          <div className="edit-export-buttons">
            <Tooltip title="View Your Public Profile">
              <Button
                className="export-button"
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
              <div className="profile-about">
                About Me!? Haha U already know!
              </div>
            </Col>

            <Col md={8} xs={24}>
              <Col span={4}>
                <a>
                  <Icon className="social-icons" type="facebook" />
                </a>
              </Col>

              <Col span={4}>
                <a>
                  <Icon className="social-icons" type="instagram" />
                </a>
              </Col>

              <Col span={4}>
                <a>
                  <Icon className="social-icons" type="linkedin" />
                </a>
              </Col>

              <Col span={4}>
                <a>
                  <Icon className="social-icons" type="twitter" />
                </a>
              </Col>

              <Col span={4}>
                <a>
                  <Icon className="social-icons" type="youtube" />
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
              <h2 className="portfolio-name">Portfolio</h2>
            </Col>

            <div className="portfolio-add-button">
              <Button>
                <Icon type="plus" />
              </Button>
            </div>
          </Row>

          <br />
          <br />

          {/*portfolios*/}

          <Row className="portfolios">
            <Col span={7} className="portfolio-col">
              <Card
                className="portfolio-card"
                cover={<img alt="example" src={userData.portfolioSrc} />}
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta
                  title={userData.portfolioTitle}
                  description={userData.portfolioDescription}
                />
              </Card>
            </Col>

            <Col span={7} className="portfolio-col">
              <Card
                className="portfolio-card"
                cover={<img alt="example" src={userData.portfolioSrc} />}
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta
                  title={userData.portfolioTitle}
                  description={userData.portfolioDescription}
                />
              </Card>
            </Col>

            <Col span={7} className="portfolio-col">
              <Card
                className="portfolio-card"
                cover={<img alt="example" src={userData.portfolioSrc} />}
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta
                  title={userData.portfolioTitle}
                  description={userData.portfolioDescription}
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
