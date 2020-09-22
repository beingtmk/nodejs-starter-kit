// import React, { Component } from 'react';
// import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
// import { Row, Col, Breadcrumb, Divider, Spin, Card, Descriptions, Avatar, Statistic, Carousel, Icon, Tooltip } from 'antd';

// import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth';
// import { translate } from '@gqlapp/i18n-client-react';
// import { PageLayout, Button } from '@gqlapp/look-client-react';
// import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
// import BookmarkComponent from './BookmarkComponent';

// import settings from '../../../../settings';

// const { Meta } = Card;

// const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

// class ListingDetailView extends Component {
//   constructor(props) {
//     super(props);
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
//     this.carousel = React.createRef();
//   }

//   renderMetaData = () => (
//     <Helmet
//       title={`${settings.app.name} - ${this.props.t('listingDetail.title')}`}
//       meta={[
//         {
//           name: 'description',
//           content: this.props.t('listingDetail.meta'),
//         },
//       ]}
//     />
//   );

//   next() {
//     this.carousel.next();
//   }

//   previous() {
//     this.carousel.prev();
//   }

//   prevSlide = () => {
//     this.carousel.prev();
//   };

//   nextSlide = () => {
//     this.carousel.next();
//   };

//   render() {
//     const { listing, loading, user, history, navigation, currentUser, handleBookmark, listingBookmarkStatus } = this.props;
//     const images = listing && listing.listingImages && listing.listingImages.length !== 0 && listing.listingImages;
//     const getName = () => {
//       const firstName = user && user.user && user.user.profile && user.user.profile.firstName;
//       const lastName = user && user.user && user.user.profile && user.user.profile.lastName;
//       if (firstName && lastName) {
//         return `${firstName} ${lastName}`;
//       } else if (firstName && !lastName) {
//         return firstName;
//       } else {
//         return 'Name Not Available';
//       }
//     };

//     const status = {
//       customPaging: function(i) {
//         return (
//           <a>
//             <img src={images[i].url} style={{ width: '30px', height: '30px', zIndex: '10' }} />
//           </a>
//         );
//       },

//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       dots: true,

//       // nextArrow: <SampleNextArrow />,
//       // prevArrow: <SamplePrevArrow />
//     };
//     return (
//       <PageLayout>
//         {this.renderMetaData()}
//         {!loading && !listing && (
//           <div align="center">
//             <br />
//             <br />
//             <br />
//             <h3>{'Listing not found!'}</h3>
//           </div>
//         )}
//         {loading && (
//           <div align="center">
//             <br />
//             <br />
//             <br />
//             <Spin />
//           </div>
//         )}
//         {listing && (
//           <Row>
//             <Breadcrumb
//               separator=">"
//               style={{
//                 padding: '0px 0 0 10px',
//                 marginTop: '5px',
//                 marginBottom: '5px',
//               }}
//             >
//               <Breadcrumb.Item>{listing.title}</Breadcrumb.Item>
//               <Breadcrumb.Item>{`Listing ${listing.id}`}</Breadcrumb.Item>
//             </Breadcrumb>
//             <Col xl={16} lg={15} md={13} sm={24}>
//               <Card
//                 title={
//                   <Row>
//                     <Col xl={23} lg={23} md={23} sm={23}>
//                       <h1>{listing.title}</h1>
//                     </Col>
//                     <Col xl={1} lg={1} md={1} sm={1}>
//                       <IfLoggedIn>
//                         <BookmarkComponent
//                           handleBookmark={() => handleBookmark(listing.id, listing.userId)}
//                           bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
//                         />
//                       </IfLoggedIn>
//                     </Col>
//                   </Row>
//                 }
//                 style={{
//                   background: 'white',
//                   borderRadius: '10px',
//                 }}
//                 cover={
//                   <div style={{ height: '50vh', paddingTop: '10px' }} align="center">
//                     <div
//                       style={{
//                         height: '300px',
//                         position: 'relative',
//                         marginBottom: '30px',
//                       }}
//                     >
//                       <div className="carousel-arrow carousel-arrow-left" onClick={this.prevSlide}>
//                         <Icon type="left" className="carousel-arrow-icon" />
//                       </div>
//                       <Carousel className="listing-detail-carousel" ref={node => (this.carousel = node)} {...status}>
//                         {images &&
//                           images.map((item, id) => (
//                             <div key={id} align="center">
//                               <img src={item.url} style={{ height: '300px' }} />
//                             </div>
//                           ))}
//                       </Carousel>
//                       <div className="carousel-arrow carousel-arrow-right" onClick={this.nextSlide}>
//                         <Icon type="right" className="carousel-arrow-icon" />
//                       </div>
//                     </div>
//                   </div>
//                 }
//               >
//                 <Divider />
//                 <Row>
//                   <Col md={12} xs={24}>
//                     <a href={`/public-profile/${listing.userId}`}>
//                       <Tooltip placement="topLeft" title="Visit User's Profile">
//                         <Meta
//                           avatar={
//                             <Avatar
//                               style={{ height: '60px', width: '60px' }}
//                               src={(user && user.user && user.user.profile && user.user.profile.avatar) || AVATAR}
//                             />
//                           }
//                           title={<h2 style={{ marginLeft: '10px' }}>{getName()}</h2>}
//                           description={
//                             <h3
//                               style={{
//                                 marginLeft: '10px',
//                                 marginTop: '-10px',
//                               }}
//                             >
//                               {user && user.user && user.user.username}
//                             </h3>
//                           }
//                         />
//                       </Tooltip>
//                     </a>
//                   </Col>
//                   {/* <Col align="right" md={12} xs={0}>
//                     <AddToCart listing={listing} currentUser={currentUser} history={history} navigation={navigation} />
//                   </Col> */}
//                 </Row>
//                 <br />
//                 <Descriptions layout="horizontal" bordered column={1}>
//                   {/* {listing.listingCost.cost && listing.listingCost.cost && (
//                     <Descriptions.Item label="Cost">
//                       <Statistic
//                         value={
//                           listing && listing.listingCost && listing.listingCost.cost ? listing.listingCost.cost : 'Free'
//                         }
//                         prefix={
//                           <img
//                             height="20px"
//                             width="20px"
//                             alt=""
//                             src="https://res.cloudinary.com/dpvrqxttb/image/upload/v1588191192/edgenus/ddibd7whj8ha7hdml6pq.svg"
//                           />
//                         }
//                       />
//                     </Descriptions.Item>
//                   )} */}
//                   {<Descriptions.Item label="Description">{listing.description}</Descriptions.Item>}
//                   {/* {<Descriptions.Item label="Is Active">{listing.isActive}</Descriptions.Item>} */}
//                 </Descriptions>
//               </Card>
//             </Col>
//             <Col xl={8} lg={9} md={11} sm={24}>
//               <AddToCart listing={listing} />
//             </Col>
//           </Row>
//         )}
//       </PageLayout>
//     );
//   }
// }

