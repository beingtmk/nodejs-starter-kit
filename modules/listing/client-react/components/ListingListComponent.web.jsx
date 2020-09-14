/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, Icon, message, Spin } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import ROUTES from '../routes';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => (
  <div align="center">
    <br />
    <br />
    <br />
    <Spin text={t('listing.loadMsg')} />
  </div>
);
Loading.propTypes = { t: PropTypes.func };

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const ListingListComponent = props => {
  const { orderBy, onOrderBy, loading, listings, t, loadData, deleteListing } = props;

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
        return onOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onOrderBy({ column: name, order });
  };

  const handleToggleisActive = async (event, record, isActive) => {
    event.persist();
    message.warning('Todo');
    // const result = await toggleListingIsActive(record.id);
    // if (result) {
    //   record.isActive = isActive;
    //   event.target.innerHTML = isActive ? 'Active' : 'InActive';
    // }
  };

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'owner')} href="#">
          Created by {renderOrderByArrow('owner')}
        </a>
      ),
      width: 130,
      fixed: 'left',
      dataIndex: 'owner',
      key: 'owner',
      render: (text, record) => <div>{record.user && record.user.username}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          Title {renderOrderByArrow('title')}
        </a>
      ),
      width: 100,
      fixed: 'left',
      dataIndex: 'title',
      key: 'title',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'is_active')} href="#">
          {t('Is active')} {renderOrderByArrow('is_active')}
        </a>
      ),
      width: 120,
      fixed: 'left',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <a onClick={e => handleToggleisActive(e, record, text ? false : true)}>{text ? 'Active' : 'Inactive'}</a>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_cost.cost')} href="#">
          {'Cost'} {renderOrderByArrow('listing_cost.cost')}
        </a>
      ),
      width: 100,
      fixed: 'left',
      dataIndex: 'listingCostArray.cost',
      key: 'listing_cost.cost',
      render: (text, record) => (
        <>
          {/* {console.log('record', record)} */}
          &#8377;{' '}
          {record.listingCostArray && record.listingCostArray.length > 0 && record.listingCostArray[0].cost.toFixed(2)}
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_flags.isFeatured')} href="#">
          {'Featured'} {renderOrderByArrow('listing_flags.isFeatured')}
        </a>
      ),
      width: 100,
      dataIndex: 'listingFlags.isFeatured',
      key: 'listing_flags.isFeatured',
      render: (text, record) => (
        <>{record.listingFlags && record.listingFlags.isFeatured ? 'Featured' : 'Not featured'}</>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_flags.isNew')} href="#">
          {'Featured'} {renderOrderByArrow('listing_flags.isNew')}
        </a>
      ),
      width: 100,
      dataIndex: 'listingFlags.isNew',
      key: 'listing_flags.isNew',
      render: (text, record) => <>{record.listingFlags && record.listingFlags.isNew ? 'New' : 'Old'}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_flags.isDiscount')} href="#">
          {'Featured'} {renderOrderByArrow('listing_flags.isDiscount')}
        </a>
      ),
      width: 100,
      dataIndex: 'listingFlags.isDiscount',
      key: 'listing_flags.isDiscount',
      render: (text, record) => <>{record.listingFlags && record.listingFlags.isDiscount ? 'True' : 'False'}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listingCostArray.discount')} href="#">
          {'Discount'} {renderOrderByArrow('listingCostArray.discount')}
        </a>
      ),
      width: 100,
      dataIndex: 'listingCostArray.discount',
      key: 'listingCostArray.discount',
      render: (text, record) => (
        <>
          {record.listingFlags && record.listingFlags.isDiscount
            ? record.listingCostArray &&
              record.listingCostArray.length > 0 &&
              (record.listingCostArray[0].discount
                ? record.listingCostArray[0].discount.toFixed(2)
                : 'Discount not provided')
            : 'No Discount'}
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_options.fixedQuantity')} href="#">
          {'Fixed Quantity'} {renderOrderByArrow('listing_options.fixedQuantity')}
        </a>
      ),
      width: 200,
      dataIndex: 'listingOptions.fixedQuantity',
      key: 'listing_options.fixedQuantity',
      render: (text, record) => <>{record.listingOptions && record.listingOptions.fixedQuantity}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listingDetail.inventoryCount')} href="#">
          {'Inventory Count'} {renderOrderByArrow('listingDetail.inventoryCount')}
        </a>
      ),
      width: 200,
      dataIndex: 'listingDetail.inventoryCount',
      key: 'listingDetail.inventoryCount',
      render: (text, record) => <>{record.listingDetail && record.listingDetail.inventoryCount}</>
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <div>
          <Link className="listing-link" to={`${ROUTES.editLink}/${record.id}`}>
            <Button color="primary" shape="circle" icon="edit" />
          </Link>
          &nbsp;
          <Popconfirm
            title="Are you sure delete this listing?"
            onConfirm={() => deleteListing(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" shape="circle" icon="delete" />
          </Popconfirm>
        </div>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = listings;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderListings = () => (
    <Fragment>
      <Table scroll={{ x: 1300 }} dataSource={listings.edges.map(({ node }) => node)} columns={columns} />
      <div align="center">
        <Pagination
          itemsPerPage={listings.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={listings.pageInfo.hasNextPage}
          pagination={type}
          total={listings.totalCount}
          loadMoreText={t('list.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </Fragment>
  );

  return (
    <div>
      {/* Render loader */}
      {loading && !listings && <Loading t={t} />}
      {/* Render main listing content */}
      {listings && listings.totalCount ? <RenderListings /> : <NoListingsMessage t={t} />}
    </div>
  );
};

ListingListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  listings: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  toggleListingIsActive: PropTypes.func,
  t: PropTypes.func,
  history: PropTypes.object
};

export default translate('listing')(ListingListComponent);
