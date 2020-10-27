import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Modal } from '@gqlapp/look-client-react';
import { Drawer, Button } from 'antd';

const ModalDrawer = props => {
  const { buttonText, height, children, ghost = false } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  return (
    <Row type="flex" gutter={[24, 24]}>
      <Col lg={24} md={12} xs={0}>
        <Button ghost={ghost} type={'primary'} block onClick={() => setVisibleModal(true)}>
          {buttonText}
        </Button>
        <Modal centered title={buttonText} visible={visibleModal} onCancel={() => setVisibleModal(false)} footer={null}>
          {React.cloneElement(children, { hideModal: () => setVisibleModal(false), showModal: false })}
        </Modal>
      </Col>
      <Col lg={0} md={0} xs={12}>
        <Button ghost={ghost} type={'primary'} block onClick={() => setVisibleDrawer(true)}>
          {buttonText}
        </Button>
        <Drawer
          height={height}
          title={buttonText}
          placement={'bottom'}
          closable={true}
          onClose={() => setVisibleDrawer(false)}
          visible={visibleDrawer}
        >
          {React.cloneElement(children, { hideModal: () => setVisibleDrawer(false), showModal: false })}
        </Drawer>
      </Col>
    </Row>
  );
};
ModalDrawer.propTypes = {
  buttonText: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.func,
  ghost: PropTypes.bool
};
export default ModalDrawer;
