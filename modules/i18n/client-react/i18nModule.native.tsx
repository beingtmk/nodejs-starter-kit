import React from 'react';
import { default as i18next } from 'i18next';
import { I18nextProvider } from 'react-i18next';

import ClientModule from '@gqlapp/module-client-react-native';
import commonI18n from '@gqlapp/i18n-common-react';
import { LanguagePicker, Root } from '@gqlapp/look-client-react-native';
import settings from '@gqlapp/config';

import resources from './locales';

const I18nProvider = ({ i18n, children }: any) => {
  return (
    <Root>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Root>
  );
};

const langPicker =
  settings.i18n.enabled && settings.i18n.langPickerRender
    ? new ClientModule({
        drawerItem: [
          {
            LangPicker: {
              screen: (): any => null,
              navigationOptions: {
                drawerLabel: <LanguagePicker key={'picker'} i18n={i18next} />
              },
              skip: true
            }
          }
        ]
      })
    : undefined;

export default settings.i18n.enabled
  ? new ClientModule(commonI18n, langPicker, {
      localization: [{ ns: 'i18n', resources }],
      // eslint-disable-next-line react/display-name
      rootComponentFactory: [() => <I18nProvider i18n={i18next} />]
    })
  : undefined;
