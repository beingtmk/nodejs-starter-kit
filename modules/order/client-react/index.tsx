import React from 'react';
import { Menu, Icon } from 'antd';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';

import NavItemCart from './containers/NavItemCart.web';

const { SubMenu } = Menu;

const NavLinkOrdersWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    {'Orders'}
  </NavLink>
));

const NavLinkMyOrdersWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.myOrder} className="nav-link" activeClassName="active">
    {'My Orders'}
  </NavLink>
));

const NavLinkMyDeliveriesWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.myDelivery} className="nav-link" activeClassName="active">
    {'My Deliveries'}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      path={ROUTES.adminPanel}
      redirect="/profile"
      role="admin"
      component={loadable(() => import('./containers/Orders.web').then(c => c.default))}
    />,

    <Route exact path={ROUTES.order} component={loadable(() => import('./containers/Order').then(c => c.default))} />,

    <Route
      exact
      path={ROUTES.orderDetail}
      component={loadable(() => import('./containers/OrderDetails.web').then(c => c.default))}
    />,

    <Route
      exact
      path={ROUTES.myOrder}
      component={loadable(() => import('./containers/MyOrder').then(c => c.default))}
    />,
    <Route
      exact
      path={ROUTES.myDelivery}
      component={loadable(() => import('./containers/MyDelivery').then(c => c.default))}
    />,

    // Checkout
    <Route
      exact
      path={ROUTES.checkoutCart}
      component={loadable(() => import('./containers/CheckoutCart.web').then(c => c.default))}
    />,
    <Route
      exact
      path={ROUTES.checkoutBill}
      component={loadable(() => import('./containers/CheckoutBill.web').then(c => c.default))}
    />,
    <Route
      exact
      path={ROUTES.checkoutOrder}
      component={loadable(() => import('./containers/CheckoutOrder.web').then(c => c.default))}
    />
  ],
  navItemUser: [
    <MenuItem key={ROUTES.checkoutCart}>
      <NavLink to={ROUTES.checkoutCart} className="nav-link" activeClassName="active">
        <NavItemCart />
      </NavLink>
    </MenuItem>,
    <IfLoggedIn key={ROUTES.myOrder}>
      <SubMenu
        key={ROUTES.order}
        title={
          <span>
            <Icon type="solution" />
            <span>Order</span>
          </span>
        }
      >
        <MenuItem>
          <NavLinkMyOrdersWithI18n />
        </MenuItem>
        <MenuItem>
          <NavLinkMyDeliveriesWithI18n />
        </MenuItem>
      </SubMenu>
    </IfLoggedIn>
  ],
  navItemAdmin: [
    <IfLoggedIn key={ROUTES.adminPanel} role="admin">
      <MenuItem>
        <NavLinkOrdersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'order', resources }]
});