import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { translate } from '@gqlapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@gqlapp/look-client-react-native';
import ClientModule from '@gqlapp/module-client-react-native';

import PaginationDemo from './containers/PaginationDemo';
import resources from './locales';

const HeaderTitleWithI18n = translate('pagination')(HeaderTitle);

export default new ClientModule({
  drawerItem: [
    {
      Pagination: {
        screen: createStackNavigator({
          Pagination: {
            screen: PaginationDemo,
            navigationOptions: ({ navigation }) => ({
              headerTitle: <HeaderTitleWithI18n style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerForceInset: {}
            })
          }
        }),
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n />
        }
      }
    }
  ],
  localization: [{ ns: 'pagination', resources }]
});
