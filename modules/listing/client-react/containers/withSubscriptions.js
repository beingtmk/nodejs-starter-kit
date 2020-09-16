import { useEffect, useState } from 'react';
import update from 'immutability-helper';

import LISTINGS_BOOKMARK_SUBSCRIPTION from '../graphql/MyListingsBookmarkSubscription.graphql';
import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';
import LISTING_SUBSCRIPTION from '../graphql/ListingSubscription.graphql';

const useListingWithSubscription = (subscribeToMore, listingId) => {
  const [listingUpdated, setListingUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToListings();
    return () => subscribe();
  });

  const subscribeToListings = () => {
    return subscribeToMore({
      document: LISTING_SUBSCRIPTION,
      variables: { id: listingId },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { listingUpdated: newData }
          }
        }
      ) => {
        setListingUpdated(newData);
      }
    });
  };

  return listingUpdated;
};

const useListingListWithSubscription = subscribeToMore => {
  const [listingsUpdated, setListingsUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToListings();
    return () => subscribe();
  });

  const subscribeToListings = () => {
    return subscribeToMore({
      document: LISTINGS_SUBSCRIPTION,
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { listingsUpdated: newData }
          }
        }
      ) => {
        setListingsUpdated(newData);
      }
    });
  };

  return listingsUpdated;
};

export { useListingListWithSubscription, useListingWithSubscription };

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
  const index = prev.listings.edges.findIndex(x => x.id === node.id);
  prev.listings.edges.splice(index, 1, node);

  return update(prev, {
    listings: {
      $set: [...prev.listings]
    }
  });
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
  prev.myListingsBookmark.edges.splice(index, 1, node);

  return update(prev, {
    myListingsBookmark: {
      $set: [...prev.myListingsBookmark]
    }
  });
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
