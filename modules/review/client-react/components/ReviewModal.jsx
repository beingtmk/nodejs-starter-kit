import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Drawer } from 'antd';

import { AddButton } from '@gqlapp/look-client-react';
import ReviewFormComponent from './ReviewFormComponent';

const ReviewModal = props => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);

  const { t, cardTitle, addReview, modalName, modalId } = props;

  return (
    <Row type={'flex'}>
      <Col lg={24} md={24} xs={0}>
        <AddButton onClick={() => setVisibleModal(true)}>{'Add review'}</AddButton>
        <Modal title={cardTitle} visible={visibleModal} onCancel={() => setVisibleModal(false)} footer={null}>
          <ReviewFormComponent
            t={t}
            onSubmit={addReview}
            hideModal={() => setVisibleModal(false)}
            showModal={false}
            modalData={{ modalName, modalId }}
          />
        </Modal>
      </Col>
      <Col lg={0} md={0} xs={24}>
        <AddButton onClick={() => setVisibleDrawer(true)}>{'Add review'}</AddButton>
        <Drawer
          height={'80%'}
          title={cardTitle}
          placement={'bottom'}
          closable={true}
          onClose={() => setVisibleDrawer(false)}
          visible={visibleDrawer}
        >
          <ReviewFormComponent
            t={t}
            onSubmit={addReview}
            hideModal={() => setVisibleModal(false)}
            showModal={false}
            modalData={{ modalName, modalId }}
          />
        </Drawer>
      </Col>
    </Row>
  );
};

ReviewModal.propTypes = {
  t: PropTypes.func,
  addReview: PropTypes.func,
  cardTitle: PropTypes.string,
  modalName: PropTypes.string,
  modalId: PropTypes.number
};
export default ReviewModal;
