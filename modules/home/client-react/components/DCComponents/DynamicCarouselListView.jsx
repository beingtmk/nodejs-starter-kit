/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Table,
  Pagination,
  EditIcon,
  DeleteIcon,
  EmptyComponent,
  RenderTableLoading,
  Divider
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { displayDataCheck } from '@gqlapp/listing-client-react';

import ROUTES from '../../routes';

const { itemsNumber, type } = settings.pagination.web;

const DynamicCarouselListView = props => {
  const { loading, t, orderBy, onDynamicCarouselOrderBy, deleteDynamicCarousel, dynamicCarousels, loadData } = props;
  const renderOrderByArrow = name => {
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
  const handleOrderBy = (e, name) => {
    e.preventDefault();
    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onDynamicCarouselOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onDynamicCarouselOrderBy({ column: name, order });
  };
  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          {t('dynamicCarousel.columns.carouselId')}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <>{record.id}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          {t('dynamicCarousel.columns.title')}
          {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <>{record.title}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'image')} href="#">
          {t('dynamicCarousel.columns.image')}
          {renderOrderByArrow('image')}
        </a>
      ),
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => (
        <>
          <img src={record.imageUrl} width="200px" />
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'label')} href="#">
          {t('dynamicCarousel.columns.label')}
          {renderOrderByArrow('label')}
        </a>
      ),
      dataIndex: 'label',
      key: 'label',
      render: (text, record) => <>{displayDataCheck(record.label)}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'link')} href="#">
          {t('dynamicCarousel.columns.link')}
          {renderOrderByArrow('link')}
        </a>
      ),
      dataIndex: 'link',
      key: 'link',
      render: (text, record) => <>{displayDataCheck(record.link)}</>
    },
    {
      title: t('dynamicCarousel.columns.actions'),
      key: 'actions',
      render: (text, record) => (
        <div align="center">
          <Link to={`${ROUTES.editLink}${record.id}`}>
            <EditIcon shape="circle" size="large" />
          </Link>
          <Divider type="vertical" />
          <DeleteIcon onClick={() => deleteDynamicCarousel(record.id)} title="Are you sure delete this listing?" />
        </div>
      )
    }
  ];
  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = dynamicCarousels;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };
  const RenderDynamicCarousels = () => (
    <Fragment>
      <Table dataSource={dynamicCarousels.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={dynamicCarousels.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={dynamicCarousels.pageInfo.hasNextPage}
        pagination={type}
        total={dynamicCarousels.totalCount}
        loadMoreText="Load more"
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <div style={{ overflowY: 'auto', minHeight: '100vh', position: 'relative' }}>
      {loading && <RenderTableLoading columns={columns} />}
      {/* Render main listing content */}
      {dynamicCarousels && dynamicCarousels.totalCount ? (
        <RenderDynamicCarousels />
      ) : (
        !loading && (
          <EmptyComponent description={t('dynamicCarousel.adminPanel.noBannersMsg')} emptyLink={`${ROUTES.add}`} />
        )
      )}
    </div>
  );
};

DynamicCarouselListView.propTypes = {
  loading: PropTypes.bool.isRequired,
  deleteDynamicCarousel: PropTypes.func,
  loadData: PropTypes.func,
  dynamicCarousels: PropTypes.object,
  t: PropTypes.func,
  orderBy: PropTypes.object,
  onDynamicCarouselOrderBy: PropTypes.func
};

export default DynamicCarouselListView;
