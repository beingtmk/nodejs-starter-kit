import React from 'react';
import BaseModule, { BaseModuleShape } from './BaseModule';

/**
 * React client feature modules interface.
 */
export interface ClientModuleShape extends BaseModuleShape {
  // Route list
  route?: Array<React.ReactElement<any>>;
  // Top left navigation links
  navItem?: Array<React.ReactElement<any>>;
  // Top right navigation links
  navItemRight?: Array<React.ReactElement<any>>;
  // Development tools
  navItemTest?: Array<React.ReactElement<any>>;
  // Browse tools
  navItemBrowse?: Array<React.ReactElement<any>>;
  // User specific
  navItemUser?: Array<React.ReactElement<any>>;
  // Admin specific
  navItemAdmin?: Array<React.ReactElement<any>>;
  // Acount specific
  navItemAccount?: Array<React.ReactElement<any>>;
}

interface ClientModule extends ClientModuleShape {}

/**
 * React client feature module implementation.
 */
class ClientModule extends BaseModule {
  /**
   * Constructs React client feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  /**
   * @returns client-side React route components list
   */
  get routes() {
    return (
      this.route || []
    ).map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
      React.cloneElement(component, { key: component.key || idx + items.length })
    );
  }

  /**
   * @returns client-side top left navbar link component list
   */
  get navItems() {
    return this.navItem
      ? this.navItem.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : null;
  }

  get navItemsRight() {
    return this.navItemRight
      ? this.navItemRight.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : false;
  }

  get navItemsTest() {
    return this.navItemTest
      ? this.navItemTest.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : false;
  }

  get navItemsBrowse() {
    return this.navItemBrowse
      ? this.navItemBrowse.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : false;
  }

  get navItemsUser() {
    return this.navItemUser
      ? this.navItemUser.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : false;
  }

  get navItemsAdmin() {
    return this.navItemAdmin
      ? this.navItemAdmin.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : false;
  }

  get navItemsAccount() {
    return this.navItemAccount
      ? this.navItemAccount.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : null;
  }
}

export default ClientModule;
