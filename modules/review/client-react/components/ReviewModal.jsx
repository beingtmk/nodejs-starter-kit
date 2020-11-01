import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Drawer } from 'antd';

import { AddButton, Heading, Row, Col } from '@gqlapp/look-client-react';
import ReviewFormComponent from './ReviewFormComponent';

const ReviewModal = props => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);

  const { t, cardTitle, addReview, modalName, modalId } = props;

  return (
    <Row type={'flex'}>
      <Col lg={24} md={24} xs={0}>
        <AddButton onClick={() => setVisibleModal(true)}>{t('addReview')}</AddButton>
        <Modal
          title={
            <>
              <Heading type="3">{cardTitle}</Heading>
            </>
          }
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          footer={null}
        >
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
        <AddButton onClick={() => setVisibleDrawer(true)}>{t('addReview')}</AddButton>
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
