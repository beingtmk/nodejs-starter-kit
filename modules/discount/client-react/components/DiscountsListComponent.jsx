/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import {
  EditIcon,
  Table,
  Pagination,
  DeleteIcon,
  Divider,
  EmptyComponent,
  RenderTableLoading
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { displayDataCheck } from '@gqlapp/listing-client-react';

import ROUTES from '../routes';

const { itemsNumber, type } = settings.pagination.web;

const DiscountsListComponent = props => {
  const { orderBy, onDiscountsOrderBy, loading, discounts, t, loadData, deleteDiscount } = props;

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
        return onDiscountsOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onDiscountsOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          {t('adminPanel.discount.column1')} &nbsp;
          {renderOrderByArrow('discount.id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <>{record && record.id && displayDataCheck(record.id)}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'modalId')} href="#">
          {t('adminPanel.discount.column2')} &nbsp;
          {renderOrderByArrow('modalId')}
        </a>
      ),
      dataIndex: 'modalId',
      key: 'modalId',
      render: (text, record) => <>{record && record.modalId && displayDataCheck(record.modalId)}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'discountPercent')} href="#">
          {t('adminPanel.discount.column3')} &nbsp;
          {renderOrderByArrow('discountPercent')}
        </a>
      ),
      dataIndex: 'discountPercent',
      key: 'discountPercent',
      render: text => <div>{displayDataCheck(text)} %</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'discountDuration.endDate')} href="#">
          {t('adminPanel.discount.column4')} &nbsp;
          {renderOrderByArrow('discountDuration.endDate')}
        </a>
      ),
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => {
        const startDate = record.discountDuration && record.discountDuration.startDate;
        const endDate = record.discountDuration && record.discountDuration.endDate;
        const now = new Date().toISOString();
        return (
          <div>
            {displayDataCheck(
              startDate <= now && endDate >= now ? (
                <h4>
                  Deal ends in: &nbsp;
                  {Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)) !== 0
                    ? `${Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))} days`
                    : Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60)) !== 0
                    ? `${Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60))} hours`
                    : Math.round((new Date(endDate) - new Date()) / (1000 * 60)) !== 0
                    ? `${Math.round((new Date(endDate) - new Date()) / (1000 * 60))} minutes`
                    : Math.round((new Date(endDate) - new Date()) / (1000 * 60)) !== 0
                    ? `${Math.round((new Date(endDate) - new Date()) / 1000)} seconds`
                    : 'Deal has Ended!'}
                </h4>
              ) : startDate >= now && endDate >= now ? (
                <h4>
                  Deal starts in: &nbsp;
                  {Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)) !== 0
                    ? `${Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24))} days`
                    : Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60)) !== 0
                    ? `${Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60))} hours`
                    : Math.round((new Date(startDate) - new Date()) / (1000 * 60)) !== 0
                    ? `${Math.round((new Date(startDate) - new Date()) / (1000 * 60))} minutes`
                    : Math.round((new Date(startDate) - new Date()) / (1000 * 60)) !== 0
                    ? `${Math.round((new Date(startDate) - new Date()) / 1000)} seconds`
                    : 'Deal has Ended!'}
                </h4>
              ) : (
                'No time stamp'
              )
            )}
          </div>
        );
      }
    },
    {
      title: t('adminPanel.discount.column5'),
      key: 'actions',
      render: (text, record) => (
        <div>
          <Link className="discount-link" to={`${ROUTES.editLink}${record.modalName}/${record.modalId}`}>
            <EditIcon />
          </Link>
          <Divider type="vertical" />
          <DeleteIcon onClick={() => deleteDiscount(record.id)} />
        </div>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = discounts;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderDiscounts = () => (
    <Fragment>
      <Table dataSource={discounts.edges.map(({ node }) => node)} columns={columns} />
      <hr />
      <br />
      <div align="center">
        <Pagination
          itemsPerPage={discounts.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={discounts.pageInfo.hasNextPage}
          pagination={type}
          total={discounts.totalCount}
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
      {/* Render main discount content */}
      {discounts && discounts.totalCount ? (
        <RenderDiscounts />
      ) : (
        <EmptyComponent description={t('adminPanel.noDiscountsMsg')} emptyLink={`${ROUTES.add}`} />
      )}
    </div>
  );
};

DiscountsListComponent.propTypes = {
  discounts: PropTypes.object,
  orderBy: PropTypes.object,
  loading: PropTypes.bool,
  loadData: PropTypes.func,
  onDiscountsOrderBy: PropTypes.func,
  t: PropTypes.func,
  deleteDiscount: PropTypes.func
};

export default translate('discount')(DiscountsListComponent);
