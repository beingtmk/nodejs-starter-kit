import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'antd';

import ReviewFormComponent from './ReviewFormComponent';

const ReviewModal = props => {
  const [visible, setVisible] = React.useState(false);
  const { t, cardTitle, addReview, modalName, modalId } = props;
  return (
    <>
      <Button type={'primary'} onClick={() => setVisible(true)}>
        <Icon type="plus-circle" /> {'Add review'}
      </Button>
      <Modal title={cardTitle} visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <ReviewFormComponent
          t={t}
          onSubmit={addReview}
          hideModal={() => setVisible(false)}
          showModal={false}
          modalData={{ modalName, modalId }}
        />
      </Modal>
    </>
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
