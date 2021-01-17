const base = '/listing';
const categoryBase = '/category';
const myListing = '/my-listings';

const ROUTES = {
  adminPanel: base + '/admin-panel',
  listing: base + '/listing',

  categoryCatalogue: base + categoryBase + '/:cid',
  categoryCatalogueLink: base + categoryBase + '/',

  listingCatalogue: base + '/catalogue',

  listingDetail: base + '/detail/:id',
  listingDetailLink: base + '/detail/',

  listingReview: base + '/review/:id',
  listingReviewLink: base + '/review/',

  myListing: base + myListing,
  listingBookmark: base + myListing + '/bookmark',

  add: base + '/new',
  edit: base + '/edit/:id',
  editLink: base + '/edit/'
};

export default ROUTES;
