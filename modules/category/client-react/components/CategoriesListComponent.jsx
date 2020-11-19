/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { useQuery } from 'react-apollo';

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
  Avatar,
  Button,
  RenderTableLoading,
  Spin
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import { NO_IMG } from '@gqlapp/listing-common';

import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
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
      <a href={`${ROUTES.add}`}>
        <Button color="primary">Add</Button>
      </a>
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
          {/* {t('category.column.id')} */}
          {'Id'}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text /* , record */) => displayDataCheck(text)
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          {t('category.column.listTitle')} {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a
          href="#"
          // href={`${ROUTES.listingDetailLink}${record.id}`} rel="noopener noreferrer" target="_blank"
        >
          <a href={`${ROUTES.categoryCatalogueLink}${record.id}`} rel="noopener noreferrer" target="_blank">
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
        </a>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'is_active')} href="#">
          {t('category.column.active')} {renderOrderByArrow('is_active')}
        </a>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <Select
          name="role"
          defaultValue={text}
          style={{ width: '90px' }}
          onChange={e => onToggle('isActive', e, record.id)}
        >
          <Option key={0} value={true}>
            Active
          </Option>
          <Option key={1} value={false}>
            In-active
          </Option>
        </Select>
      )
    },

    {
      title: t('category.column.actions'),
      key: 'actions',
      render: (text, record) => (
        <div
        // align="center"
        >
          <a className="listing-link" href={`${ROUTES.editLink}${record.id}`}>
            <EditIcon />
          </a>
          <Divider type="vertical" />
          {/* <Tooltip title="Duplicate Listing">
            <Button color="primary" shape="circle" onClick={() => onDuplicate(record.id)}>
              <Icon type="CopyOutlined" />
            </Button>
          </Tooltip> */}
          {/* <Divider type="vertical" /> */}
          <DeleteIcon onClick={() => deleteCategory(record.id)} title="Are you sure delete this listing?" />
        </div>
      )
    }
  ];

  const ExpandedRowRender = ({ record /* , index */ }) => {
    const { loading, data } = useQuery(CATEGORY_QUERY, {
      variables: {
        id: record.id
      }
    });
    const category = data && data.category;
    return loading ? (
      <div align="center">
        <Spin size="small" />
      </div>
    ) : (
      <Table
        showHeader={false}
        tableLayout={'auto'}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => (
            <ExpandedRowRender record={record} index={index} indent={indent} expanded={expanded} />
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <Icon type="DownOutlined" onClick={e => onExpand(record, e)} />
            ) : (
              category.subCategories &&
              category.subCategories.length > 0 && <Icon type="RightOutlined" onClick={e => onExpand(record, e)} />
            )
        }}
        columns={columns}
        dataSource={category.subCategories}
      />
    );
    // return <h1>hello</h1>
  };

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = categories;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderCategory = () => (
    <Fragment>
      <Table
        dataSource={categories.edges.map(({ node }) => node)}
        columns={columns}
        tableLayout={'auto'}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => (
            <ExpandedRowRender record={record} index={index} indent={indent} expanded={expanded} />
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <Icon type="DownOutlined" onClick={e => onExpand(record, e)} />
            ) : (
              record.subCategories &&
              record.subCategories.length > 0 && <Icon type="RightOutlined" onClick={e => onExpand(record, e)} />
            )
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
          loadMoreText={t('category.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </Fragment>
  );
  return (
    <div style={{ overflowX: 'auto' }}>
      {/* Render loader */}
      {loading && (
        <RenderTableLoading
          columns={columns}
          tableProps={{
            scroll: { x: 1300 },
            expandable: {
              expandedRowRender: (record, index, indent, expanded) => (
                <ExpandedRowRender record={record} index={index} indent={indent} expanded={expanded} />
              )
            }
          }}
        />
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
  record: PropTypes.object,
  expanded: PropTypes.func,
  onExpand: PropTypes.func
};

export default translate('category')(CategoryListComponent);