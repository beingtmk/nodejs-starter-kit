import React, { Component } from 'react';
import { compose } from '@gqlapp/core-common';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import BookmarkComponent from './BookmarkComponent';
import { withListingBookmarkStatus, withToogleListingBookmark } from '../containers/ListingOperations';

const { Meta } = Card;
class RelatedCardComponent extends Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }

  bookmarkListing = async (id, userId) => {
    try {
      console.log('id', id, 'userId', userId);
      await this.props.addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  render() {
    // To Do: check if it is not present then set as default value
    const { currentUser, loading, listingBookmarkStatus } = this.props;
    let listing = this.props.listing;

    const listing_id = listing && listing.id;
    const listing_img =
      listing && listing.listingImages.length !== 0 && listing.listingImages && listing.listingImages[0].imageUrl;

    const rent_per_day = listing && listing.listingCost && listing.listingCost.cost;

    return (
      <>
        {!(typeof listingBookmarkStatus == 'undefined') && (
          <BookmarkComponent
            handleBookmark={() => this.bookmarkListing(listing.id, currentUser.id)}
            bookmarkStatus={listingBookmarkStatus && listingBookmarkStatus}
          />
        )}
        <Link className="listing-link" to={`/listing-detail/${listing_id}`}>
          <Card
            bodyStyle={{ margin: '0px' }}
            hoverable
            cover={
              <div
                style={{
                  overflow: 'hidden',

                  height: '230px',

                  borderRadius: '8px 8px 0px 0px'
                }}
                align="center"
              >
                <img
                  src={listing_img}
                  style={{
                    height: '100%'
                  }}
                />
              </div>
            }
          >
            <Meta
              title={<span>{listing.title}</span>}
              description={
                <>
                  <h4>&#8377;{rent_per_day} per day</h4>
                </>
              }
            />
          </Card>
        </Link>
      </>
    );
  }
}

RelatedCardComponent.propTypes = {
  listing: PropTypes.object.isRequired,
  addOrRemoveListingBookmark: PropTypes.func,
  currentUser: PropTypes.object,
  listingBookmarkStatus: PropTypes.bool
};

export default compose(withListingBookmarkStatus, withToogleListingBookmark)(RelatedCardComponent);
