/* eslint-disable react/display-name */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table, Loading } from "@gqlapp/look-client-react";
import { Popconfirm, Button, message, Tooltip } from "antd";
import settings from "@gqlapp/config";
import InfiniteScroll from "react-infinite-scroll-component";

const { itemsNumber, type } = settings.pagination.web;

class AdminBlogsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.blogs,
      loading: false,
      hasMore: true,
    };
    this.fetchMoreData.bind(this);
  }
  componentDidMount = () => {
    const { blogs } = !this.props.loading && this.props;
    !this.props.loading &&
      this.setState({
        hasMore: blogs.pageInfo.hasNextPage,
        loading: false,
        data: blogs,
      });
  };

  fetchMoreData = async () => {
    this.setState({ loading: true });
    let { data } = this.state;
    const hasMore = this.props.blogs.pageInfo.hasNextPage;
    const endCursor = this.props.blogs.pageInfo.endCursor;
    const totalCount = this.props.blogs.totalCount;
    console.log("called");
    if (!hasMore) {
      console.log("end reached");
      this.setState({ hasMore: false });

      return;
    } else {
      const newData = await this.props.loadData(endCursor + 1, "add");
      this.setState({
        data: newData,
        loading: false,
      });
    }
  };

  render() {
    const { loading, blogs, deleteBlog } = this.props;
    console.log("BLOGS", blogs);

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
        {loading && !blogs ? (
          <Loading text="Loading... " />
        ) : (
          <Fragment>
            <InfiniteScroll
              scrollThreshold={0.9}
              style={{ overflow: "none" }}
              dataLength={this.state.data.totalCount}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
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
                  dataSource={this.state.data.edges}
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
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array,
  deleteBlog: PropTypes.func,
};

export default AdminBlogsComponent;
