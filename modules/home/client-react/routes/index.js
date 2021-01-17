const base = '/home';

const subBase = '/dynamic-carousel';

const ROUTES = {
  adminPanel: base + subBase + '/admin-panel',

  home: '/',
  home1: base + '/1',
  home2: base + '/2',
  home3: base + '/3',
  home4: base + '/4',
  home5: base + '/5',

  add: base + subBase + '/new',
  edit: base + subBase + '/edit/:id',
  editLink: base + subBase + '/edit/'
};

export default ROUTES;
