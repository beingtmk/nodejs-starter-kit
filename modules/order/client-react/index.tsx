import React from 'react';
import { Menu } from 'antd';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { Icon, MenuItem, Spinner } from '@gqlapp/look-client-react';
import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react';
import { default as USER_ROUTES } from '@gqlapp/user-client-react/routes';

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
      redirect={USER_ROUTES.profile}
      role="admin"
      component={loadable(() => import('./containers/Orders.web').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <Route
      exact
      path={ROUTES.order}
      component={loadable(() => import('./containers/Order').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <Route
      exact
      path={ROUTES.orderDetail}
      component={loadable(() => import('./containers/OrderDetails.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,

    <Route
      exact
      path={ROUTES.myOrder}
      component={loadable(() => import('./containers/MyOrder').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.myDelivery}
      component={loadable(() => import('./containers/MyDelivery').then(c => c.default), { fallback: <Spinner /> })}
    />,

    // Checkout
    <AuthRoute
      exact
      redirect={USER_ROUTES.profile}
      role={['admin', 'user']}
      path={ROUTES.checkoutCart}
      component={loadable(() => import('./containers/CheckoutCart.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <AuthRoute
      exact
      redirect={USER_ROUTES.profile}
      role={['admin', 'user']}
      path={ROUTES.checkoutBill}
      component={loadable(() => import('./containers/CheckoutBill.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <AuthRoute
      exact
      redirect={USER_ROUTES.profile}
      role={['admin', 'user']}
      path={ROUTES.checkoutOrder}
      component={loadable(() => import('./containers/CheckoutOrder.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />
  ],
  navItemUser: [
    <IfLoggedIn key={ROUTES.checkoutCart}>
      <MenuItem>
        <NavLink to={ROUTES.checkoutCart} className="nav-link" activeClassName="active">
          <NavItemCart />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>,
    <IfLoggedIn key={ROUTES.myOrder}>
      <SubMenu
        key={ROUTES.order}
        title={
          <>
            <Icon type="SolutionOutlined" /> Order
          </>
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
