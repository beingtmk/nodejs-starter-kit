import React from "react";
import { Modal, Button, message } from "antd";
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import InviteFormComponent from "../components/InviteFormComponent";
import ADD_GROUP_MEMBER_INVITE from "../graphql/AddGroupMemberInvite.graphql";
import { MemberStatus, MemberType } from "@gqlapp/group-common";

class AddInviteModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    const { addGroupMemberInvite, groupId } = this.props;
    addGroupMemberInvite({
      groupId,
      email: e.userEmail,
      type: e.type,
      status: MemberStatus.ADDED,
    });
    this.setState({
      visible: false,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button
          onClick={this.showModal}
          icon="user-add"
          size="large"
        >
          Add Single Member
        </Button>
        <Modal
          title="Enter User Email"
          visible={this.state.visible}
          okText="Invite"
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <InviteFormComponent onSubmit={this.handleSubmit} />
        </Modal>
      </>
    );
  }
}

export default compose(
  graphql(ADD_GROUP_MEMBER_INVITE, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addGroupMemberInvite: async (values) => {
        message.destroy();
        message.loading("Please wait...", 0);
        try {
          let ansData = await mutate({
            variables: {
              input: values,
            },
          });
          message.destroy();
        } catch (e) {
          message.destroy();
          message.error(`${e}`);
          console.error(e);
        }
      },
    }),
  })
)(AddInviteModal);
