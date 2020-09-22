import React from 'react';
import { Card, Row, Col, Button, Divider, Icon, Tooltip } from 'antd';

const ButtonGroup = Button.Group;
const AddToCartCard = ({ listing, onSubmit, currentUser }) => {
  return (
    <div>
      <Tooltip title={!currentUser ? 'SignIn To Continue' : 'Continue to Booking'}>
        <ButtonGroup>
          <Button
            size="large"
            // block
            onClick={() => onSubmit(true)}
            // disabled={!bookNowValidation}
          >
            BOOK NOW
          </Button>
          <Button
            type="primary"
            size="large"
            // block
            onClick={() => onSubmit(false)}
            // disabled={!bookNowValidation}
          >
            ADD TO CART <Icon type="shopping" />
          </Button>
        </ButtonGroup>
      </Tooltip>
    </div>
  );
};

export default AddToCartCard;
