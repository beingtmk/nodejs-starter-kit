import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { AddButton } from '@gqlapp/look-client-react';
import ReviewFormComponent from './ReviewFormComponent';

const ReviewModal = props => {
  const [visible, setVisible] = React.useState(false);
  const { t, cardTitle, addReview, modalName, modalId } = props;
  return (
    <>
      <AddButton onClick={() => setVisible(true)}>{t('addReview')}</AddButton>
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
