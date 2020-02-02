import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import { Table, Pagination, LayoutCenter } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';

const PaginationDemoView = ({ items, handlePageChange, pagination, t }) => {
  const renderFunc = text => <span>{text}</span>;
  const columns = [
    {
      title: t('list.column.title'),
      dataIndex: 'title',
      key: 'title',
      displayName: 'MyComponent',
      render: renderFunc
    }
  ];

  const renderContent = () => <Table dataSource={items.edges.map(({ node }) => node)} columns={columns} />;

  return (
    <div>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          <Grid.Box sm={{ hidden: 'true' }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
      <Pagination
        itemsPerPage={items.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={items.pageInfo.hasNextPage}
        pagination={pagination}
        total={items.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={items.limit}
      />
    </div>
  );
};

PaginationDemoView.propTypes = {
  items: PropTypes.object,
  handlePageChange: PropTypes.func,
  t: PropTypes.func,
  pagination: PropTypes.string
};

export default translate('pagination')(PaginationDemoView);
