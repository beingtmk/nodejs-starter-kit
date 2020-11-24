import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@gqlapp/look-client-react';
import ListingItemComponent from './CartItemComponent';

// const pStyle = {
//   fontSize: 16,
//   color: 'rgba(0,0,0,0.85)',
//   lineHeight: '24px',
//   display: 'block',
//   marginBottom: 16
// };

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)'
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)'
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export default class ListingDrawerComponent extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const listing = this.props.listing;
    const { t } = this.props;
    return (
      <div>
        <a onClick={this.showDrawer}>View Listing</a>
        <Drawer width={640} placement="right" closable={false} onClose={this.onClose} visible={this.state.visible}>
          {listing.map(item => (
            <ListingItemComponent
              t={t}
              // history={history}
              item={item}
              // deleteProduct={delListing}
              // currentUser={currentUser}
            />
          ))}
        </Drawer>
      </div>
    );
  }
}

ListingDrawerComponent.propTypes = {
  listing: PropTypes.object.isRequired,
  t: PropTypes.func
};

DescriptionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
