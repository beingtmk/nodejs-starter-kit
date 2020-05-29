import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
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
  Tooltip
} from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';
import AddToCart from '@gqlapp/order-client-react/containers/AddToCart';
// import AddToCart from '../containers/AddToCart';

import settings from '../../../../settings';

const { Meta } = Card;

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
    const { listing, loading, user, history, navigation, currentUser } = this.props;
    const images = listing && listing.listingImages && listing.listingImages.length !== 0 && listing.listingImages;
    const getName = () => {
      const firstName = user && user.user && user.user.profile && user.user.profile.firstName;
      const lastName = user && user.user && user.user.profile && user.user.profile.lastName;
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
            <img src={images[i].imageUrl} style={{ width: '30px', height: '30px', zIndex: '10' }} />
          </a>
        );
      },

      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true

      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };
    return (
      <PageLayout>
        {this.renderMetaData()}
        {!loading && !listing && <h3>{'Listing not found!'}</h3>}
        {loading && !listing ? (
          <Spin />
        ) : (
          listing &&
          user && (
            <Row>
              <Breadcrumb
                separator=">"
                style={{
                  padding: '0px 0 0 10px',
                  marginTop: '5px',
                  marginBottom: '5px'
                }}
              >
                <Breadcrumb.Item>{listing.title}</Breadcrumb.Item>
                <Breadcrumb.Item>{`Listing ${listing.id}`}</Breadcrumb.Item>
              </Breadcrumb>
              <Col xl={16} lg={15} md={13} sm={24}>
                <Card
                  title={<h1>{listing.title}</h1>}
                  style={{
                    background: 'white',
                    borderRadius: '10px'
                  }}
                  cover={
                    <div style={{ height: '50vh', paddingTop: '10px' }} align="center">
                      <div
                        style={{
                          height: '300px',
                          position: 'relative',
                          marginBottom: '30px'
                        }}
                      >
                        <div className="carousel-arrow carousel-arrow-left" onClick={this.prevSlide}>
                          <Icon type="left" className="carousel-arrow-icon" />
                        </div>
                        <Carousel className="listing-detail-carousel" ref={node => (this.carousel = node)} {...status}>
                          {images &&
                            images.map((item, id) => (
                              <div key={id} align="center">
                                <img src={item.imageUrl} style={{ height: '300px' }} />
                              </div>
                            ))}
                        </Carousel>
                        <div className="carousel-arrow carousel-arrow-right" onClick={this.nextSlide}>
                          <Icon type="right" className="carousel-arrow-icon" />
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Divider />
                  <Row>
                    <Col md={12} xs={24}>
                      <a href={`/public-profile/${listing.userId}`}>
                        <Tooltip placement="topLeft" title="Visit User's Profile">
                          <Meta
                            avatar={
                              <Avatar
                                style={{ height: '60px', width: '60px' }}
                                src={(user && user.user && user.user.profile && user.user.profile.avatar) || AVATAR}
                              />
                            }
                            title={<h2 style={{ marginLeft: '10px' }}>{getName()}</h2>}
                            description={
                              <h3
                                style={{
                                  marginLeft: '10px',
                                  marginTop: '-10px'
                                }}
                              >
                                {user && user.user && user.user.username}
                              </h3>
                            }
                          />
                        </Tooltip>
                      </a>
                    </Col>
                    {/* <Col align="right" md={12} xs={0}>
                    <AddToCart listing={listing} currentUser={currentUser} history={history} navigation={navigation} />
                  </Col> */}
                  </Row>
                  <br />
                  <Descriptions layout="horizontal" bordered column={1}>
                    {listing.listingCost.cost && listing.listingCost.cost && (
                      <Descriptions.Item label="Cost">
                        <Statistic
                          value={
                            listing && listing.listingCost && listing.listingCost.cost
                              ? listing.listingCost.cost
                              : 'Free'
                          }
                          prefix={
                            <img
                              height="20px"
                              width="20px"
                              alt=""
                              src="https://res.cloudinary.com/dpvrqxttb/image/upload/v1588191192/edgenus/ddibd7whj8ha7hdml6pq.svg"
                            />
                          }
                        />
                      </Descriptions.Item>
                    )}
                    {<Descriptions.Item label="Description">{listing.description}</Descriptions.Item>}
                    {/* {<Descriptions.Item label="Is Active">{listing.isActive}</Descriptions.Item>} */}
                  </Descriptions>
                </Card>
              </Col>
              <Col xl={8} lg={9} md={11} sm={24}>
                <AddToCart listing={listing}/>
              </Col>
            </Row>
          )
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
  currentUser: PropTypes.object
};

export default translate('listing')(ListingDetailView);
