import React from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';
import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render(text, record) {
      console.log('e', text, 'record', record);
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
      return (
        <span>
          {'Download'}
          {record &&
            record.node &&
            record.node.resource.map((r, k) => {
              console.log('r', r, 'k', k);
              <a href={r.resourceUrl}>
                <p>{k}</p>
              </a>;
            })}
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      );
    }
  }
];

// const data = [
//   {
//     key: '1',
//     title: 'bleh.png',
//     description: 'This is an image',
//     uploadedAt: '12:30 p.m',
//     uploadedBy: 'John Brown',
//     tags: ['nice', 'developer']
//   },
//   {
//     key: '2',
//     title: 'bleh.png',
//     description: 'This is an image',
//     uploadedAt: '12:30 p.m',
//     uploadedBy: 'John Brown',
//     tags: ['loser']
//   },
//   {
//     key: '3',
//     title: 'bleh.png',
//     description: 'This is an image',
//     uploadedAt: '12:30 p.m',
//     uploadedBy: 'John Brown',
//     tags: ['cool', 'teacher']
//   }
// ];

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ResourcesView = props => {
  const edges = props.resources && props.resources.edges;
  console.log('props', edges);
  return (
    <PageLayout>
      {renderMetaData(props.t)}
      <div className="text-center">
        <p>{props.t('welcomeText')}</p>
      </div>
      <a href="/add-resources">Add a file</a>
      {!props.loading && <Table columns={columns} dataSource={edges} />}
    </PageLayout>
  );
};

ResourcesView.propTypes = {
  t: PropTypes.func,
  resources: PropTypes.array,
  loading: PropTypes.bool,
  edges: PropTypes.array
};

export default ResourcesView;
