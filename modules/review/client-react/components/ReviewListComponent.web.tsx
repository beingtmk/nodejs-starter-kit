/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import {
  EditIcon,
  Table,
  EmptyComponent,
  Pagination,
  DeleteIcon,
  Divider,
  Button,
  RenderTableLoading
} from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import { Reviews, Review } from '../containers/Reviews.web';
import ROUTES from '../routes/index';
import { displayDataCheck } from '@gqlapp/listing-client-react';

const { itemsNumber, type } = settings.pagination.web;

export interface ReviewListComponentProps {
  loading: boolean;
  loadData: (cursor: number, action: string) => boolean;
  reviews: Reviews;
  orderBy: {
    column: string;
    order: string;
  };
  onReviewsOrderBy: ({ column, order }: { column: string; order: string }) => null;
  deleteReview: (id: number) => boolean;
  t: TranslateFunction;
  history: object;
}

const ReviewListComponent: React.FC<ReviewListComponentProps> = props => {
  const { orderBy, onReviewsOrderBy, loading, reviews, t, loadData, deleteReview } = props;

  const renderOrderByArrow = (name: string) => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };
  const handleOrderBy = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, name: string) => {
    e.preventDefault();
    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onReviewsOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onReviewsOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a
          // onClick={e => handleOrderBy(e, "owner")}
          href="#"
        >
          {t('adminPanel.list.column1')}
          {/* {renderOrderByArrow("owner")} */}
        </a>
      ),
      dataIndex: 'owner',
      key: 'owner',
      width: 100,
      render: (text: string, record: Review) => (
        <Link to={`/public-profile/${record && record.user && record.user.id}`}>
          {record && record.user && displayDataCheck(record.user.username)}
        </Link>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'rating')} href="#">
          {t('adminPanel.list.column2')} &nbsp;
          {renderOrderByArrow('rating')}
        </a>
      ),
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (text: string) => <div>{displayDataCheck(text)}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'feedback')} href="#">
          {t('adminPanel.list.column3')}&nbsp;
          {renderOrderByArrow('feedback')}
        </a>
      ),
      dataIndex: 'feedback',
      key: 'feedback',
      width: 800,
      render: (text: string) => <div>{displayDataCheck(text)}</div>
    },
    {
      title: t('adminPanel.list.column4'),
      key: 'actions',
      width: 200,
      render: (text: string, record: Review) => (
        <div>
          <Link className="review-link" to={`${ROUTES.editLink}/${record.id}`}>
            <EditIcon />
          </Link>
          <Divider type="vertical" />
          <DeleteIcon onClick={() => deleteReview(record.id)} />
        </div>
      )
    }
  ];

  const handlePageChange = (pagination: string, pageNumber: number) => {
    const {
      pageInfo: { endCursor }
    } = reviews;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderReviews = () => (
    <Fragment>
      <Table dataSource={reviews.edges.map(({ node }: { node: Review }) => node)} columns={columns} />
      <hr />
      <br />
      <div align="center">
        <Pagination
          itemsPerPage={reviews.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={reviews.pageInfo.hasNextPage}
          pagination={type}
          total={reviews.totalCount}
          loadMoreText={t('adminPanel.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
      <br />
    </Fragment>
  );

  return (
    <div style={{ overflowY: 'auto', minHeight: '100vh', position: 'relative' }}>
      {/* Render loader */}
      {loading && <RenderTableLoading columns={columns} />}
      {/* Render main review content */}
      {reviews && reviews.totalCount ? (
        <RenderReviews />
      ) : (
        <EmptyComponent description={t('adminPanel.noReviewsMsg')} emptyLink={`${ROUTES.add}`} />
      )}
    </div>
  );
};

export default translate('review')(ReviewListComponent);
