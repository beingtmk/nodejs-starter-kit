import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Row, Col, Modal } from '@gqlapp/look-client-react';
import { Drawer, Button } from 'antd';

const ModalBar = styled.div`
  width: 60px;
  height: 6px;
  background: #9b9b9b;
  border-radius: 3px;
  margin-bottom: 5px;
`;
const ModalDrawer = props => {
  const { buttonText, height, children, ghost = false, modalTitle, type = 'primary' } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  return (
    <Row type="flex" gutter={[24, 24]}>
      <Col lg={24} md={12} sm={24} xs={0}>
        <Button ghost={ghost} type={type} block onClick={() => setVisibleModal(true)}>
          {buttonText}
        </Button>
        <Modal centered title={modalTitle} visible={visibleModal} onCancel={() => setVisibleModal(false)} footer={null}>
          {/* {React.cloneElement(children, { hideModal: () => setVisibleModal(false), showModal: false })} */}
          {children}
        </Modal>
      </Col>
      <Col lg={0} md={0} sm={0} xs={24}>
        <Button ghost={ghost} type={type} block onClick={() => setVisibleDrawer(true)}>
          {buttonText}
        </Button>
        <div className="drawer">
          <Drawer
            height={height}
            title={
              <>
                <Row type="flex" justify="center">
                  <ModalBar />
                </Row>
                {modalTitle}
              </>
            }
            className="drawer"
            placement={'bottom'}
            closable={true}
            onClose={() => setVisibleDrawer(false)}
            visible={visibleDrawer}
            headerStyle={{ position: 'fixed', zIndex: '10', width: '100%', borderRadius: '24px 24px 0 0' }}
          >
            <br />
            <br />
            {/* {React.cloneElement(children, { hideModal: () => setVisibleDrawer(false), showModal: false })} */}
            {children}
          </Drawer>
        </div>
      </Col>
    </Row>
  );
};
ModalDrawer.propTypes = {
  buttonText: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.func,
  ghost: PropTypes.bool,
  modalTitle: PropTypes.string,
  type: PropTypes.string
};
export default ModalDrawer;
