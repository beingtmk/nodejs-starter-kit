import React from 'react';
import PropTypes from 'prop-types';

import { CardText } from '@gqlapp/look-client-react';

const AddressCardComponent = ({ address, subTitle, index }) => {
  return (
    <div
      style={{
        backgroundColor: '#c1f7ed',
        // padding: '10% 10% 5% 10%',
        // marginBottom: '2%',
        height: '150px'
      }}
      align="center"
    >
      <h3>
        {subTitle}: {index + 1}
      </h3>
      <CardText>
        {address.city}, {address.streetAddress1}, {address.streetAddress2}, {address.pinCode}, {address.state}
      </CardText>
    </div>
  );
};

AddressCardComponent.propTypes = {
  address: PropTypes.object,
  subTitle: PropTypes.string,
  index: PropTypes.number
};

export default AddressCardComponent;
