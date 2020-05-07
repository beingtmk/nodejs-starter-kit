import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Spin, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Pagination, Loader } from '@gqlapp/look-client-react';

// import '../resources/listingCatalogue.css';
import RelatedCardComponent from './RelatedCardComponent';

// const SuggestedCardListComponent = () => {
//   const [data, setData] = useState(this.props.listings);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // componentDidMount = () => {
//   //   const listings = !this.props.loading && this.props.listings;
//   //   !this.props.loading && setHasMore(listings.pageInfo.hasNextPage) && setLoading(false) && setData(listings);
//   // };

//   async function fetchMoreData() {
//     this.setState({ loading: true });
//     let data = this.data;
//     const hasMore = this.props.listings.pageInfo.hasNextPage;
//     const endCursor = this.props.listings.pageInfo.endCursor;
//     const totalCount = this.props.listings.totalCount;

//     if (!hasMore) {
//       console.log('end reached');
//       this.setState({ hasMore: false });

//       return;
//     } else {
//       const newData = await this.props.loadData(endCursor + 1, 'add');
//       this.setState({
//         data: newData.listings,
//         loading: false
//       });
//     }
//   }

//   return (
//     <InfiniteScroll
//       style={{ overflow: 'none' }}
//       dataLength={this.props.listings.totalCount}
//       next={fetchMoreData.bind(this)}
//       hasMore={this.state.hasMore}
//       loader={
//         <div align="center">
//           <Spin />
//         </div>
//       }
//       endMessage={
//         <Divider>
//           <p style={{ textAlign: 'center', marginTop: '25px' }}>
//             <b>End Of Listings</b>
//           </p>
//         </Divider>
//       }
//     >
//       <List
//         grid={{
//           gutter: 24,
//           xs: 1,
//           sm: 2,
//           md: 2,
//           lg: 3,
//           xl: 4,
//           xxl: 4
//         }}
//         dataSource={this.state.data.edges}
//         renderItem={item => (
//           <List.Item key={item.node.id}>
//             <h1>bleh</h1>
//             {/* <RelatedCardComponent key={item.node.id} item={item.node} history={this.props.history} /> */}
//           </List.Item>
//         )}
//       />
//     </InfiniteScroll>
//   );
// };

class SuggestedCardListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.listings,
      loading: false,
      hasMore: true
    };
  }
  componentDidMount = () => {
    const listings = !this.props.loading && this.props.listings;
    !this.props.loading &&
      this.setState({
        hasMore: listings.pageInfo.hasNextPage,
        loading: false,
        data: listings
      });
  };

  async fetchMoreData() {
    this.setState({ loading: true });
    let { data } = this.state;
    const hasMore = this.props.listings.pageInfo.hasNextPage;
    const endCursor = this.props.listings.pageInfo.endCursor;
    const totalCount = this.props.listings.totalCount;

    if (!hasMore) {
      console.log('end reached');
      this.setState({ hasMore: false });

      return;
    } else {
      const newData = await this.props.loadData(endCursor + 1, 'add');
      this.setState({
        data: newData.listings,
        loading: false
      });
    }
  }

  render() {
    console.log('in', this.state);
    return (
      <InfiniteScroll
        style={{ overflow: 'none' }}
        dataLength={this.props.listings.totalCount}
        next={this.fetchMoreData.bind(this)}
        hasMore={this.state.hasMore}
        loader={
          <div align="center">
            <Spin />
          </div>
        }
        endMessage={
          <Divider>
            <p style={{ textAlign: 'center', marginTop: '25px' }}>
              <b>End Of Listings</b>
            </p>
          </Divider>
        }
      >
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4
          }}
          dataSource={this.state.data.edges}
          renderItem={item => (
            <List.Item key={item.node.id}>
              <RelatedCardComponent key={item.node.id} item={item.node} history={this.props.history} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    );
  }
}

SuggestedCardListComponent.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gearCategory: PropTypes.string.isRequired,
      gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SuggestedCardListComponent;
