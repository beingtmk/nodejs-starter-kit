import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const HomeAddress = styled.div`
  font-size: 12px;
  padding: 20px;
  padding-bottom: 1px;
  border: 3px solid ${props => props.borderColor || 'rgba(175, 226, 217, 0.81)'};
  background-color: ${props => props.backgroundColor || 'rgba(35, 177, 149, 0.2)'};
  width: 100%;
  border-radius: 10px;

  ${props =>
    props.selectable
      ? css`
          margin-bottom: 15px;
          background-color: #fff;
          width: 275px !important;
        `
      : css`
          margin-top: 15px;
          width: 275px !important;
        `}
  ${props =>
    props.active &&
    css`
      cursor: pointer;
      background-color: ${props => props.backgroundColor || 'rgba(35, 177, 149, 0.2)'};
    `}
  &:hover {
    background-color: ${props => props.selectable && (props.backgroundColor || 'rgba(35, 177, 149, 0.2)')};
  }
`;

const HomeAddressBlock = styled.div`
  font-size: 14px;
  text-shadow: 0.7px 0 0;
  letter-spacing: 0.3px;
  position: relative;
  bottom: 8px;
`;

const AddressLines = styled.h4`
  & > h4 {
    line-height: 12px;
    color: #5d5f5f !important;
    position: relative;
    bottom: 15px;
  }
`;

const AddressView = props => {
  const { addresses, addressId, backgroundColor, borderColor } = props;
  const address = addresses.filter(address => address.id === addressId)[0];
  // console.log('address', address, 'props', props);
  return (
    <>
      <HomeAddress backgroundColor={backgroundColor} borderColor={borderColor} key={address.id}>
        <HomeAddressBlock> Address </HomeAddressBlock>
        <br />
        <AddressLines>
          <h4>{address.streetAddress1 && address.streetAddress1 + ','}</h4>
          <h4>{address.streetAddress2 && address.streetAddress2 + ','}</h4>
          <h4>{address.city && address.city + ','}</h4>
          <h4>{address.state && address.state + ','}</h4>
          <h4>{address.pinCode && address.pinCode + ','}</h4>
        </AddressLines>
      </HomeAddress>
    </>
  );
};

AddressView.propTypes = {
  addresses: PropTypes.array,
  addressId: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string
};

export default AddressView;
