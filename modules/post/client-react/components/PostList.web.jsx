/* eslint-disable react/display-name */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import {
  PageLayout,
  Table,
  Pagination,
  DeleteIcon,
  AddButton,
  Row,
  Col,
  Heading,
  MetaTags
} from '@gqlapp/look-client-react';
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
      width: 100,
      render: (text, record) => (
        <DeleteIcon onClick={() => deletePost(record.id)}>{/* {t('post.btn.del')} */}</DeleteIcon>
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
      <Row>
        <Col span={12}>
          <Heading type="2">{t('list.subTitle')}</Heading>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Link to="/post/new">
              <AddButton color="primary">{t('list.btn.add')}</AddButton>
            </Link>
          </Row>
        </Col>
      </Row>
      <br />
      {/* Render loader */}
      {loading && !posts && <Loading t={t} />}
      {/* Render main post content */}
      {posts && posts.totalCount ? <RenderPosts /> : <NoPostsMessage t={t} />}
    </>
  );

  return (
    <PageLayout>
      <MetaTags title={t('list.title')} description={t('list.meta')} />
      {renderContent()}
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
