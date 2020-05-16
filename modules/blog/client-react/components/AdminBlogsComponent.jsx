/* eslint-disable react/display-name */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table, Loading } from "@gqlapp/look-client-react";
import { Popconfirm, Button, message, Tooltip, Spin, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

class AdminBlogsComponent extends React.Component {
  fetchMoreData = async () => {
    let hasMore = this.props.blogs.pageInfo.hasNextPage;
    const endCursor = this.props.blogs.pageInfo.endCursor;
    if (!hasMore) return;
    await this.props.loadData(endCursor + 1, "add");
  };

  render() {
    const { blogs, deleteBlog, blogLoading } = this.props;

    const cancel = () => {
      message.error("Task cancelled");
    };

    const columns = [
      {
        title: <a href="#">{"Id"}</a>,
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: <a href="#">{"Title"}</a>,
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.length - b.title.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: <a href="#">{"Author"}</a>,
        dataIndex: "author",
        key: "author",
        sorter: (a, b) => a.author.username.length - b.author.username.length,
        sortDirections: ["descend", "ascend"],
        render: (text) => (
          <Tooltip title="See Profile">
            <Link to={`/blog/@${text.username}`}>
              {
                // text.id === currentUser.id ? "You" :
                text.username
              }
            </Link>
          </Tooltip>
        ),
      },
      {
        title: <a href="#">{"Model"}</a>,
        dataIndex: "model",
        key: "model",
        sorter: (a, b) => a.model.name.length - b.model.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: "Actions",
        dataIndex: "id",
        key: "actions",
        render: (text) => (
          <>
            <Tooltip title="Read">
              {" "}
              <Link to={`/blog/${text}`}>
                <Button
                  shape="circle"
                  icon="eye"
                  type="primary"
                  size="small"
                  style={{ marginBottom: "10px", marginRight: "3px" }}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Edit">
              <Link to={`/blog/edit/${text}`}>
                <Button
                  shape="circle"
                  icon="edit"
                  type="primary"
                  size="small"
                  style={{ marginBottom: "10px", marginRight: "3px" }}
                  ghost
                />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete blog?"
                onConfirm={() => deleteBlog(text)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  shape="circle"
                  icon="delete"
                  type="danger"
                  size="small"
                  style={{ marginBottom: "10px", marginRight: "3px" }}
                />
              </Popconfirm>
            </Tooltip>
          </>
        ),
      },
    ];

    return (
      <>
        {blogLoading && !blogs ? (
          <Loading text="Loading... " />
        ) : (
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
              children={
                <Table
                  dataSource={blogs.edges.map(({ node }) => node)}
                  columns={columns}
                />
              }
            />
          </Fragment>
        )}
      </>
    );
  }
}

AdminBlogsComponent.propTypes = {
  blogLoading: PropTypes.bool.isRequired,
  blogs: PropTypes.object,
  deleteBlog: PropTypes.func,
};

export default AdminBlogsComponent;
