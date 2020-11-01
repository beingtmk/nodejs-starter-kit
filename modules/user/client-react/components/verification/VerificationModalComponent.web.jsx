import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
// To Do Abstract Out
import VerificationIconComponent from './VerificationIconComponent';
import ModalDrawer from '../ModalDrawer';

class VerificationModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <ModalDrawer
          buttonText={
            <>
              {this.props.button}&nbsp;
              <VerificationIconComponent vStatus={this.props.vStatus} />
            </>
          }
          type="dashed"
          modalTitle={this.props.title}
        >
          {this.props.children}
        </ModalDrawer>
      </div>
    );
  }
}

VerificationModalComponent.propTypes = {
  children: PropTypes.array.isRequired,
  button: PropTypes.string,
  title: PropTypes.string,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  DL: PropTypes.object,
  vStatus: PropTypes.bool,
  t: PropTypes.func
};

export default translate('user')(VerificationModalComponent);
