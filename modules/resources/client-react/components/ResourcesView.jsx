import React from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';
import { Table, Divider, Tag, Button, Menu, Dropdown, Icon } from 'antd';

const download_url = 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/fl_attachment/';

const ResourcesView = props => {
  const [setErrors] = React.useState([]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render(text, record) {
        // console.log('e', text, 'record', record);
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
        record && record.node && record.node.resource.map(file => public_id.push(file.resourceUrl)),
          console.log('public_id', public_id);
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
        console.log('downloads', downloads);
        return (
          <span>
            {public_id && public_id.length > 1 ? (
              <Dropdown overlay={downloads}>
                <Button color="primary">
                  Downloads <Icon type="down" />
                </Button>
              </Dropdown>
            ) : (
              <Button color="primary">
                {public_id.map(id => {
                  return <a href={download_url + id}>{'Download'}</a>;
                })}
              </Button>
            )}
            <Divider type="vertical" />

            <Button color="primary" onClick={() => handleDeleteUser(record && record.node && record.node.id)}>
              {'Delete'}
            </Button>
          </span>
        );
      }
    }
  ];

  const renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
  );

  const handleDeleteUser = async id => {
    const result = await props.deleteResource(id);
    if (result && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors([]);
    }
  };

  const edges = props.resources && props.resources.edges;
  return (
    <PageLayout>
      {renderMetaData(props.t)}
      <a href="/add-resources">Add a file</a>
      {!props.loading && <Table columns={columns} dataSource={edges} />}
    </PageLayout>
  );
};

ResourcesView.propTypes = {
  t: PropTypes.func,
  deleteResource: PropTypes.func,
  resources: PropTypes.object,
  loading: PropTypes.bool,
  edges: PropTypes.array
};

export default ResourcesView;
