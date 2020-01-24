/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Loading } from '@gqlapp/look-client-react';
import { Popconfirm, Button, message, Tooltip } from 'antd';

const AdminBlogsComponent = ({ loading, blogsList, deleteBlog }) => {
  const cancel = () => {
    message.error('Task cancelled');
  };

  const handleDelete = id => {
    return deleteBlog({ id: id });
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
      title: <a href="#">{'Author'}</a>,
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.username.length - b.author.username.length,
      sortDirections: ['descend', 'ascend'],
      render: text => (
        <Tooltip title="See Profile">
          <Link to={`/blog/@${text.username}`}>
            {
              // text.id === currentUser.id ? "You" :
              text.username
            }
          </Link>
        </Tooltip>
      )
    },
    {
      title: <a href="#">{'Model'}</a>,
      dataIndex: 'model',
      key: 'model',
      sorter: (a, b) => a.model.name.length - b.model.name.length,
      sortDirections: ['descend', 'ascend'],
      render: text => <span>{text.name}</span>
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: text => (
        <>
          <Tooltip title="Read">
            {' '}
            <Link to={`/blog/${text}`}>
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
            <Link to={`/blog/edit/${text}`}>
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
              title="Cancel Request?"
              onConfirm={() => handleDelete(text)}
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
      {loading && !blogsList ? (
        <Loading text="Loading... " />
      ) : (
        <Table dataSource={blogsList} columns={columns} title={() => 'List of Blogs'} />
      )}
    </>
  );
};

AdminBlogsComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  blogsList: PropTypes.array,
  deleteBlog: PropTypes.func
  //   currentUser: PropTypes.object
  // t: PropTypes.func
};

export default AdminBlogsComponent;
