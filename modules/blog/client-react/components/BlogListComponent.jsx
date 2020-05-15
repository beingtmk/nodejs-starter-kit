import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Col, Row, Empty, Spin, Divider } from "antd";
import MiniBlogsCardComponent from "./MiniBlogsCardComponent";

class BlogListComponent extends React.Component {
  fetchMoreData = async () => {
    let hasMore = this.props.blogs.pageInfo.hasNextPage;
    const endCursor = this.props.blogs.pageInfo.endCursor;
    if (!hasMore) return;
    await this.props.loadData(endCursor + 1, "add");
  };

  render() {
    const { blogs } = this.props;
    return (
      <Row gutter={32} justify="start" className="blog-list-row">
        <div style={{ marginBottom: "30px", marginLeft: "16px" }}>
          <div align="left">
            <div
              key="line"
              className="title-line-wrapper"
              style={{ width: "150px" }}
              align="left"
            >
              <div className="title-line " />
            </div>
          </div>
        </div>
        {blogs.edges.length > 0 ? (
          <Fragment>
            <InfiniteScroll
              scrollThreshold={0.9}
              style={{ overflow: "none" }}
              dataLength={blogs.edges.length}
              next={this.fetchMoreData}
              hasMore={blogs.pageInfo.hasNextPage}
              loader={
                <div align="center">
                  <Spin />
                </div>
              }
              endMessage={
                <Divider>
                  <p style={{ textAlign: "center", marginTop: "25px" }}>
                    <b>End of Blogs</b>
                  </p>
                </Divider>
              }
              children={blogs.edges.map((item) => (
                <Col xs={24} md={12} lg={8}>
                  <MiniBlogsCardComponent
                    key={item.node.id}
                    moreFlag={false}
                    blog={item.node}
                  />
                </Col>
              ))}
            />
          </Fragment>
        ) : (
          <Empty />
        )}
      </Row>
    );
  }
}

BlogListComponent.propTypes = {
  blogs: PropTypes.array,
  t: PropTypes.func,
};

export default translate("blog")(BlogListComponent);
