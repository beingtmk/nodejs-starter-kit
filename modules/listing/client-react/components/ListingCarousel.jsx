import React from 'react';

import { compose } from '@gqlapp/core-common';
import { Spin, Button } from '@gqlapp/look-client-react';
import { SlickCarousel } from '@gqlapp/look-client-react/ui-antd';

import { withListings } from '../containers/ListingOperations';
import RelatedCardComponent from './RelatedCardComponent';

const Content50DataSource = {
  wrapper: { className: 'home-page-wrapper newArrivals-wrapper' },
  page: { className: 'home-page newArrivals' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      { name: 'title', children: 'Similar Listing', className: 'title-h1 newArrivals-title' },
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

class Content5 extends React.PureComponent {
  render() {
    const { listings, loading: loading1, currentUser, currentUserLoading } = this.props;
    const { ...props } = this.props;
    const dataSource = Content50DataSource;
    delete props.isMobile;
    delete props.listings;
    delete props.loadingFeaturedListing;

    const itemLength = listings && listings.edges && listings.edges.length;
    const carouselSettings = itemLength => {
      return {
        className: 'slider variable-width',
        // variableWidth: true,
        autoplay: true,
        easing: 1000,
        infinite: true,
        speed: 500,
        autoplaySpeed: 2000,
        slidesToShow: itemLength >= 4 ? 4 : itemLength,
        slidesToScroll: 1,
        swipeToSlide: true,

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
              slidesToShow: itemLength >= 3 ? 3 : itemLength,
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
          {(loading1 || currentUserLoading) && (
            <div align="center">
              <br />
              <br />
              <br />
              <Spin />
            </div>
          )}
          {listings && listings.totalCount ? (
            <SlickCarousel
              Compo={RelatedCardComponent}
              settings={carouselSettings(itemLength)}
              itemName={'listing'}
              data={listings.edges}
              height={'400px'}
              node={true}
              componentProps={{ currentUser: currentUser }}
              componentStyle={{
                margin: '0 20px 0 0',
                width: '250px'
              }}
            />
          ) : (
            <h3 style={{ textAlign: 'center' }}>No Listings</h3>
          )}
        </div>
      </div>
    );
  }
}

export default compose(withListings)(Content5);
