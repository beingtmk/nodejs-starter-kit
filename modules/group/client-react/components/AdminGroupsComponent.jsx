/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Loading } from '@gqlapp/look-client-react';
import { Popconfirm, Button, message, Tooltip, Spin, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

class AdminGroupsComponent extends React.Component {
  fetchMoreData = async () => {
    let hasMore = this.props.groups.pageInfo.hasNextPage;
    const endCursor = this.props.groups.pageInfo.endCursor;
    if (!hasMore) return;
    await this.props.loadData(endCursor + 1, 'add');
  };

  render() {
    const { groups, deleteGroup, groupLoading } = this.props;
    const cancel = () => {
      message.error('Task cancelled');
    };

    const columns = [
      {
        title: <a href="#">{'Id'}</a>,
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: <a href="#">{'Title'}</a>,
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: <a href="#">{'Description'}</a>,
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        render: text => <span>{text}</span>
      },
      {
        title: <a href="#">{'Type'}</a>,
        dataIndex: 'groupType',
        key: 'groupType',
        sorter: (a, b) => a.groupType.length - b.groupType.length,
        sortDirections: ['descend', 'ascend'],
        render: text => <span>{text}</span>
      },
      {
        title: <a href="#">{'No of Members'}</a>,
        dataIndex: 'members',
        key: 'members',
        sorter: (a, b) => a.members.filter(item => item.member).length - b.members.filter(item => item.member).length,
        sortDirections: ['descend', 'ascend'],
        render: text => text.filter(item => item.member).length
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'actions',
        render: text => (
          <>
            <Tooltip title="Details">
              <Link to={`/group/${text}`}>
                <Button
                  shape="circle"
                  icon="eye"
                  type="primary"
                  size="small"
                  style={{ marginBottom: '10px', marginRight: '3px' }}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Edit">
              <Link to={`/group/edit/${text}`}>
                <Button
                  shape="circle"
                  icon="edit"
                  type="primary"
                  size="small"
                  style={{ marginBottom: '10px', marginRight: '3px' }}
                  ghost
                />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete group?"
                onConfirm={() => deleteGroup(text)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  shape="circle"
                  icon="delete"
                  type="danger"
                  size="small"
                  style={{ marginBottom: '10px', marginRight: '3px' }}
                />
              </Popconfirm>
            </Tooltip>
          </>
        )
      }
    ];

    return (
      <>
        {groupLoading && !groups ? (
          <Loading text="Loading... " />
        ) : (
          <Fragment>
            <InfiniteScroll
              scrollThreshold={0.9}
              style={{ overflow: 'none' }}
              dataLength={groups.edges.length}
              next={this.fetchMoreData}
              hasMore={groups.pageInfo.hasNextPage}
              loader={
                <div align="center">
                  <Spin />
                </div>
              }
              endMessage={
                <Divider>
                  <p style={{ textAlign: 'center', marginTop: '25px' }}>
                    <b>End of Groups</b>
                  </p>
                </Divider>
              }
            >
              <Table dataSource={groups.edges.map(({ node }) => node)} columns={columns} />
            </InfiniteScroll>
          </Fragment>
        )}
      </>
    );
  }
}

AdminGroupsComponent.propTypes = {
  groupLoading: PropTypes.bool.isRequired,
  groups: PropTypes.object,
  loadData: PropTypes.object,
  deleteGroup: PropTypes.func
};

export default AdminGroupsComponent;
