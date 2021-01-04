import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Spin, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const SuggestedListComponent = props => {
  const { items, loadData, renderFunc, endText } = props;
  const [data, setData] = useState(items);
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = useState(false);
  const [hasMore, setHasMore] = useState(items.pageInfo.hasNextPage);

  const fetchMoreData = async () => {
    setLoad(true);
    const endCursor = data && data.pageInfo.endCursor;

    if (!hasMore) {
      setHasMore(false);

      return;
    } else {
      const newData = await loadData(endCursor + 1, 'add');
      setData(newData.data.items);
      // console.log(newData);
      setLoad(false);
    }
  };
  return (
    <InfiniteScroll
      style={{ overflow: 'none' }}
      dataLength={data.totalCount}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div align="center">
          <br />
          <br />
          <br />
          <Spin />
        </div>
      }
      endMessage={
        <Divider>
          <p style={{ textAlign: 'center', marginTop: '25px' }}>
            <b>{endText ? `No more ${endText}` : 'END'}</b>
          </p>
        </Divider>
      }
    >
      <List
        grid={
          props.grid || {
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4
          }
        }
        dataSource={data.edges}
        renderItem={item => <List.Item key={item.node.id}>{renderFunc(item.node.id, item.node)}</List.Item>}
      />
    </InfiniteScroll>
  );
};

SuggestedListComponent.propTypes = {
  items: PropTypes.array,
  grid: PropTypes.object,
  loadData: PropTypes.func,
  renderFunc: PropTypes.func,
  endText: PropTypes.string
};

export default SuggestedListComponent;
