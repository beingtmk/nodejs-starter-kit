import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';

import { translate } from '@gqlapp/i18n-client-react';
import {
  MetaTags,
  PageLayout,
  Row,
  Col,
  Text,
  Badge,
  Divider,
  BreadcrumbItem,
  Breadcrumb,
  Spinner,
  Icon
} from '@gqlapp/look-client-react';
import { IfLoggedIn } from '@gqlapp/user-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
import { Review, ReviewStar } from '@gqlapp/review-client-react';
import { DiscountComponent } from '@gqlapp/discount-client-react';
import { ListingShareMessage } from '@gqlapp/listing-common/SocialSharingMessage';
import { HOME_ROUTES } from '@gqlapp/home-client-react';
import { MODAL } from '@gqlapp/review-common';

import ROUTES from '../routes';
import ListingCarousel from './ListingCarousel';
import ListingDetailImgCarousel from './ListingDetailImgCarousel';
import BookmarkComponent from './BookmarkComponent';
import SocialSharingButtons from './SocialSharingButtons';
import { displayDataCheck } from './functions';

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
          <div
            style={{
              background: 'white',
              margin: '0 -200%',
              padding: '0 200%'
            }}
          >
            <br />
            <Row gutter={24}>
              <Col lg={11} md={11} xs={24}>
                <StickyContainer style={{ height: '100%' /* , zIndex: '1' */ }}>
                  <Sticky>
                    {({ style, isSticky }) => (
                      <div style={{ ...style }}>
                        <div style={{ height: isSticky ? '60px' : '0px' }} />
                        <ListingDetailImgCarousel images={images} youtubeUrl={youtubeUrl} carouselLayout={false} />
                        <Divider />
                        <AddToCart
                          listing={listing}
                          history={history}
                          currentUser={currentUser}
                          modalId={listing && listing.id}
                          modalName={MODAL[1].value}
                          // catalogueCard={true}
                        />
                      </div>
                    )}
                  </Sticky>
                </StickyContainer>
              </Col>
              <Col lg={13} md={13} xs={24}>
                <Row /*  type="flex" align="end" */>
                  <Col lg={22} md={22} xs={21}>
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
                      <div style={{ display: 'flex' }}>
                        <h4>&nbsp;{listing.user.username}</h4> &nbsp;
                        <h4>&nbsp;{listing.brand}</h4>
                      </div>
                      {isDiscount && <Text type="success">Special Price</Text>}
                      <Row>
                        <Col span={15}>
                          <DiscountComponent modalId={listing && listing.id} modalName={MODAL[1].value} cost={cost} />
                        </Col>
                      </Row>
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
                  <Col lg={2} md={2} xs={3}>
                    <Row>
                      <Col lg={12} xs={24} align="right">
                        {currentUser && (
                          <IfLoggedIn>
                            {/* <div style={{ marginTop: '4px' }}> */}
                            <BookmarkComponent
                              handleBookmark={() => handleBookmark(listing.id, listing.user.id)}
                              bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
                              listing={listing}
                              right={'12%'}
                            />
                            {/* </div> */}
                          </IfLoggedIn>
                        )}
                      </Col>
                      {/* </Row> */}
                      {/* <Row> */}
                      <Col lg={12} xs={24} align="right">
                        <SocialSharingButtons {...message} onShare={onShare} t={t} />
                      </Col>
                    </Row>
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
            alignTitle="left"
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
