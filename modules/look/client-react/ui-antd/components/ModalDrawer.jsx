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
  margin-bottom: 10px;
`;
const ModalDrawer = props => {
  const {
    buttonText,
    height,
    children,
    ghost = false,
    modalTitle,
    type = 'primary',
    shape = 'default',
    style,
    size,
    block = true,
    disabled
  } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  // console.log(children);
  return (
    <Row>
      <Col lg={24} md={24} sm={24} xs={0}>
        <Button
          ghost={ghost}
          type={type}
          shape={shape}
          size={size}
          style={style}
          block={block}
          disabled={disabled}
          onClick={() => setVisibleModal(true)}
        >
          {buttonText}
        </Button>
        <Modal
          className={'curved-border'}
          centered
          title={modalTitle}
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          footer={null}
        >
          {React.cloneElement(children, { hideModal: () => setVisibleModal(false), showModal: false })}
          {/* {children} */}
        </Modal>
      </Col>
      <Col lg={0} md={0} sm={0} xs={24}>
        <Button
          ghost={ghost}
          type={type}
          shape={shape}
          size={size}
          {...style}
          disabled={disabled}
          block
          onClick={() => setVisibleDrawer(true)}
        >
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
            <br />
            {React.cloneElement(children, { hideModal: () => setVisibleModal(false), showModal: false })}
          </Drawer>
        </div>
      </Col>
    </Row>
  );
};
ModalDrawer.propTypes = {
  buttonText: PropTypes.object,
  height: PropTypes.string,
  children: PropTypes.object,
  ghost: PropTypes.bool,
  modalTitle: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool
};
export default ModalDrawer;
