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
  ViewIcon,
  SubmitIcon,
  SubmitButton,
  RemoveIcon,
  RemoveButton,
  ActiveIcon,
  ActiveButton,
  PublishIcon,
  PublishButton,
  Row,
  Col,
  Message
} from '@gqlapp/look-client-react';

class Demo extends Component {
  state = {
    active: 'false',
    publish: 'false',
    publishName: 'Not Publish',
    activeName: 'Deactive'
  };
  handleClick = item => {
    console.log(item);
    Message.info(item);
  };
  handleActive = item => {
    console.log(item);
    Message.info(item);
    if (this.state.active === 'false') {
      this.setState({ active: 'true', activeName: 'Active' });
    } else this.setState({ active: 'false', activeName: 'Deactive' });
  };
  handlePublish = item => {
    console.log(item);
    Message.info(item);

    if (this.state.publish === 'false') {
      this.setState({ publish: 'true', publishName: 'Published' });
    } else this.setState({ publish: 'false', publishName: 'Not Publish' });
  };
  render() {
    const { active, publish, publishName, activeName } = this.state;
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
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <SubmitIcon confirm={true} onClick={() => this.handleClick('SubmitIcon')} />
              </Col>
              <Col span={12}>
                <SubmitButton confirm={true} onClick={() => this.handleClick('SubmitButton')}>
                  Submit
                </SubmitButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <RemoveIcon onClick={() => this.handleClick('RemoveIcon')} />
              </Col>
              <Col span={12}>
                <RemoveButton onClick={() => this.handleClick('RemoveButton')}>Remove</RemoveButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <ActiveIcon active={active} onClick={() => this.handleActive('ActiveIcon')} />
              </Col>
              <Col span={12}>
                <ActiveButton active={active} onClick={() => this.handleActive('ActiveButton')}>
                  {activeName}
                </ActiveButton>
              </Col>
            </Row>
            <Row justify="center" style={{ padding: 10 }}>
              <Col span={12}>
                <PublishIcon publish={publish} onClick={() => this.handlePublish('PublishIcon')} />
              </Col>
              <Col span={12}>
                <PublishButton publish={publish} onClick={() => this.handlePublish('PublishButton')}>
                  {publishName}
                </PublishButton>
              </Col>
            </Row>
          </Card>
        </LayoutCenter>
      </PageLayout>
    );
  }
}

export default Demo;
