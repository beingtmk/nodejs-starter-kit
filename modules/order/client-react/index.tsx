import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import loadable from '@loadable/component';

import { compose } from '@gqlapp/core-common';
import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { Icon, MenuItem, Spinner, SubMenu } from '@gqlapp/look-client-react';
import { AuthRoute, IfLoggedIn, USER_ROUTES } from '@gqlapp/user-client-react';
import { withPlatform } from '@gqlapp/setting-client-react/containers/SettingOperations';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';
import { PLATFORM_TYPE } from '@gqlapp/setting-common';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';
import NavItemCart from './containers/NavItemCart.web';

export { default as ORDER_ROUTES } from './routes';

const NavLinkUsertWithI18n = compose(
  withCurrentUser,
  withPlatform
)(({ platform, currentUser }: { platform: any; currentUser: any }) => {
  return (
    <>
      <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
        <NavLink to={ROUTES.myOrder} className="nav-link" activeClassName="active">
          <Icon type="FileOutlined" />
          {'My Orders'}
        </NavLink>
      </MenuItem>
      {platform.type === PLATFORM_TYPE[1] ? (
        <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
          <NavLink to={ROUTES.myDelivery} className="nav-link" activeClassName="active">
            <Icon type="CarOutlined" />
            {'My Deliveries'}
          </NavLink>
        </MenuItem>
      ) : currentUser.role === 'admin' ? (
        <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
          <NavLink to={ROUTES.myDelivery} className="nav-link" activeClassName="active">
            <Icon type="CarOutlined" />
            {'My Deliveries'}
          </NavLink>
        </MenuItem>
      ) : null}
    </>
  );
});

const NavLinkOrdersWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="FileOutlined" />
    {'Orders'}
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
  navItem: [
    <IfLoggedIn key={ROUTES.checkoutCart}>
      <MenuItem>
        <NavItemCart />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemUser: [
    <IfLoggedIn key={ROUTES.myOrder}>
      <SubMenu
        key={ROUTES.order}
        title={
          <>
            <Icon type="SolutionOutlined" /> Order
          </>
        }
      >
        <NavLinkUsertWithI18n />
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
