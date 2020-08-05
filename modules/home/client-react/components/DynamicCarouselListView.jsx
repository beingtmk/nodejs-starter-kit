import React from 'react';
import { Popconfirm, Row, Col, message } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button } from '@gqlapp/look-client-react';

const DynamicCarouselListView = ({ deleteDynamicCarousel, dynamicCarousels }) => {
  const columns = [
    {
      title: <>Carousel Id</>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <>{record.id}</>
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
      title: <>Link</>,
      dataIndex: 'link',
      key: 'link',
      render: (text, record) => <>{record.link}</>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Link to={`/edit/dynamic-carousel/${record.id}`}>
              <Button color="primary" size="sm">
                Edit
              </Button>
            </Link>
          </Col>
          <Col span={12}>
            <Popconfirm
              title="Are you sure delete this listing?"
              onConfirm={() => deleteDynamicCarousel(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button color="primary" size="sm">
                Delete
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
  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <Table dataSource={dynamicCarousels} columns={columns} />
      </div>
    </>
  );
};

DynamicCarouselListView.propTypes = {
  loading: PropTypes.bool.isRequired,
  deleteDynamicCarousel: PropTypes.func,
  dynamicCarousels: PropTypes.array,
  t: PropTypes.func
};

export default translate('user')(DynamicCarouselListView);
