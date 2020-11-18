import React, { Component } from "react";
import { PageLayout } from "@gqlapp/look-client-react";
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
  coverSrc:
    "https://img.freepik.com/free-vector/white-smoke-rings-from-cigarette-pipe-vape_1441-4221.jpg?size=626&ext=jpg&ga=GA1.2.12280400.1601510400",
  avatarSrc:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQV9IZZN1faELpjixZnAeYWoESqnPoIpFiPcw&usqp=CAU",
    avatarTitle: "Yashwanth Sambaraj",
  avatarDescription: "Web Developer STUDENT",
  portfolioSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",  
  portfolioTitle: "Title",
  portfolioDescription: "Description"
  
};

class ProfileView extends Component {
  render() {
    return (
      <PageLayout type="Home">
        {/*Cover photo*/}

        <Card
          className="card-cover"
          cover={<img alt="example" src={userData.coverSrc} />}
        >
          {/*Avatar*/}

          <Row>
            <Avatar
              className="avatar"
              size={160}
              icon="user"
              src={userData.avatarSrc}
            ></Avatar>

            {/*edit and export buttons*/}
            <div className="edit-export-buttons">
              <Button size="large" shape="circle" icon="export" />{" "}
              <Button size="large" type="primary" shape="circle" icon="edit" />
            </div>
          </Row>

          {/*Avatar description*/}
          <Meta title={userData.avatarTitle} description={userData.avatarDescription} />

          <br></br>

          {/*about and socialmedia links*/}
          <Row>
            <Col span={20}>
              <h2 style={{ fontSize: "15px" }}>
                About Me!? Haha U already know!
              </h2>
            </Col>

            <div className="icons-list">
              <Icon type="facebook" /> <Icon type="instagram" />{" "}
              <Icon type="linkedin" /> <Icon type="twitter" />{" "}
              <Icon type="youtube" />
            </div>
          </Row>

          <br></br>

          {/*intrests*/}

          <Divider orientation="left">info</Divider>

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
                cover={
                  <img
                    alt="example"
                    src={userData.portfolioSrc}
                  />
                }
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
               <Meta title={userData.portfolioTitle} description={userData.portfolioDescription} />
              </Card>
            </Col>

            <Col span={7} className="portfolio-col">
              <Card
                className="portfolio-card"
                cover={
                  <img
                    alt="example"
                    src={userData.portfolioSrc}
                  />
                }
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
               <Meta title={userData.portfolioTitle} description={userData.portfolioDescription} />
              </Card>
            </Col>

            <Col span={7} className="portfolio-col">
              <Card
                className="portfolio-card"
                cover={
                  <img
                    alt="example"
                    src={userData.portfolioSrc}
                  />
                }
                actions={[
                  <Icon type="delete" key="delete" />,
                  <Icon type="edit" key="edit" />,
                ]}
              >
                <Meta title={userData.portfolioTitle} description={userData.portfolioDescription} />
              </Card>
            </Col>
          </Row>
        </Card>
      </PageLayout>
    );
  }
}

export default ProfileView;