// ListingDetailView.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   listing: PropTypes.object,
//   reviews: PropTypes.array,
//   location: PropTypes.object.isRequired,
//   t: PropTypes.func,
//   onShare: PropTypes.func,
//   user: PropTypes.object,
//   history: PropTypes.object,
//   navigation: PropTypes.object,
//   currentUser: PropTypes.object,
//   handleBookmark: PropTypes.func,
//   listingBookmarkStatus: PropTypes.bool,
//   listingBookmarkStatusLoading: PropTypes.bool,
// };

// export default translate('listing')(ListingDetailView);
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Row,
  Col,
  Breadcrumb,
  Divider,
  Spin,
  Card,
  Descriptions,
  Avatar,
  Statistic,
  Carousel,
  Icon,
  Tooltip,
  Tabs
} from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Button } from '@gqlapp/look-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';

import settings from '../../../../settings';
import ListingsCarousel from './ListingCarousel';
import BookmarkComponent from './BookmarkComponent';

const { TabPane } = Tabs;
const { Meta } = Card;
const BreadCrumbItem = Breadcrumb.Item;

const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

class ListingDetailView extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }

  renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${this.props.t('listingDetail.title')}`}
      meta={[
        {
          name: 'description',
          content: this.props.t('listingDetail.meta')
        }
      ]}
    />
  );

  next() {
    this.carousel.next();
  }

  previous() {
    this.carousel.prev();
  }

  prevSlide = () => {
    this.carousel.prev();
  };

  nextSlide = () => {
    this.carousel.next();
  };

  render() {
    const { listing, loading, history, navigation, currentUser, handleBookmark, listingBookmarkStatus } = this.props;
    const images =
      listing &&
      listing.listingMedia &&
      listing.listingMedia.length > 0 &&
      listing.listingMedia.filter(lM => lM.type === 'image');
    const youtubeUrl =
      listing &&
      listing.listingMedia &&
      listing.listingMedia.length > 0 &&
      listing.listingMedia.filter(lM => lM.type === 'video');
    console.log('ideo', youtubeUrl);
    const user = listing && listing.user;
    const getName = () => {
      const firstName = user && user.profile && user.profile.firstName;
      const lastName = user && user && user.profile && user.profile.lastName;
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      } else if (firstName && !lastName) {
        return firstName;
      } else {
        return 'Name Not Available';
      }
    };

    const status = {
      customPaging: function(i) {
        return (
          <a>
            <img
              src={
                (images && images.length !== 0 && images[i] && images[i].url) ||
                'https://res.cloudinary.com/approxyma/image/upload/v1596703877/3721679-youtube_108064_ratbaa.png'
              }
              style={{ width: '30px', height: '30px', zIndex: '10' }}
            />
          </a>
        );
      },
      autoplay: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true

      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };

    const getYoutubeUrl = url => {
      console.log('url', url);
      const newUrl = url.replace('watch?v=', 'embed/');

      return newUrl;
    };
    return (
      <PageLayout>
        {this.renderMetaData()}
        {!loading && !listing && (
          <div align="center">
            <br />
            <br />
            <br />
            <h3>{'Listing not found!'}</h3>
          </div>
        )}
        {loading && (
          <div align="center">
            <br />
            <br />
            <br />
            <Spin />
          </div>
        )}
        {listing && (
          <>
            <Row gutter={24}>
              <Col span={24}>
                <Breadcrumb
                  separator=">"
                  style={{
                    marginBottom: '5px'
                  }}
                >
                  <BreadCrumbItem key="home">
                    <NavLink to="/">
                      <Icon type="home" />
                    </NavLink>
                  </BreadCrumbItem>
                  <BreadCrumbItem key="listing-title">{listing && listing.title}</BreadCrumbItem>
                </Breadcrumb>
              </Col>

              <Col xl={10} lg={10} md={13} sm={24} style={{ marginBottom: '30px' }}>
                <div style={{ height: '50vh', paddingTop: '10px' }} align="center">
                  <div
                    style={{
                      height: '300px',
                      position: 'relative',
                      marginBottom: '30px'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '5',
                        right: '0',
                        zIndex: '100'
                      }}
                    >
                      {!(typeof listingBookmarkStatus == 'undefined') && (
                        <BookmarkComponent
                          handleBookmark={() => handleBookmark(listing.id, listing.userId)}
                          bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
                        />
                      )}
                    </div>
                    <div className="carousel-arrow carousel-arrow-left" onClick={this.prevSlide}>
                      <Icon type="left" className="carousel-arrow-icon" />
                    </div>
                    <Carousel className="listing-detail-carousel" ref={node => (this.carousel = node)} {...status}>
                      {images &&
                        images.map((item, id) => (
                          <div key={id} align="center">
                            <img src={item.url} style={{ height: '300px' }} />
                          </div>
                        ))}
                      {youtubeUrl.length > 0 &&
                        youtubeUrl.map(yT => (
                          <div key="video">
                            <iframe
                              width="100%"
                              height="300px"
                              src={getYoutubeUrl(yT.url)}
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ))}
                    </Carousel>
                    <div className="carousel-arrow carousel-arrow-right" onClick={this.nextSlide}>
                      <Icon type="right" className="carousel-arrow-icon" />
                    </div>
                  </div>
                  <div align="left" style={{ padding: '5px' }}>
                    <h3>Details: </h3>
                    <p>{listing.description}</p>
                  </div>
                </div>
                <Row>
                  <Col xl={23} lg={23} md={23} sm={23}></Col>
                  <Col xl={1} lg={1} md={1} sm={1}></Col>
                </Row>
                <Row>
                  {/* <Col align="right" md={12} xs={0}>
                    <AddToCart listing={listing} currentUser={currentUser} history={history} navigation={navigation} />
                  </Col> */}
                </Row>
              </Col>
              <Col xl={14} lg={14} md={11} sm={24}>
                <AddToCart listing={listing} history={history} />
              </Col>
            </Row>
            <Divider style={{ marginBottom: '0' }} />
            <div>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Additional Info" key="1">
                  <Descriptions layout="horizontal" bordered column={1} size="small">
                    {/* {listing && listing.listingInfo && listing.listingInfo.size && ( */}
                    <Descriptions.Item label="Something">{'Something'}</Descriptions.Item>
                    {/* )} */}
                    {/* {<Descriptions.Item label="Is Active">{listing.isActive}</Descriptions.Item>} */}
                  </Descriptions>
                </TabPane>
                <TabPane tab="Details" key="2">
                  <p>{listing.description}</p>
                </TabPane>
              </Tabs>
            </div>
            <>
              <ListingsCarousel filter={{ userId: listing.user.id }} currentUser={currentUser} />
            </>
          </>
        )}
      </PageLayout>
    );
  }
}

ListingDetailView.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  reviews: PropTypes.array,
  location: PropTypes.object.isRequired,
  t: PropTypes.func,
  onShare: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object,
  currentUser: PropTypes.object,
  handleBookmark: PropTypes.func,
  listingBookmarkStatus: PropTypes.bool,
  listingBookmarkStatusLoading: PropTypes.bool
};

export default translate('listing')(ListingDetailView);
