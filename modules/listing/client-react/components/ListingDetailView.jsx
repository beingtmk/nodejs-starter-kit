import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Row,
  Col,
  Breadcrumb,
  Divider,
  Spin,
  // Card,
  Descriptions,
  // Avatar,
  Statistic,
  Carousel,
  Icon,
  // Tooltip,
  Tabs
} from 'antd';
import { translate } from '@gqlapp/i18n-client-react';
import { MetaTags, PageLayout } from '@gqlapp/look-client-react';
import { IfLoggedIn } from '@gqlapp/user-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
import Review from '@gqlapp/review-client-react/containers/Review';
import { NO_IMG } from '@gqlapp/listing-common';
import { ListingShareMessage } from '@gqlapp/listing-common/SocialSharingMessage';
import HOME_ROUTES from '@gqlapp/home-client-react/routes';

import ListingsCarousel from './ListingCarousel';
import BookmarkComponent from './BookmarkComponent';
import CurrencyDisplay from './CurrencyDisplay';
import SocialSharingButtons from './SocialSharingButtons';

const { TabPane } = Tabs;
// const { Meta } = Card;
const BreadCrumbItem = Breadcrumb.Item;

// const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const ListingDetailView = props => {
  let carousel = React.useRef();
  const {
    listing,
    loading,
    history,
    currentUser,
    handleBookmark,
    listingBookmarkStatus,
    t,
    onShare,
    canUserReview
  } = props;

  const prevSlide = () => {
    carousel.prev();
  };

  const nextSlide = () => {
    carousel.next();
  };

  const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
  const discount =
    listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].discount;
  const cost =
    listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].cost;
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
  carouselThumbnail = youtubeUrl && youtubeUrl.length !== 0 ? [...carouselThumbnail, ...youtubeUrl] : [];
  carouselThumbnail =
    images && images.length !== 0
      ? [...carouselThumbnail, ...images]
      : carouselThumbnail.length !== 0
      ? [...carouselThumbnail]
      : [{ url: NO_IMG, type: 'image' }];

  const status = {
    // eslint-disable-next-line react/display-name
    customPaging: function(i) {
      return (
        <a>
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
    // autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  };

  const getYoutubeUrl = url => {
    // console.log('url', url);
    const newUrl = url.replace('watch?v=', 'embed/');

    return newUrl;
  };

  const message = listing && ListingShareMessage(listing.id, listing.user.username, listing.title);

  return (
    <PageLayout>
      <MetaTags title={t('listingDetail.title')} description={t('listingDetail.meta')} />
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
                  <NavLink to={`${HOME_ROUTES.home}`}>
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
            </Col>
            <Col xl={14} lg={14} md={11} sm={24}>
              <Row>
                <Col span={22}>
                  <h1 style={{ fontSize: '25px' }}>{listing && listing.title}</h1>
                </Col>
                <Col span={1} align="right">
                  {listing && currentUser && (
                    <IfLoggedIn>
                      <BookmarkComponent
                        handleBookmark={() => handleBookmark(listing.id, listing.user.id)}
                        bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
                        listing={listing}
                        right={'12%'}
                      />
                    </IfLoggedIn>
                  )}
                </Col>
                <Col span={1} align="right">
                  <SocialSharingButtons {...message} onShare={onShare} />
                </Col>
              </Row>
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
            <ListingsCarousel
              filter={{ userId: listing.user.id }}
              currentUser={currentUser}
              title={'Similar Listing (same user)'}
            />
          </>
          {listing && (
            <>
              <Review
                filter={{
                  isActive: true,
                  modalId: listing && listing.id,
                  modalName: 'listing'
                }}
                showAdd={canUserReview}
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
  canUserReview: PropTypes.bool,
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
