import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import { message, Modal, Button } from "antd";
import AddNewGroupView from "../components/AddNewGroupView";
import ADD_GROUP from "../graphql/AddGroup.graphql";
import { removeTypename } from "../constants";
import GroupFormComponent from "../components/GroupFormComponent";

class AddNewGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (values) => {
    const { groupId, addGroup } = this.props;
    console.log(values);
    values.groupId = Number(groupId);
    addGroup(values);
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <Button type="primary" size="large" onClick={this.showModal}>
          Add Group
        </Button>
        <Modal
          centered
          destroyOnClose
          bodyStyle={{ padding: "0" }}
          title=""
          footer={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <GroupFormComponent
            {...this.props}
            cardTitle={"Add Group"}
            onSubmit={this.handleSubmit}
          />
        </Modal>
      </>
    );
  }
}

AddNewGroup.propTypes = {
  addGroup: PropTypes.func,
};

export default compose(
  graphql(ADD_GROUP, {
    props: ({ ownProps: { groupId }, mutate }) => ({
      addGroup: async (values) => {
        console.log(values);

        message.destroy();
        message.loading("Please wait...", 0);
        try {
          const {
            data: { addGroup },
          } = await mutate({
            variables: { input: removeTypename(values) },
          });

          message.destroy();
          message.success("Group added.");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })
)(translate("group")(AddNewGroup));
