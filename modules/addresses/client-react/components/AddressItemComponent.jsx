import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Row, Col, Icon, ModalDrawer, DeleteIcon, Button, Card } from '@gqlapp/look-client-react';

import AddressForm from './AddressForm';

const CustomCard = styled(Card)`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      background-color: ${props => `${props.backgroundColor} !important` || 'rgba(35, 177, 149, 0.2) !important'};
    `}
  &:hover {
    background-color: ${props => props.backgroundColor || 'rgba(35, 177, 149, 0.2) !important'};
  }
`;

const AddressItemComponent = props => {
  const { address, onEdit, active, setActive, onDelete, t, setDefault } = props;

  return (
    <CustomCard active={active === address.id} backgroundColor={'#d6f2ff'} onClick={() => setActive(address.id)}>
      {setDefault && (
        <>
          <Button onClick={() => setDefault(address.id)} disabled={address.isDefault}>
            {address.isDefault ? 'DEFAULT ADDRESS' : 'OTHER ADDRESS'}
          </Button>
          <br />
          <br />
        </>
      )}
      <Row>
        <Col span={1} />
        <Col span={23}>
          <h3>
            <strong>{`${address.firstName} ${address.lastName}`}</strong>
          </h3>
          {`${address.streetAddress1}, ${address.streetAddress2}`}
          <br />
          {`${address.city}, ${address.state}, ${address.country}`}
          <br />
          {`${address.pinCode}`}
          <br />
          {`Mobile: ${address.mobile}`}
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
    </CustomCard>
  );
};

AddressItemComponent.propTypes = {
  address: PropTypes.object,
  onEdit: PropTypes.func,
  t: PropTypes.func,
  onDelete: PropTypes.func,
  active: PropTypes.number,
  setActive: PropTypes.func,
  setDefault: PropTypes.func
};

export default AddressItemComponent;
