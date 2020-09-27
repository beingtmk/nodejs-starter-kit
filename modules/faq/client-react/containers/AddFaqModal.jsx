import React from "react";
import { message, Button, Modal } from "antd";
import { graphql } from "react-apollo";

import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";

// import USERS_QUERY from '@gqlapp/user-client-react/graphql/UsersQuery.graphql';
import ADD_FAQ from "../graphql/AddFaq.graphql";

import FaqFormComponent from '../components/FaqFormComponent.web';

class AddFaq extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
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
    const { buttonText, addFaq, currentUser } = this.props;

    const onSubmit = async (values)=>{
      try{
      addFaq(values);
      this.setState({visible:false})}catch(e){
        return e;
      }
    }
    return (
      <>
        <Button  icon="plus" onClick={this.showModal}>
          {buttonText}
        </Button>
        <Modal
          visible={this.state.visible}
          closable={false}
          footer={null}
        >
          <FaqFormComponent cardTitle="Add Faq"  onSubmit={onSubmit} currentUser={currentUser}/>
        </Modal>
      </>
    );
  }
}

export default compose(
  graphql(ADD_FAQ, {
    props: ({ ownProps: { history }, mutate }) => ({
      addFaq: async (values) => {
        message.destroy();
        message.loading("Please wait...", 0);
        try {
          await mutate({
            variables: {
              input: values,
            },
            optimisticResponse: {
              __typename: "Mutation",
              addFaq: {
                __typename: "Faq",
                // id: null,
                ...values,
              },
            },
          });

          message.destroy();
          message.success("Faq added.");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  }),
  // graphql(USERS_QUERY, {
  //   options: ({ orderBy, filter }) => {
  //     return {
  //       fetchPolicy: 'network-only',
  //       variables: { orderBy, filter }
  //     };
  //   },
  //   props({
  //     data: { loading, users, refetch, error, updateQuery, subscribeToMore }
  //   }) {
  //     return {
  //       loading,
  //       users,
  //       refetch,
  //       subscribeToMore,
  //       updateQuery,
  //       errors: error ? error.graphQLErrors : null
  //     };
  //   }
  // }),
  translate("faq")
)(AddFaq);
