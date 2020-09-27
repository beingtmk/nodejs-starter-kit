import React, { Component } from "react";
import { Skeleton, Table } from "antd";

const RenderTableLoading = ({ rows, columns }) => {
  const loadingColumn = {
    title: <a href="#">{"..."}</a>,
    dataIndex: "id",
    key: "id",
    // sorter: (a, b) => a.id - b.id,
    // sortDirections: ["descend", "ascend"],
    render: (text, record) => (
      <>
        <Skeleton paragraph={{ rows: 0 }} active />
      </>
    ),
  };

  return (
    <Table
      dataSource={[...Array(rows).keys()]}
      columns={[...Array(columns).keys()].map(() => {
        return loadingColumn;
      })}
    />
  );
};


export default RenderTableLoading;
