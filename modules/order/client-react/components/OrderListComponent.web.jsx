/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Popconfirm, message, Spin } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Select, Option, Table, Button, Pagination } from '@gqlapp/look-client-react';
import { ORDER_STATES } from '@gqlapp/order-common';

import settings from '../../../../settings';
import ROUTES from '../routes';

const { itemsNumber, type } = settings.pagination.web;

const Loading = () => (
  <div align="center">
    <br />
    <br />
    <br />
    <Spin size="large" />
  </div>
);
Loading.propTypes = { t: PropTypes.func };

const NoOrdersMessage = ({ t }) => <div align="center">{t('order.noOrdersMsg')}</div>;
NoOrdersMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const OrderListComponent = props => {
  const { onPatchOrderState, orderBy, onOrderBy, loading, orders, t, loadData, onDelete, orderStates } = props;

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

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          Order id {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <div>{record && record.id}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'consumer.username')} href="#">
          Consumer {renderOrderByArrow('consumer.username')}
        </a>
      ),
      dataIndex: 'consumer',
      key: 'consumer',
      render: (text, record) => <a href={`/todo`}>{record.consumer && record.consumer.username}</a>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'order_state.state')} href="#">
          {t('State')} {renderOrderByArrow('order_state.state')}
        </a>
      ),
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => (
        <Select
          name="state"
          defaultValue={record.orderState && record.orderState.state}
          style={{ width: '125px' }}
          onChange={e => onPatchOrderState(record.id, e)}
        >
          {orderStates &&
            orderStates.map((oS, i) => (
              <Option key={i + 1} value={oS.state}>
                {oS.state}
              </Option>
            ))}
        </Select>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'createdAt')} href="#">
          Created at - (en-IN) {renderOrderByArrow('createdAt')}
        </a>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => <>{new Date(Number(record.createdAt)).toLocaleDateString('en-IN')}</>
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      render: (text, record) => (
        <Row gutter={24}>
          <Col span={4}>
            {record.orderState.state !== ORDER_STATES.STALE && (
              <Link to={`${ROUTES.orderDetailLink}${record.id}`}>
                <Button color="primary" shape="circle" icon="eye" />
              </Link>
            )}
          </Col>
          <Col span={4}>
            <Popconfirm
              title="Are you sure delete this order?"
              onConfirm={() => onDelete(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button color="danger" shape="circle" icon="delete" />
            </Popconfirm>
          </Col>
        </Row>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = orders;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderOrders = () => (
    <>
      <Table dataSource={orders.edges.map(({ node }) => node)} columns={columns} />
      <br />
      <div align="center">
        <Pagination
          itemsPerPage={orders.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={orders.pageInfo.hasNextPage}
          pagination={type}
          total={orders.totalCount}
          loadMoreText={t('list.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Render loader */}
      {loading && !orders && <Loading t={t} />}
      {/* Render main order content */}
      {orders && orders.totalCount ? <RenderOrders /> : !loading && <NoOrdersMessage t={t} />}
    </>
  );
};

OrderListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  orders: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPatchOrderState: PropTypes.func,
  t: PropTypes.func,
  history: PropTypes.object,
  orderStates: PropTypes.object
};

export default translate('order')(OrderListComponent);
