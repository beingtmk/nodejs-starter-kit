/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import {
  Icon,
  Select,
  Option,
  Table,
  Pagination,
  EditIcon,
  DeleteIcon,
  Empty,
  Divider,
  /* Tooltip, */
  // Card,
  Avatar,
  Button,
} from '@gqlapp/look-client-react';
import RenderTableLoading from '@gqlapp/look-client-react/ui-antd/components/RenderTableLoading';
import settings from '@gqlapp/config';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
// import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';
import { NO_IMG } from '@gqlapp/listing-common';

import ROUTES from '../routes';
// import { withCategory } from '../containers/CategoryOpertations';

const { itemsNumber, type } = settings.pagination.web;
const { Meta } = Card;

const NoCategoryMessage = ({ t }) => (
  <div align="center">
    <br />
    <br />
    <br />
    <Empty description={t('category.noCategoryMsg')}>
      <Link to={`${ROUTES.add}`}>
        <Button color="primary">Add</Button>
      </Link>
    </Empty>
  </div>
);
NoCategoryMessage.propTypes = { t: PropTypes.func };

const CategoryListComponent = props => {
  const { onToggle, orderBy, onOrderBy, loading, categories, t, loadData, deleteCategory /*, onDuplicate */ } = props;

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
          order: '',
        });
      }
    }
    return onOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          {/* {t('list.column.listTitle')} */}
          {'Id'}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text /* , record */) => (
        <a
          href="#"
          // href={`${ROUTES.listingDetailLink}${record.id}`} rel="noopener noreferrer" target="_blank"
        >
          {displayDataCheck(text)}
        </a>
      ),
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          {t('list.column.listTitle')} {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a
          href="#"
          // href={`${ROUTES.listingDetailLink}${record.id}`} rel="noopener noreferrer" target="_blank"
        >
          <Card style={{ width: '200px', height: '60px' }} bodyStyle={{ padding: '10px' }}>
            <Meta
              title={
                <>
                  <div style={{ width: '100%', marginTop: '10px' }} />
                  {displayDataCheck(text)}
                </>
              }
              avatar={<Avatar size={46} src={record.imageUrl || NO_IMG} alt="" />}
            />
          </Card>
        </a>
      ),
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'is_active')} href="#">
          {t('list.column.active')} {renderOrderByArrow('is_active')}
        </a>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <Select name="role" defaultValue={text} style={{ width: '90px' }} onChange={e => onToggle('isActive', e, record.id)}>
          <Option key={0} value={true}>
            Active
          </Option>
          <Option key={1} value={false}>
            In-active
          </Option>
        </Select>
      ),
    },

    {
      title: t('list.column.actions'),
      key: 'actions',
      render: (text, record) => (
        <div
        // align="center"
        >
          <Link className="listing-link" to={`${ROUTES.editLink}${record.id}`}>
            <EditIcon />
          </Link>
          <Divider type="vertical" />
          {/* <Tooltip title="Duplicate Listing">
            <Button color="primary" shape="circle" onClick={() => onDuplicate(record.id)}>
              <Icon type="CopyOutlined" />
            </Button>
          </Tooltip> */}
          {/* <Divider type="vertical" /> */}
          <DeleteIcon onClick={() => deleteCategory(record.id)} title="Are you sure delete this listing?" />
        </div>
      ),
    },
  ];

  const expandedRowRender = (record /* , index */) => {
    // const withLoadedCategory = Component => {
    //   const withLoadedCategory = ({ loading, ...props }) => (loading ? <Spinner size="small" /> : <Component {...props} />);
    //   return withCategory(withLoadedCategory);
    // };
    // console.log(record, index);
    // return withLoadedCategory(<Table columns={columns} dataSource={record.subCategories} />);
    return <Table /* showHeader={false} */ columns={columns} dataSource={record.subCategories} />;
  };

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor },
    } = categories;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderCategory = () => (
    <Fragment>
      <Table
        dataSource={categories.edges.map(({ node }) => node)}
        columns={columns}
        expandable={{
          expandedRowRender,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <Icon type="DownOutlined" onClick={e => onExpand(record, e)} />
            ) : (
              record.subCategories &&
              record.subCategories.length > 0 && <Icon type="RightOutlined" onClick={e => onExpand(record, e)} />
            ),
        }}
        // loading={true}
      />
      <div align="center">
        <Pagination
          itemsPerPage={categories.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={categories.pageInfo.hasNextPage}
          pagination={type}
          total={categories.totalCount}
          loadMoreText={t('list.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </Fragment>
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      {/* Render loader */}
      {loading && (
        <RenderTableLoading columns={columns} tableProps={{ scroll: { x: 1300 }, expandable: { expandedRowRender } }} />
      )}
      {/* Render main category content */}
      {categories && categories.totalCount ? <RenderCategory /> : !loading && <NoCategoryMessage t={t} />}
    </div>
  );
};

CategoryListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  categories: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  t: PropTypes.func,
  onDuplicate: PropTypes.func,
  history: PropTypes.object,
};

export default translate('category')(CategoryListComponent);
