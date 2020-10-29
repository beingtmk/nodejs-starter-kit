import React from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

export default class VerificationIconComponent extends React.Component {
  render() {
    if (!this.props.vStatus) {
      return <CloseCircleTwoTone twoToneColor="#ff0000" />;
    } else {
      return <CheckCircleTwoTone twoToneColor="#52c41a" />;
    }
  }
}
