import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react';
import resources from './locales';

import NavItemCart from './containers/NavItemCart.web';

const NavLinkOrdersWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/orders" className="nav-link" activeClassName="active">
    {'Orders'}
  </NavLink>
));

const NavLinkMyOrdersWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/my-orders" className="nav-link" activeClassName="active">
    {'My Orders'}
  </NavLink>
));

const NavLinkMyDeliveriesWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/my-delivery" className="nav-link" activeClassName="active">
    {'My Deliveries'}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      path="/orders"
      redirect="/profile"
      role="admin"
      component={loadable(() => import('./containers/Orders.web').then(c => c.default))}
    />,
    <Route exact path="/order" component={loadable(() => import('./containers/Order').then(c => c.default))} />,
    <Route exact path="/my-orders" component={loadable(() => import('./containers/MyOrder').then(c => c.default))} />,
    <Route
      exact
      path="/my-delivery"
      component={loadable(() => import('./containers/MyDelivery').then(c => c.default))}
    />,
    <Route
      exact
      path="/checkout-cart"
      component={loadable(() => import('./containers/CheckoutCart.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/checkout-bill"
      component={loadable(() => import('./containers/CheckoutBill.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/checkout-pay"
      component={loadable(() => import('./containers/CheckoutPay.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/checkout-order/:id"
      component={loadable(() => import('./containers/CheckoutOrder.web').then(c => c.default))}
    />
  ],
  // navItem: [
  //   <MenuItem key="/checkout-cart">
  //     <NavLink to="/checkout-cart" className="nav-link" activeClassName="active">
  //       <NavItemCart />
  //     </NavLink>
  //   </MenuItem>
  // ],
  navItemUser: [
    <MenuItem key="/checkout-cart">
      <NavLink to="/checkout-cart" className="nav-link" activeClassName="active">
        <NavItemCart />
      </NavLink>
    </MenuItem>,
    <IfLoggedIn key="/my-orders">
      <MenuItem>
        <NavLinkMyOrdersWithI18n />
      </MenuItem>
    </IfLoggedIn>,
    <IfLoggedIn key="/my-delivery">
      <MenuItem>
        <NavLinkMyDeliveriesWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemAdmin: [
    <IfLoggedIn key="/orders" role="admin">
      <MenuItem>
        <NavLinkOrdersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'order', resources }]
});
