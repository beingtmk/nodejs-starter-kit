/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Table,
  Pagination,
  EditIcon,
  DeleteIcon,
  Button,
  Empty,
  RenderTableLoading,
  Divider
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';

import ROUTES from '../../routes';

const { itemsNumber, type } = settings.pagination.web;

const NodynaDicCarouselsMessage = ({ t }) => (
  <div align="center">
    <br />
    <br />
    <br />
    <Empty description={t('listing.noListingsMsg')}>
      <Link to={`${ROUTES.add}`}>
        <Button color="primary">{t('dynamicCarousel.btn.add')}</Button>
      </Link>
    </Empty>
  </div>
);
NodynaDicCarouselsMessage.propTypes = { t: PropTypes.func };

const DynamicCarouselListView = ({ loading, t, deleteDynamicCarousel, dynamicCarousels, loadData }) => {
  const columns = [
    {
      title: t('dynamicCarousel.columns.carouselId'),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <>{record.id}</>
    },
    {
      title: t('dynamicCarousel.columns.title'),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <>{record.title}</>
    },
    {
      title: t('dynamicCarousel.columns.image'),
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => (
        <>
          <img src={record.imageUrl} width="200px" />
        </>
      )
    },
    {
      title: t('dynamicCarousel.columns.label'),
      dataIndex: 'label',
      key: 'label',
      render: (text, record) => <>{displayDataCheck(record.label)}</>
    },
    {
      title: t('dynamicCarousel.columns.link'),
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
    <>
      <div style={{ overflowX: 'auto' }}>
        {loading && <RenderTableLoading columns={columns} />}
        {/* Render main listing content */}
        {dynamicCarousels && dynamicCarousels.totalCount ? (
          <RenderDynamicCarousels />
        ) : (
          <NodynaDicCarouselsMessage t={t} />
        )}
      </div>
    </>
  );
};

DynamicCarouselListView.propTypes = {
  loading: PropTypes.bool.isRequired,
  deleteDynamicCarousel: PropTypes.func,
  loadData: PropTypes.func,
  dynamicCarousels: PropTypes.array,
  t: PropTypes.func
};

export default DynamicCarouselListView;
