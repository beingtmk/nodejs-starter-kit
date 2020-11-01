import React from 'react';
import { Icon } from '@gqlapp/look-client-react';

export default class VerificationIconComponent extends React.Component {
  render() {
    if (!this.props.vStatus) {
      return <Icon type="CheckCircleTwoTone" twoToneColor="#ff0000" />;
    } else {
      return <Icon type="CloseCircleTwoTone" twoToneColor="#52c41a" />;
    }
  }
}
