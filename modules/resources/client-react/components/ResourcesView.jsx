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
    render(text) {
      return <a>{text}</a>;
    }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Uploaded At',
    dataIndex: 'uploadedAt',
    key: 'uploadedAt'
  },
  {
    title: 'Uploaded By',
    dataIndex: 'uploadedBy',
    key: 'uploadedBy'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render(tags) {
      return (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      );
    }
  },
  {
    title: 'Action',
    key: 'action',
    render() {
      // text, record
      return (
        <span>
          <a>Download</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      );
    }
  }
];
const data = [
  {
    key: '1',
    title: 'bleh.png',
    description: 'This is an image',
    uploadedAt: '12:30 p.m',
    uploadedBy: 'John Brown',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    title: 'bleh.png',
    description: 'This is an image',
    uploadedAt: '12:30 p.m',
    uploadedBy: 'John Brown',
    tags: ['loser']
  },
  {
    key: '3',
    title: 'bleh.png',
    description: 'This is an image',
    uploadedAt: '12:30 p.m',
    uploadedBy: 'John Brown',
    tags: ['cool', 'teacher']
  }
];

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ResourcesView = ({ t }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="text-center">
        <p>{t('welcomeText')}</p>
      </div>
      <a href="/add-resources">Add a file</a>
      <Table columns={columns} dataSource={data} />
    </PageLayout>
  );
};

ResourcesView.propTypes = {
  t: PropTypes.func
};

export default ResourcesView;
