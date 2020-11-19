import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Image } from 'antd';
import { translate } from '@gqlapp/i18n-client-react';
import {
  MetaTags,
  PageLayout,
  Row,
  Col,
  Tabs,
  TabPane,
  Carousel,
  Badge,
  Descriptions,
  Divider,
  BreadcrumbItem,
  Breadcrumb,
  Tooltip,
  Spinner,
  Icon
} from '@gqlapp/look-client-react';
import { IfLoggedIn } from '@gqlapp/user-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
import Review from '@gqlapp/review-client-react/containers/Review';
import DiscountComponent from '@gqlapp/discount-client-react/containers/DiscountComponent';
import DiscountComponentView from '@gqlapp/discount-client-react/components/DiscountComponentView';
import { NO_IMG } from '@gqlapp/listing-common';
import { ListingShareMessage } from '@gqlapp/listing-common/SocialSharingMessage';
import HOME_ROUTES from '@gqlapp/home-client-react/routes';
import { MODAL } from '@gqlapp/review-common';

import ListingsCarousel from './ListingCarousel';
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
    showArrow,
    t,
    onShare,
    canUserReview
  } = props;

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
      {loading && <Spinner />}
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
                <BreadcrumbItem key="home">
                  <NavLink to={`${HOME_ROUTES.home}`}>
                    <Icon type="HomeOutlined" />
                  </NavLink>
                </BreadcrumbItem>
                <BreadcrumbItem key="listing-title">{listing && displayDataCheck(listing.title)}</BreadcrumbItem>
              </Breadcrumb>
            </Col>

            <Col xs={24} md={13} lg={10} xl={10} style={{ marginBottom: '30px' }}>
              <div align="center">
                <div
                  style={{
                    height: '300px',
                    position: 'relative',
                    marginBottom: '30px'
                  }}
                >
                  <Carousel showArrow={showArrow} {...status}>
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
                          <Tooltip title="click to zoom" placement="bottom">
                            <Image src={item.url} style={{ height: '300px' }} />
                          </Tooltip>
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div align="left" style={{ padding: '5px' }}>
                  <h3>{t('listingDetail.details')}</h3>
                  <p>{displayDataCheck(listing.description)}</p>
                </div>
              </div>
              <Row>
                <Col xl={23} lg={23} md={23} xs={23}></Col>
                <Col xl={1} lg={1} md={1} xs={1}></Col>
              </Row>
            </Col>
            <Col xl={14} lg={14} md={11} xs={24}>
              <Row>
                <Col lg={22} xs={18}>
                  <h1 style={{ fontSize: '25px' }}>{listing && displayDataCheck(listing.title)}</h1>
                </Col>
                <Col lg={1} xs={3} align="right">
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
                <Col lg={1} xs={3} align="right">
                  <SocialSharingButtons {...message} onShare={onShare} t={t} />
                </Col>
              </Row>
              <br /> <p>{`SKU: ${listing && listing.sku}`}</p>
              <Divider style={{ margin: '10px 5px' }} />
              <Row>
                <Col lg={16} md={24} xs={24}>
                  {isDiscount ? (
                    <DiscountComponentView t={t} isDiscount={isDiscount} discount={discount} cost={cost} />
                  ) : (
                    <DiscountComponent modalId={listing && listing.id} modalName={MODAL[1].value} cost={cost} />
                  )}
                </Col>

                <Col lg={8} md={24} xs={24}>
                  <p style={{ fontSize: '16px', marginTop: '5px' }}>
                    {`${t('listingDetail.availability')} ${
                      inventoryCount > 0 ? t('listingDetail.inStock') : t('listingDetail.outOfStock')
                    }`}
                  </p>
                </Col>
              </Row>
              <Divider />
              <br />
              <AddToCart
                listing={listing}
                history={history}
                currentUser={currentUser}
                modalId={listing && listing.id}
                modalName={MODAL[1].value}
              />
            </Col>
          </Row>
          <Divider style={{ marginBottom: '0' }} />
          <div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Additional Info" key="1">
                <Descriptions layout="horizontal" bordered column={1} size="small">
                  <Descriptions.Item label={'Highlight'}>
                    {listing &&
                      listing.listingHighlight &&
                      listing.listingHighlight.length > 0 &&
                      listing.listingHighlight.map(lH => (
                        <>
                          <Badge status="processing" text={lH.highlight} />
                          <br />
                        </>
                      ))}
                  </Descriptions.Item>
                  {/* {<Descriptions.Item label="Is Active">{listing.isActive}</Descriptions.Item>} */}
                </Descriptions>
              </TabPane>
              <TabPane tab="Details" key="2">
                <p>{displayDataCheck(listing.description)}</p>
              </TabPane>
            </Tabs>
          </div>
          <>
            <ListingsCarousel
              filter={{ userId: listing.user.id }}
              currentUser={currentUser}
              title={'Similar Listing (same user)'}
              history={history}
              {...props}
            />
          </>
          {listing && (
            <>
              <Review
                filter={{
                  isActive: true,
                  modalId: listing && listing.id,
                  modalName: MODAL[1].value
                }}
                showAdd={canUserReview}
                currentUser={currentUser}
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
  showArrow: PropTypes.bool,
  listingBookmarkStatusLoading: PropTypes.bool
};

export default translate('listing')(ListingDetailView);
