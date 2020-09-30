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
//     next = next.bind(this);
//     previous = previous.bind(this);
//     carousel = React.createRef();
//   }

//   renderMetaData = () => (
//     <Helmet
//       title={`${settings.app.name} - ${props.t('listingDetail.title')}`}
//       meta={[
//         {
//           name: 'description',
//           content: props.t('listingDetail.meta'),
//         },
//       ]}
//     />
//   );

//   next() {
//     carousel.next();
//   }

//   previous() {
//     carousel.prev();
//   }

//   prevSlide = () => {
//     carousel.prev();
//   };

//   nextSlide = () => {
//     carousel.next();
//   };

//   render() {
//     const { listing, loading, user, history, navigation, currentUser, handleBookmark, listingBookmarkStatus } = props;
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
//         {renderMetaData()}
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
//                       <div className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
//                         <Icon type="left" className="carousel-arrow-icon" />
//                       </div>
//                       <Carousel className="listing-detail-carousel" ref={node => (carousel = node)} {...status}>
//                         {images &&
//                           images.map((item, id) => (
//                             <div key={id} align="center">
//                               <img src={item.url} style={{ height: '300px' }} />
//                             </div>
//                           ))}
//                       </Carousel>
//                       <div className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
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
import React from 'react';
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
import { IfLoggedIn } from '@gqlapp/user-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
import Review from '@gqlapp/review-client-react/containers/Review';

import settings from '../../../../settings';
import ListingsCarousel from './ListingCarousel';
import BookmarkComponent from './BookmarkComponent';
import CurrencyDisplay from './CurrencyDisplay';

const { TabPane } = Tabs;
const { Meta } = Card;
const BreadCrumbItem = Breadcrumb.Item;

const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const ListingDetailView = props => {
  let carousel = React.useRef();
  const { listing, loading, history, currentUser, handleBookmark, listingBookmarkStatus, t } = props;

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('listingDetail.title')}`}
      meta={[
        {
          name: 'description',
          content: t('listingDetail.meta')
        }
      ]}
    />
  );

  const prevSlide = () => {
    carousel.prev();
  };

  const nextSlide = () => {
    carousel.next();
  };

  const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
  const discount = listing && listing.listingCostArray && listing.listingCostArray.discount;
  const cost = listing && listing.listingCostArray && listing.listingCostArray[0].cost;
  // console.log('cost', cost && cost.toFixed(2));
  const inventoryCount = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
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
  let carouselThumbnail = [];
  carouselThumbnail = youtubeUrl && youtubeUrl.length !== 0 && [...carouselThumbnail, ...youtubeUrl];
  carouselThumbnail = images && images.length !== 0 && [...carouselThumbnail, ...images];
  // console.log('ideo', youtubeUrl);
  // const user = listing && listing.user;
  // const getName = () => {
  //   const firstName = user && user.profile && user.profile.firstName;
  //   const lastName = user && user && user.profile && user.profile.lastName;
  //   if (firstName && lastName) {
  //     return `${firstName} ${lastName}`;
  //   } else if (firstName && !lastName) {
  //     return firstName;
  //   } else {
  //     return 'Name Not Available';
  //   }
  // };

  const status = {
    customPaging: function(i) {
      return (
        <a>
          {console.log(carouselThumbnail)}
          <img
            src={
              (carouselThumbnail &&
                carouselThumbnail.length !== 0 &&
                carouselThumbnail[i] &&
                carouselThumbnail[i].type === 'image' &&
                carouselThumbnail[i].url) ||
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
    // console.log('url', url);
    const newUrl = url.replace('watch?v=', 'embed/');

    return newUrl;
  };
  return (
    <PageLayout>
      {renderMetaData()}
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
          <Spin size="large" />
        </div>
      )}
      {!loading && listing && (
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
                      right: '0'
                    }}
                  >
                    <IfLoggedIn>
                      {listing && (
                        <BookmarkComponent
                          handleBookmark={() => handleBookmark(listing.id, listing.userId)}
                          bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
                          listing={listing}
                        />
                      )}
                    </IfLoggedIn>
                  </div>
                  <div className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
                    <Icon type="left" className="carousel-arrow-icon" />
                  </div>
                  <Carousel className="listing-detail-carousel" ref={node => (carousel = node)} {...status}>
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
                    {images &&
                      images.map((item, id) => (
                        <div key={id} align="center">
                          <img src={item.url} style={{ height: '300px' }} />
                        </div>
                      ))}
                  </Carousel>
                  <div className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
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
              <h1 style={{ fontSize: '25px' }}>{listing && listing.title}</h1>
              <br /> <p>{`SKU: ${listing && listing.sku}`}</p>
              <Divider style={{ margin: '10px 5px' }} />
              <Row>
                <Col lg={8} md={12} xs={12}>
                  {isDiscount
                    ? cost && (
                        <CurrencyDisplay
                          style={{ display: 'inline' }}
                          input={(cost - cost * (discount / 100)).toFixed(2)}
                        />
                      )
                    : cost && <CurrencyDisplay input={cost.toFixed(2)} />}
                </Col>
                {isDiscount && (
                  <Col lg={8} md={12} xs={12}>
                    <Statistic
                      title=""
                      precision={2}
                      valueStyle={{ color: '#cf1322' }}
                      value={discount && discount.toFixed(2) ? discount.toFixed(2) : 0}
                      suffix={'%'}
                      prefix={<Icon type="arrow-down" />}
                    />
                  </Col>
                )}

                <Col lg={8} md={24} xs={24}>
                  <p style={{ fontSize: '16px', marginTop: '5px' }}>
                    {`Availability: ${inventoryCount > 0 ? 'In Stock' : 'Out of Stock'}`}
                  </p>
                </Col>
                <Col span={24}>
                  {isDiscount && (
                    <div style={{ display: 'flex' }}>
                      <CurrencyDisplay input={cost.toFixed(2)} valueStyle={{ textDecoration: 'line-through' }} />
                      &nbsp; &nbsp;
                      <div style={{ lineHeight: '45px', display: 'flex' }}>
                        <div style={{ fontSize: '15px' }}>
                          <b>Saving Amount: &nbsp;</b>
                        </div>
                        {(cost.toFixed(2) - (cost - cost * (discount / 100)).toFixed(2)).toFixed(2)}
                      </div>
                    </div>
                  )}
                  <i>
                    *Including GST
                    <br /> *free shipping
                    <br /> *certified
                  </i>
                </Col>
              </Row>
              <Divider />
              <br />
              <AddToCart listing={listing} history={history} currentUser={currentUser} />
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
          {listing && (
            <>
              <Review
                filter={{
                  isActive: true,
                  modalId: listing && listing.id,
                  modalName: 'listing'
                }}
                // showAdd={false}
                t={t}
              />
            </>
          )}
        </>
      )}
    </PageLayout>
  );
};

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
