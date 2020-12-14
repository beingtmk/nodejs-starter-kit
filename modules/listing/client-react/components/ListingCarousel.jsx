import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Button, Empty, Spinner, SlickCarousel } from '@gqlapp/look-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';

import ROUTES from '../routes';
import { withListings } from '../containers/ListingOperations';
import RelatedCardComponent from './RelatedCardComponent';
import { subscribeToListings } from '../containers/ListingSubscriptions';

const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children =
    typeof item.children === 'string' && item.children.match(isImg)
      ? React.createElement('img', { src: item.children, alt: 'img' })
      : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

const ListingCarousel = props => {
  const {
    listings,
    loading: loading1,
    currentUser,
    currentUserLoading,
    history,
    cartLoading,
    onDelete,
    getCart,
    filter,
    onFilter = () => {
      return true;
    }
  } = props;

  React.useEffect(() => {
    const subscribe = subscribeToListings(props.subscribeToMore, filter);
    return () => subscribe();
  });
  const dataSource = {
    wrapper: { className: 'home-page-wrapper newArrivals-wrapper' },
    page: { className: 'home-page newArrivals' },
    OverPack: { playScale: 0.3, className: '' },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: props.title,
          className: 'title-h1 newArrivals-title'
        },
        {
          name: 'content',
          className: 'content-underline',
          children: (
            <div align="center">
              <div key="line" className="title-line-wrapper" align="left">
                <div
                  className="title-line"
                  // style={{ transform: "translateX(-64px)" }}
                />
              </div>
            </div>
          )
        }
      ]
    },
    block: {
      className: 'newArrivals-img-wrapper',
      gutter: 16
    }
  };

  delete props.isMobile;

  const itemLength = listings && listings.edges && displayDataCheck(listings.edges.length);
  const carouselSettings = itemLength => {
    return {
      className: 'slider variable-width',
      // variableWidth: true,
      // autoplay: true,
      easing: 1000,
      infinite: true,
      speed: 500,
      autoplaySpeed: 2000,
      slidesToShow: itemLength >= 4 ? 4 : itemLength,
      slidesToScroll: 1,
      swipeToSlide: true,
      lazyLoad: true,

      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: itemLength >= 4 ? 4 : itemLength,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: itemLength >= 4 ? 4 : itemLength,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: itemLength >= 2 ? 2 : itemLength,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  };
  return (
    <div {...props} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div key="title" {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </div>
        {(loading1 || currentUserLoading) && <Spinner size="small" />}
        {listings && listings.totalCount ? (
          <SlickCarousel
            Compo={RelatedCardComponent}
            settings={carouselSettings(itemLength)}
            itemName={'listing'}
            data={listings.edges.filter(onFilter)}
            height={'500px'}
            node={true}
            getCart={getCart}
            onDelete={onDelete}
            modalName="listing"
            componentProps={{
              currentUser,
              history,
              loading: cartLoading
            }}
            componentStyle={{
              margin: '0 4px',
              width: '256px'
            }}
          />
        ) : (
          !loading1 && (
            <div align="center">
              <Empty description={'No Listings.'}>
                <Link to={`${ROUTES.add}`}>
                  <Button color="primary">Add</Button>
                </Link>
              </Empty>
            </div>
          )
        )}
      </div>
    </div>
  );
};

ListingCarousel.propTypes = {
  currentUser: PropTypes.object,
  getCart: PropTypes.object,
  history: PropTypes.object.isRequired,
  title: PropTypes.string,
  currentUserLoading: PropTypes.bool,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  cartLoading: PropTypes.bool,
  listings: PropTypes.object,
  isMobile: PropTypes.bool,
  subscribeToMore: PropTypes.func,
  onFilter: PropTypes.func,
  filter: PropTypes.object
};

export default compose(withListings)(ListingCarousel);
