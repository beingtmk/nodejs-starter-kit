const base = '/order';
const checkout = '/checkout';

const ROUTES = {
  adminPanel: base + '/admin-panel',
  order: base + '/order',

  orderDetail: base + '/detail/:id',
  orderDetailLink: base + '/detail/',

  myOrder: base + '/my-order',
  myDelivery: base + '/my-deliveries',

  checkoutCart: base + checkout + '/cart',
  checkoutBill: base + checkout + '/bill',
  checkoutOrder: base + checkout + '/order/:id',
  checkoutOrderLink: base + checkout + '/order/',

  add: base + '/new',
  edit: base + '/edit/:id',
  editLink: base + '/edit/'
};

export default ROUTES;
