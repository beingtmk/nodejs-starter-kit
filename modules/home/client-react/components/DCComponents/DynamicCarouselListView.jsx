/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Empty, Popconfirm, Row, Col, message, Button } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, Pagination } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import ROUTES from '../../routes';

const { itemsNumber, type } = settings.pagination.web;

const Loading = () => <Spinner />;
Loading.propTypes = { t: PropTypes.func };

const NodynaDicCarouselsMessage = ({ t }) => (
  <div align="center">
    <br />
    <br />
    <br />
    <Empty description={t('listing.noListingsMsg')}>
      <Link to={`${ROUTES.add}`}>
        <Button type="primary">Add</Button>
      </Link>
    </Empty>
  </div>
);
NodynaDicCarouselsMessage.propTypes = { t: PropTypes.func };

const DynamicCarouselListView = ({ loading, t, deleteDynamicCarousel, dynamicCarousels, loadData }) => {
  const columns = [
    {
      title: <>Carousel Id</>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <>{record.id}</>
    },
    {
      title: <>Title</>,
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <>{record.title}</>
    },
    {
      title: <>Image</>,
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => (
        <>
          <img src={record.imageUrl} width="200px" />
        </>
      )
    },
    {
      title: <>Label</>,
      dataIndex: 'label',
      key: 'label',
      render: (text, record) => <>{record.label}</>
    },
    {
      title: <>Link</>,
      dataIndex: 'link',
      key: 'link',
      render: (text, record) => <>{record.link}</>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Row gutter={24}>
          <Col span={5}>
            <Link to={`${ROUTES.editLink}${record.id}`}>
              <Button shape="circle" size="large">
                <EditOutlined />
              </Button>
            </Link>
          </Col>
          <Col span={5}>
            <Popconfirm
              title="Are you sure delete this listing?"
              onConfirm={() => deleteDynamicCarousel(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" shape="circle" size="large">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      )
    }
  ];
  const cancel = () => {
    message.error('Click on No');
  };
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
        {loading && !dynamicCarousels && <Loading t={t} />}
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

export default translate('home')(DynamicCarouselListView);
