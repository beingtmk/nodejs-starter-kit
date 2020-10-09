const base = '/listing';
const myListing = '/my-listings';

const ROUTES = {
  adminPanel: base + '/admin-panel',
  listing: base + '/listing',

  listingCatalogue: base + '/catalogue',
  listingDetail: base + '/detail/:id',
  listingDetailLink: base + '/detail/',

  myListing: base + myListing,
  listingBookmark: base + myListing + '/bookmark',

  add: base + '/new',
  edit: base + '/edit/:id',
  editLink: base + '/edit/'
};

export default ROUTES;
