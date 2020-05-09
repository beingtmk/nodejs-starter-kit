import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";

import { Col, Row } from "antd";
import MiniBlogsCardComponent from "./MiniBlogsCardComponent";

const BlogListComponent = ({ moreBlogs }) => {
  return (
    <Row gutter={32} justify="start" className="blog-list-row">
      <div style={{ marginBottom: "30px", marginLeft: "16px" }}>
        <h1 style={{ fontSize: "32px" }}>Blogs</h1>

        <div align="left">
          <div
            key="line"
            className="title-line-wrapper"
            style={{ width: "150px" }}
            align="left"
          >
            <div
              className="title-line "
              // style={{ transform: "translateX(-64px)" }}
            />
          </div>
        </div>
      </div>
      {/* <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 20, offset: 2 }}
      > */}
      {/* <h1>
          <strong>Blogs</strong>
          <br />
          <br />
        </h1> */}
      {/* <Row gutter={32}> */}
      {moreBlogs.map((item) => (
        <Col xs={24} md={12} lg={8}>
          <MiniBlogsCardComponent key={item.id} moreFlag={false} blog={item} />
        </Col>
      ))}
      {/* </Row> */}
      {/* </Col> */}
    </Row>
  );
};

BlogListComponent.propTypes = {
  moreBlogs: PropTypes.array,
  t: PropTypes.func,
};

export default translate("blog")(BlogListComponent);
