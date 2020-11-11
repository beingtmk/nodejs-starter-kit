const base = '/category';

const ROUTES = {
  adminPanel: base + '/admin-panel',
  category: base + '/category',

  categoryCatalogue: base + '/catalogue/:id',
  categoryCatalogueLink: base + '/catalogue/',
  categoryDetail: base + '/detail/:id',
  categoryDetailLink: base + '/detail/',

  add: base + '/new',
  edit: base + '/edit/:id',
  editLink: base + '/edit/'
};

export default ROUTES;
