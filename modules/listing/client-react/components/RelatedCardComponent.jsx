import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Rate, Avatar, Divider, Button, Icon, Tooltip } from 'antd';

const { Meta } = Card;

class RelatedCardComponent extends Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }

  render() {
    // To Do: check if it is not present then set as default value
    let listing = this.props.item;

    const listing_id = listing && listing.id;
    const listing_img =
      listing && listing.listingImages.length !== 0 && listing.listingImages && listing.listingImages[0].imageUrl;

    const rent_per_day = listing && listing.listingCost && listing.listingCost.cost;

    return (
      <>
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
                  <Divider style={{ margin: '5px 0px' }} />
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
  item: PropTypes.object.isRequired
};

export default RelatedCardComponent;
