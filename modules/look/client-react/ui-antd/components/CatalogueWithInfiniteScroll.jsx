import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Spin, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pagination, Loader } from "@gqlapp/look-client-react";


class CatalogueWithInfiniteScroll extends Component {


  fetchMoreData = async (e) => {
    const hasMore = this.props.hasMore;
    const endCursor = this.props.endCursor;
    const totalCount = this.props.totalCount;
    if (!hasMore) {

      return;
    } else {
      await this.props.loadData(endCursor + 1, "add");
    }
  };

  render() {
    const CardComponent = this.props.component;
    const { TableComponent } = this.props;
    return (
      <InfiniteScroll
        scrollThreshold={'100px'}
        style={{ overflow: "none" }}
        dataLength={this.props.list.edges.length}
        next={this.fetchMoreData}
        scrollableTarget="body"

        hasMore={this.props.hasMore}
        loader={
          <div align="center">
            <Spin />
          </div>
        }
        endMessage={
          <Divider>
            <p style={{ textAlign: "center", marginTop: "25px" }}>
              <b>{this.props.endMessage}</b>
            </p>
          </Divider>
        }
        children={
          <>
            {TableComponent ?
              <TableComponent />
              : (<List
                className='catalogue-infinite-list'
                grid={this.props.grid}
                dataSource={this.props.list.edges}
                renderItem={item => (
                  <List.Item key={item.node.id}>
                    <CardComponent key={item.node.id} item={item.node} />
                  </List.Item>
                )}
              />)}
          </>
        }
      />
    );
  }
}

CatalogueWithInfiniteScroll.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gearCategory: PropTypes.string.isRequired,
      gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CatalogueWithInfiniteScroll;