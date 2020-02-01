import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Table, Divider, Tag, Button, Menu, Dropdown, Icon } from 'antd';

const download_url = 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/fl_attachment/';

const ResourcesListView = props => {
  const { currentUser } = props;
  const [setErrors] = React.useState([]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render(text, record) {
        const title = record.node && record.node.title;
        return <p>{title}</p>;
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render(text, record) {
        const description = record.node && record.node.description;
        return <p>{description}</p>;
      }
    },
    {
      title: 'Uploaded At',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render(text, record) {
        const uploadedAt = record.node && record.node.createdAt;
        return <p>{uploadedAt}</p>;
      }
    },
    {
      title: 'Uploaded By',
      dataIndex: 'uploadedBy',
      key: 'uploadedBy',
      render(text, record) {
        const uploadedBy = record.node && record.node.uploadedBy;
        return <p>{uploadedBy}</p>;
      }
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render(text, record) {
        const tags = record && record.node && record.node.tags;
        return (
          <span>
            {/* {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })} */}
            {tags && <Tag color="geekblue">{tags.toUpperCase()}</Tag>}
          </span>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render(text, record) {
        const public_id = [];
        record && record.node && record.node.resource.map(file => public_id.push(file.resourceUrl));
        const resourceId = record && record.node && record.node.id;
        const userId = record && record.node && record.node.userId;
        const owner = currentUser.id === userId || currentUser.id === 1 ? true : false;
        const downloads = (
          <Menu>
            {public_id.map((id, i) => {
              return (
                <Menu.Item>
                  <a href={download_url + id}>{'Download' + i}</a>
                </Menu.Item>
              );
            })}
          </Menu>
        );
        return (
          <span>
            {public_id && public_id.length > 1 ? (
              <Dropdown overlay={downloads}>
                <Button color="primary">
                  <Icon type="download" /> <Icon type="down" />
                </Button>
              </Dropdown>
            ) : (
              <Button color="primary">
                {public_id.map(id => {
                  return (
                    <a href={download_url + id}>
                      <Icon type="download" />
                    </a>
                  );
                })}
              </Button>
            )}
            <Divider type="vertical" />
            {console.log('record', record)}
            {owner && (
              <>
                <Link to={`/edit-resource/${resourceId}`}>
                  <Button color="primary">
                    <Icon type="edit" />
                  </Button>
                </Link>
                <Divider type="vertical" />
                <Button color="primary" onClick={() => handleDeleteResource(resourceId)}>
                  <Icon type="delete" />
                </Button>
              </>
            )}
          </span>
        );
      }
    }
  ];

  const handleDeleteResource = async id => {
    const result = await props.deleteResource(id);
    if (result && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors([]);
    }
  };

  const edges = props.resources && props.resources.edges;
  return !props.loading && <Table style={{ overflowX: 'auto' }} columns={columns} dataSource={edges} />;
};

ResourcesListView.propTypes = {
  currentUser: PropTypes.object,
  deleteResource: PropTypes.func,
  resources: PropTypes.object,
  loading: PropTypes.bool,
  edges: PropTypes.array
};

export default ResourcesListView;
