import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import GroupView from '../components/GroupView';

interface GroupProps {
  t: TranslateFunction;
}

class Group extends React.Component<GroupProps> {
  public render() {
    return <GroupView {...this.props} />;
  }
}

export default translate('group')(Group);
