import React from "react";
import { Modal, Button, message } from "antd";
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import InviteFormComponent from "../components/InviteFormComponent";
import ADD_GROUP_MEMBER_INVITE from "../graphql/AddGroupMemberInvite.graphql";
import { MemberStatus, MemberType } from "../constants";

class AddInviteModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    const { addGroupMemberInvite, groupId } = this.props;
    console.log("handleSubmit", e);
    addGroupMemberInvite({
      groupId,
      userEmail: e.userEmail,
      type: e.type,
      status: MemberStatus.ADDED,
    });
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log("addInviteModalprops", this.props);
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          icon="plus"
          size="large"
        />
        <Modal
          title="Enter User Email"
          visible={this.state.visible}
          okText="Invite"
          footer={null}
        >
          <InviteFormComponent onSubmit={this.handleSubmit} />
        </Modal>
      </div>
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
