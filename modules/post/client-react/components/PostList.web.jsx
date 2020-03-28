/* eslint-disable react/display-name */

import React, { Fragment } from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Table, Button, Pagination, LayoutCenter, Underline } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => <div className="text-center">{t('post.loadMsg')}</div>;
Loading.propTypes = { t: PropTypes.func };

const NoPostsMessage = ({ t }) => <div className="text-center">{t('post.noPostsMsg')}</div>;
NoPostsMessage.propTypes = { t: PropTypes.func };

const PostList = ({ loading, posts, t, loadData, deletePost }) => {
  const columns = [
    {
      title: t('list.column.title'),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/post/${record.id}`}>{text}</Link>
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 50,
      render: (text, record) => (
        <Button color="primary" size="sm" onClick={() => deletePost(record.id)}>
          {t('post.btn.del')}
        </Button>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = posts;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderPosts = () => (
    <Fragment>
      <Table dataSource={posts.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={posts.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={posts.pageInfo.hasNextPage}
        pagination={type}
        total={posts.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  const renderContent = () => (
    <>
      <h2>{t('list.subTitle')}</h2>
      <Underline length="100px" />
      <Link to="/post/new">
        <Button color="primary">{t('list.btn.add')}</Button>
      </Link>
      {/* Render loader */}
      {loading && !posts && <Loading t={t} />}
      {/* Render main post content */}
      {posts && posts.totalCount ? <RenderPosts /> : <NoPostsMessage t={t} />}
    </>
  );

  return (
    <PageLayout>
      {/* Render metadata */}
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          <Helmet
            title={`${settings.app.name} - ${t('list.title')}`}
            meta={[
              {
                name: 'description',
                content: `${settings.app.name} - ${t('list.meta')}`
              }
            ]}
          />
          <Grid.Box sm={{ hidden: 'true' }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

PostList.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.object,
  deletePost: PropTypes.func.isRequired,
  loadData: PropTypes.func,
  t: PropTypes.func
};

export default translate('post')(PostList);
