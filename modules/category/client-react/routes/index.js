const base = '/category';

const ROUTES = {
  adminPanel: base + '/admin-panel',
  category: base + '/category',

  categoryCatalogue: base + '/catalogue/:cid',
  categoryCatalogueLink: base + '/catalogue/',
  categoryDetail: base + '/detail/:id',
  categoryDetailLink: base + '/detail/',

  add: base + '/new',
  edit: base + '/edit/:cid',
  editLink: base + '/edit/'
};

export default ROUTES;
