import React from 'react';
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
      render: (text, record) => (
        <>
          {record.id}
          {console.log(record)}
        </>
      ),
    },
    {
      title: <>Image</>,
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => (
        <>
          <img src={record.imageUrl} width="200px" />
          {console.log(record)}
        </>
      ),
    },
    {
      title: <>Link</>,
      dataIndex: 'link',
      key: 'link',
      render: (text, record) => <>{record.link}</>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Link to={`/edit/dynamic-carousel/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Button color="primary" size="sm" onClick={() => deleteDynamicCarousel(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
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
  t: PropTypes.func,
};

export default translate('user')(DynamicCarouselListView);
