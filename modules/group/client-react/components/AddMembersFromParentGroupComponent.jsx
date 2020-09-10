/* eslint-disable react/display-name */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table, Loading } from "@gqlapp/look-client-react";
import {
  Popconfirm,
  Button,
  message,
  Tooltip,
  Spin,
  Divider,
  Typography,
} from "antd";
// import InfiniteScroll from 'react-infinite-scroll-component';
import { MemberStatus, MemberType } from "@gqlapp/group-common";
import { Name } from "../constants";

const { Title, Text, Paragraph } = Typography;

class AddMembersFromParentGroupComponent extends React.Component {
  state = {
    selectedRows: [], // Check here to configure the default column
  };

  addUser = async (e) => {
    const { addGroupMember, childGroup } = this.props;
    console.log(e);
    const input = {
      email: e,
      groupId: childGroup.id,
      type: MemberType.MEMBER,
      status: MemberStatus.ADDED,
    };
    addGroupMember(input);
  };

  addUsers = async () => {
    const { selectedRows } = this.state;
    const { addGroupMembers, childGroup } = this.props;
    const input = {
      groupId: childGroup.id,
      members: selectedRows.map((sR) => {
        return {
          email: sR.email,
          groupId: childGroup.id,
          type: MemberType.MEMBER,
          status: MemberStatus.ADDED,
        };
      }),
    };
    console.log(input);
    addGroupMembers(input);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRows changed: ", selectedRows);
    this.setState({ selectedRows });
  };

  render() {
    const { groupLoading, onlyInParentGroup } = this.props;
    const { selectedRows } = this.state;
    const rowSelection = {
      selectedRows,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRows.length > 0;

    const columns = [
      {
        title: <a href="#">{"Email"}</a>,
        dataIndex: "email",
        key: "email",
      },
      {
        title: <a href="#">{"username"}</a>,
        dataIndex: "username",
        key: "username",
        render: (text, record) => (
          <>{record && record.member && record.member.username}</>
        ),
      },
      {
        title: <a href="#">{"Name"}</a>,
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <>{Name(record && record.member && record.member.profile)}</>
        ),
      },
      // {
      //   title: <a href="#">{'Type'}</a>,
      //   dataIndex: 'groupType',
      //   key: 'groupType',
      //   render: text => <span>{text}</span>
      // },
      // {
      //   title: <a href="#">{'Members'}</a>,
      //   dataIndex: 'members',
      //   key: 'members',
      //   render: text => {
      //     let mem = text.filter(item => item.member);
      //     return (
      //       <div>
      //         <strong>{mem.some(item => item.member.id === currentUser.id) ? 'You' : mem && mem.length !==0 && mem[0].member.username}</strong>
      //         {mem.length > 1 ? <span>{` and ${mem.length - 1} other${mem.length === 2 ? '' : 's'}`}</span> : null}
      //       </div>
      //     );
      //   }
      // },
      {
        title: "Actions",
        dataIndex: "id",
        key: "actions",
        render: (text, record) => (
          <Button
            icon="import"
            type="primary"
            size="medium"
            style={{ marginBottom: "10px", marginRight: "3px" }}
            ghost
            onClick={() => this.addUser(record.email)}
          >
            Import
          </Button>
        ),
      },
    ];

    return (
      <>
        {groupLoading ? (
          <Loading text="Loading... " />
        ) : (
          <Fragment>
            {/* <InfiniteScroll
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
            </InfiniteScroll> */}
            <Divider />
            <Title level={4}>...Or Select from Parent Group</Title>
            {hasSelected && (
              <Button
                size="large"
                type="primary"
                style={{ marginBottom: "24px" }}
                onClick={this.addUsers}
              >
                Import Selected {selectedRows.length}
              </Button>
            )}
            <div style={{ width: "100%", overflowX: "scroll" }}>
              <Table
                rowSelection={rowSelection}
                dataSource={onlyInParentGroup.map((node) => node)}
                columns={columns}
              />
            </div>
          </Fragment>
        )}
      </>
    );
  }
}

AddMembersFromParentGroupComponent.propTypes = {
  groupLoading: PropTypes.bool.isRequired,
  groups: PropTypes.object,
  loadData: PropTypes.object,
  currentUser: PropTypes.object,
  deleteGroup: PropTypes.func,
};

export default AddMembersFromParentGroupComponent;
