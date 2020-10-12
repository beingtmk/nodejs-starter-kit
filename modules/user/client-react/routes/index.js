const base = '/user';

const ROUTES = {
  adminPanel: base + '/admin-panel',

  register: base + '/register',

  login: base + '/login',
  logoutPage: base + '/logout-page',

  profile: base + '/profile',

  resetPassword: base + '/reset-password/:token',
  forgotPassword: base + '/forgot-password',

  userList: base + '/user-list',

  userPublicProfile: base + '/public-profile/:id',
  userPublicProfileLink: base + '/public-profile/',

  add: base + '/new',
  edit: base + '/edit/:id',
  editLink: base + '/edit/'
};

export default ROUTES;
