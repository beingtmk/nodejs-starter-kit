import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Spin, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pagination, Loader } from "@gqlapp/look-client-react";

// import '../resources/listingCatalogue.css';

class CatalogueWithInfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.list,
      loading: false,
      hasMore: true
    };
    this.fetchMoreData.bind(this);
  }
  componentDidMount = () => {
    const { list, hasMore } = !this.props.loading && this.props;
    !this.props.loading &&
      this.setState({
        hasMore: hasMore,
        loading: false,
        data: list
      });
  };

  fetchMoreData = async () => {
    this.setState({ loading: true });
    let { data } = this.state;
    const hasMore = this.props.hasMore;
    const endCursor = this.props.endCursor;
    const totalCount = this.props.totalCount;
    console.log("called");
    if (!hasMore) {
      console.log("end reached");
      this.setState({ hasMore: false });

      return;
    } else {
      const newData = await this.props.loadData(endCursor + 1, "add");
      this.setState({
        data: newData,
        loading: false
      });
    }
  };

  render() {
    console.log("in", this.state);
    const CardComponent = this.props.component;
    return (
      <InfiniteScroll
        scrollThreshold={0.9}
        style={{ overflow: "none" }}
        dataLength={this.state.data.totalCount}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
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
          <List
            className='catalogue-infinite-list'
            grid={this.props.grid}
            dataSource={this.state.data.edges}
            renderItem={item => (
              <List.Item key={item.node.id}>
                <CardComponent key={item.node.id} item={item.node} />
              </List.Item>
            )}
          />
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
