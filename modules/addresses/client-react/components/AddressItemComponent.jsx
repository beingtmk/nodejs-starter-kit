import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Icon, ModalDrawer, DeleteIcon, Button, Card } from '@gqlapp/look-client-react';

import AddressForm from './AddressForm';

const AddressItemComponent = props => {
  const { address, onEdit, onDelete, t } = props;
  return (
    <Card>
      <Button disabled={true}>DEFAULT ADDRESS</Button>
      <br />
      <br />
      <Row>
        <Col span={1} />
        <Col span={23}>
          {`${address.streetAddress1}, ${address.streetAddress2}`}
          <br />
          {`${address.city}, ${address.state}`}
          <br />
          {`${address.pinCode}`}
          <br />
          {/* {`Mobile: ${address.user.mobile}`} */}
          {`Mobile: `}
          <div style={{ display: 'flex', float: 'right' }}>
            {onEdit && (
              <ModalDrawer
                buttonText={<Icon type="EditOutlined" />}
                modalTitle="Edit Address"
                block={false}
                height="auto"
                shape="circle"
                size="md"
                type="default"
              >
                <AddressForm t={t} address={address} onSubmit={onEdit} />
              </ModalDrawer>
            )}
            &nbsp; &nbsp;
            {onDelete && <DeleteIcon title="Are you sure to delete this address?" onClick={onDelete} size="md" />}
          </div>
          <br />
        </Col>
      </Row>
    </Card>
  );
};

AddressItemComponent.propTypes = {
  address: PropTypes.object,
  onEdit: PropTypes.func,
  t: PropTypes.func,
  onDelete: PropTypes.func
};

export default AddressItemComponent;
