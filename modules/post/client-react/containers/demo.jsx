import React, { Component } from 'react';
import { Card, DeleteIcon, DeleteButton } from '@gqlapp/look-client-react';
import { Row, Col } from 'antd';

class Demo extends Component {
  state = {};
  handleClick = item => {
    console.log(item);
  };
  render() {
    return (
      <Card style={{ padding: 20 }}>
        <Row justify="center">
          <Col span={12}>
            <DeleteIcon onClick={() => this.handleClick('deleteIcon')} />
          </Col>
          <Col span={12}>
            <DeleteButton onClick={() => this.handleClick('deleteButton')}>Delete</DeleteButton>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Demo;
