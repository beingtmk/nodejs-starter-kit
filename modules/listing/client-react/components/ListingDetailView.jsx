import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import {
  MetaTags,
  PageLayout,
  Row,
  Col,
  Text,
  Carousel,
  Badge,
  Divider,
  BreadcrumbItem,
  Breadcrumb,
  Tooltip,
  Spinner,
  Icon,
  Image
} from '@gqlapp/look-client-react';
import { IfLoggedIn } from '@gqlapp/user-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
import Review from '@gqlapp/review-client-react/containers/Review';
import DiscountComponent from '@gqlapp/discount-client-react/containers/DiscountComponent';
// import { CurrencyCostDisplay } from '@gqlapp/discount-client-react/components/DiscountComponentView';
import { NO_IMG } from '@gqlapp/listing-common';
import ReviewStar from '@gqlapp/review-client-react/containers/ReviewStar';
import { ListingShareMessage } from '@gqlapp/listing-common/SocialSharingMessage';
import HOME_ROUTES from '@gqlapp/home-client-react/routes';
import { MODAL } from '@gqlapp/review-common';

import ROUTES from '../routes';
import ListingCarousel from './ListingCarousel';
import BookmarkComponent from './BookmarkComponent';
import SocialSharingButtons from './SocialSharingButtons';
import { displayDataCheck } from './functions';

// const { TabPane } = Tabs;
// const { Meta } = Card;

// const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const ListingDetailView = props => {
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

  const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
  // const discount =
  //   listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].discount;
  const cost =
    listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].cost;
  // const inventoryCount = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
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
    dots: false
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
      {loading && <Spinner />}
      {!loading && listing && (
        <>
          <div style={{ background: 'white', margin: '0 -200%', padding: '0 200%' }}>
            <br />
            <Row gutter={24}>
              <Col lg={11} md={11} xs={24}>
                <Row gutter={4}>
                  <Col lg={4} md={4} xs={0}>
                    {images &&
                      images.map((item, id) => (
                        <div key={id} style={{ marginBottom: '5px' }} align="center">
                          <Image src={item.url} width={80} />
                        </div>
                      ))}
                  </Col>
                  <Col lg={20} md={20} xs={24}>
                    <div align="center">
                      <div
                        style={{
                          height: '300px',
                          position: 'relative',
                          marginBottom: '30px'
                        }}
                      >
                        <Carousel showArrow={false} {...status}>
                          {images &&
                            images.map((item, id) => (
                              <div key={id} align="center">
                                <Tooltip title="click to zoom" placement="bottom">
                                  <Image src={item.url} height={300} />
                                </Tooltip>
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
                      </div>
                    </div>
                    <AddToCart
                      listing={listing}
                      history={history}
                      currentUser={currentUser}
                      modalId={listing && listing.id}
                      modalName={MODAL[1].value}
                      // catalogueCard={true}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={13} md={13} xs={24}>
                <Row /*  type="flex" align="end" */>
                  <Col lg={20} md={20} xs={21}>
                    <Breadcrumb separator=">">
                      <BreadcrumbItem key="home">
                        <NavLink to={`${HOME_ROUTES.home}`}>
                          <Icon type="HomeOutlined" />
                        </NavLink>
                      </BreadcrumbItem>
                      <BreadcrumbItem key="listing-title">
                        <NavLink to={`${ROUTES.categoryCatalogueLink}${listing.category.id}`}>
                          {listing && displayDataCheck(listing.category.title)}
                        </NavLink>
                      </BreadcrumbItem>
                      <BreadcrumbItem key="listing-title">{displayDataCheck(listing.title)}</BreadcrumbItem>
                    </Breadcrumb>
                    <Col span={24}>
                      <h2 style={{ marginBottom: '0px' }}>{listing.title}</h2>
                      <h4>&nbsp;{listing.user.username}</h4>
                      {isDiscount && <Text type="success">Special Price</Text>}
                      <DiscountComponent modalId={listing && listing.id} modalName={MODAL[1].value} cost={cost} />
                      <ReviewStar
                        filter={{
                          isActive: true,
                          modalId: listing && listing.id,
                          modalName: MODAL[1].value
                        }}
                        currentUser={currentUser}
                        suffix={'reviews'}
                      />
                    </Col>
                  </Col>
                  <Col span={3}>
                    {currentUser && (
                      <IfLoggedIn>
                        <div style={{ marginTop: '4px' }}>
                          <BookmarkComponent
                            handleBookmark={() => handleBookmark(listing.id, listing.user.id)}
                            bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
                            listing={listing}
                            right={'12%'}
                          />
                        </div>
                      </IfLoggedIn>
                    )}
                    <SocialSharingButtons {...message} onShare={onShare} t={t} />
                  </Col>

                  <Col span={24}>
                    <br />
                    <Row gutter={24}>
                      <Col lg={6} md={6} xs={24}>
                        <Icon type="SafetyOutlined" /> &nbsp;
                        <Text type="secondary">Availability</Text>
                      </Col>
                      <Col lg={{ span: 18, offset: 0 }} md={{ span: 18, offset: 0 }} xs={{ span: 24, offset: 2 }}>
                        {listing.listingDetail.inventoryCount > 0 && <Text type="success">In Stock &nbsp;</Text>}
                        {listing.listingDetail.inventoryCount > 0 && listing.listingDetail.inventoryCount < 10 && (
                          <Text type="warning">Only {listing.listingDetail.inventoryCount} left</Text>
                        )}
                        {listing.listingDetail.inventoryCount <= 0 && <Text type="danger">Out Of Stock</Text>}
                      </Col>
                    </Row>
                    <div style={{ paddingTop: '5px' }} />
                    <Row gutter={24}>
                      <Col lg={6} md={6} xs={24}>
                        <Icon type="MenuOutlined" /> &nbsp;
                        <Text type="secondary">Highlights</Text>
                      </Col>
                      <Col lg={{ span: 18, offset: 0 }} md={{ span: 18, offset: 0 }} xs={{ span: 24, offset: 2 }}>
                        {listing &&
                          listing.listingHighlight &&
                          listing.listingHighlight.length > 0 &&
                          listing.listingHighlight.map(lH => (
                            <>
                              <Badge status="default" text={lH.highlight} />
                              <br />
                            </>
                          ))}
                      </Col>
                    </Row>
                    <div style={{ paddingTop: '5px' }} />
                    <Row gutter={24}>
                      <Col lg={6} md={6} xs={24}>
                        <Icon type="DownSquareOutlined" /> &nbsp;
                        <Text type="secondary">Description</Text>
                      </Col>
                      <Col lg={{ span: 18, offset: 0 }} md={{ span: 18, offset: 0 }} xs={{ span: 24, offset: 2 }}>
                        <Text status="default">{listing.description}</Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Divider />
                <Review
                  listing={{
                    title: listing.title,
                    img: images[0]
                  }}
                  filter={{
                    isActive: true,
                    modalId: listing && listing.id,
                    modalName: MODAL[1].value
                  }}
                  showAdd={canUserReview}
                  currentUser={currentUser}
                  t={t}
                />
              </Col>
            </Row>
            <br />
            <br />
            <br />
          </div>
          <ListingCarousel
            filter={{ userId: listing.user.id }}
            onFilter={c => c.node.user.id === listing.user.id}
            currentUser={currentUser}
            title={'Similar Listing (same user)'}
            history={history}
            // style={{ backgroundColor: 'white' }}
            {...props}
          />
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
  showArrow: PropTypes.bool,
  listingBookmarkStatusLoading: PropTypes.bool
};

export default translate('listing')(ListingDetailView);
