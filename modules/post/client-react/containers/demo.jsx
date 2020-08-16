import React, { Component } from 'react';
import {
  Card,
  DeleteIcon,
  DeleteButton,
  EditButton,
  EditIcon,
  PageLayout,
  LayoutCenter,
  AddIcon,
  AddButton,
  NextIcon,
  NextButton,
  ViewButton,
  ViewIcon
} from '@gqlapp/look-client-react';
import { Row, Col } from 'antd';

class Demo extends Component {
  state = {};
  handleClick = item => {
    console.log(item);
  };
  render() {
    return (
      <PageLayout>
        <LayoutCenter>
          <Card>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <DeleteIcon onClick={() => this.handleClick('deleteIcon')} />
              </Col>
              <Col span={12}>
                <DeleteButton onClick={() => this.handleClick('deleteButton')}>Delete</DeleteButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <EditIcon onClick={() => this.handleClick('EditIcon')} />
              </Col>
              <Col span={12}>
                <EditButton onClick={() => this.handleClick('EditButton')}>Edit</EditButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <AddIcon
                  // color="primary"
                  onClick={() => this.handleClick('AddIcon')}
                />
              </Col>
              <Col span={12}>
                <AddButton onClick={() => this.handleClick('AddButton')}>Add</AddButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <NextIcon onClick={() => this.handleClick('NextIcon')} />
              </Col>
              <Col span={12}>
                <NextButton onClick={() => this.handleClick('NextButton')}>Next</NextButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <ViewIcon onClick={() => this.handleClick('ViewIcon')} />
              </Col>
              <Col span={12}>
                <ViewButton onClick={() => this.handleClick('ViewButton')}>View</ViewButton>
              </Col>
            </Row>
          </Card>
        </LayoutCenter>
      </PageLayout>
    );
  }
}

export default Demo;
