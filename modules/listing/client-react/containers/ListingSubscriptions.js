import { Message } from '@gqlapp/look-client-react';
import update from 'immutability-helper';

import { HOME_ROUTES } from '@gqlapp/home-client-react';

import LISTINGS_BOOKMARK_SUBSCRIPTION from '../graphql/MyListingsBookmarkSubscription.graphql';
import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';
import LISTING_SUBSCRIPTION from '../graphql/ListingSubscription.graphql';
import LISTING_REVIEW_SUBSCRIPTION from '../graphql/ListingReviewSubscription.graphql';

import ROUTES from '../routes';

export const subscribeToListing = (subscribeToMore, listingId, history) =>
  subscribeToMore({
    document: LISTING_SUBSCRIPTION,
    variables: { id: listingId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            listingUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditListing(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListing(history);
      }
      return newResult;
    }
  });

function onEditListing(prev, node) {
  return update(prev, {
    listing: {
      $set: node
    }
  });
}

const onDeleteListing = history => {
  Message.info('This listing has been deleted!');
  if (history) {
    Message.warn('Redirecting to my listings');
    return history.push(`${ROUTES.myListing}`);
  } else {
    return history.push(`${HOME_ROUTES.home}`);
  }
};

export const subscribeToListings = (subscribeToMore, filter) =>
  subscribeToMore({
    document: LISTINGS_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            listingsUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddListings(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditListings(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListings(prev, node.id);
      }
      return newResult;
    }
  });

function onAddListings(prev, node) {
  // console.log('prev', prev, node);
  if (prev.listings.edges.some(listing => node.id === listing.cursor)) {
    return update(prev, {
      listings: {
        totalCount: {
          $set: prev.listings.totalCount - 1
        },
        edges: {
          $set: prev.listings.edges
        }
      }
    });
  }

  const filteredListings = prev.listings.edges.filter(listing => listing.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ListingEdges'
  };

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
}

function onEditListings(prev, node) {
  const index = prev.listings.edges.findIndex(x => x.node.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ListingEdges'
  };
  if (index) {
    prev.listings.edges.splice(index, 1, edge);
    return update(prev, {
      listings: {
        edges: {
          $set: [...prev.listings.edges]
        }
      }
    });
  }
}

const onDeleteListings = (prev, id) => {
  // console.log('called', id);
  const index = prev.listings.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToListingsBookmark = (subscribeToMore, filter) =>
  subscribeToMore({
    document: LISTINGS_BOOKMARK_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            listingsBookmarkUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddListingsBookmark(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditListingsBookmark(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListingsBookmark(prev, node.id);
      }
      return newResult;
    }
  });

function onAddListingsBookmark(prev, node) {
  // console.log('prev', prev, node);
  if (prev.myListingsBookmark.edges.some(listing => node.id === listing.cursor)) {
    return update(prev, {
      myListingsBookmark: {
        totalCount: {
          $set: prev.myListingsBookmark.totalCount - 1
        },
        edges: {
          $set: prev.myListingsBookmark.edges
        }
      }
    });
  }

  const filteredListings = prev.myListingsBookmark.edges.filter(listing => listing.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ListingEdges'
  };

  return update(prev, {
    myListingsBookmark: {
      totalCount: {
        $set: prev.myListingsBookmark.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
}

function onEditListingsBookmark(prev, node) {
  const index = prev.myListingsBookmark.edges.findIndex(x => x.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ListingEdges'
  };
  if (index) {
    prev.myListingsBookmark.edges.splice(index, 1, edge);
    return update(prev, {
      myListingsBookmark: {
        edges: {
          $set: [...prev.myListingsBookmark.edges]
        }
      }
    });
  }
}

const onDeleteListingsBookmark = (prev, id) => {
  // console.log('called', id);
  const index = prev.myListingsBookmark.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    myListingsBookmark: {
      totalCount: {
        $set: prev.myListingsBookmark.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToListingReview = (subscribeToMore, listingId) =>
  subscribeToMore({
    document: LISTING_REVIEW_SUBSCRIPTION,
    variables: { id: listingId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            listingReview: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      // console.log("mutation", mutation, node);
      if (mutation === 'CREATED') {
        newResult = onAddListingReview(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListingReview(prev, node);
      }
      return newResult;
    }
  });

function onAddListingReview(prev, node) {
  return update(prev, {
    canUserReview: {
      $set: node
    }
  });
}

const onDeleteListingReview = (prev, node) => {
  return update(prev, {
    canUserReview: {
      $set: node
    }
  });
};
