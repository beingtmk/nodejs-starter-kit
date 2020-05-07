/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, Icon, message, Dropdown, Menu, Tooltip, Spin } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination } from '@gqlapp/look-client-react';

import settings from '../../../../settings';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => <Spin text={t('listing.loadMsg')} />;
Loading.propTypes = { t: PropTypes.func };

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const ListingListComponent = props => {
  const { orderBy, onOrderBy, loading, listings, t, loadData, deleteListing, toggleListingIsActive } = props;

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
    const result = await toggleListingIsActive(record.id);
    if (result) {
      record.isActive = isActive;
      event.target.innerHTML = isActive ? 'Active' : 'InActive';
    }
  };

  const columns = [
    {
      title: (
        <a
          // onClick={e => handleOrderBy(e, "owner")}
          href="#"
        >
          {'Owner'}
          {/* {renderOrderByArrow("owner")} */}
        </a>
      ),
      dataIndex: 'owner',
      key: 'owner',
      render: (text, record) => <>{record && record.user && record.user.username}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          Title {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
          {t('Is active')} {renderOrderByArrow('isActive')}
        </a>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <a onClick={e => handleToggleisActive(e, record, text ? false : true)}>{text ? 'Active' : 'Inactive'}</a>
      )
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <div>
          <Link className="listing-link" to={`/edit/listing/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this listing?"
            onConfirm={() => deleteListing(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" shape="circle" size="sm">
              <Icon type="delete" />
            </Button>
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
      <Table dataSource={listings.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={listings.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={listings.pageInfo.hasNextPage}
        pagination={type}
        total={listings.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
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
  listings: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  toggleListingIsActive: PropTypes.func,
  t: PropTypes.func,
  history: PropTypes.object
};

export default translate('listing')(ListingListComponent);
