import React from "react";
import { graphql } from "react-apollo";
import { Loader } from "@gqlapp/look-client-react";
import { Link } from "react-router-dom";

import { compose, removeTypename } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import { Button, Modal, Card, Avatar } from "antd";

// import CURRENT_USER_ADDRESS_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserAddressQuery.graphql';
// import ADD_OR_EDIT_ADDRESS from '@gqlapp/addresses-client-react/graphql/AddOrEditAddress.graphql';
// import EDIT_USER from '@gqlapp/user-client-react/graphql/EditUser.graphql';
import ATENDEES_QUERY from "../graphql/AtendeesQuery.graphql";

// import CheckoutBillView from '../components/CheckoutBillView';
// import naruto2 from '../resources/naruto2.jpg';

const { Meta } = Card;

class AtendeesModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

  render() {
    const getName = (user) => {
      const sellerFirstName =
        (user && user.profile && user.profile.firstName) || null;
      const sellerLastName =
        (user && user.profile && user.profile.lastName) || null;
      const sellerName = (f, l) => {
        if (f && l) {
          return `${f} ${l}`;
        } else if (!f || !l) {
          if (f) {
            return f;
          } else {
            return l;
          }
        } else {
          return "Name Not Provided";
        }
      };
      return sellerName(sellerFirstName, sellerLastName);
    };
    console.log("props", this.props);
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          View Atendees
        </Button>
        <Modal
          title="Event Atendees"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.props.loading ? (
            <Loader />
          ) : (
            this.props.getEventAttendees.map((order, key) => (
              <Card>
                <Link
                  target="_blank"
                  className="listing-link"
                  to={`/public-profile/${order && order.user && order.user.id}`}
                >
                  <Meta
                    avatar={<Avatar src={order && order.user &&  order.user.profile && order.user.profile.avatar} />}
                    title={
                      <h4>
                        {getName(order && order.user)}
                        <br />
                      </h4>
                    }
                    description={
                      <h5 style={{ marginTop: "-10px" }}>{order && order.user && order.user.username}</h5>
                    }
                  />
                </Link>
              </Card>
            ))
          )}
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(ATENDEES_QUERY, {
    options: (props) => {
      return {
        variables: { eventId: props.eventId },
      };
    },
    props({ data: { loading, error, getEventAttendees } }) {
      if (error) throw new Error(error);
      return { loading, getEventAttendees };
    },
  })
)(translate("order")(AtendeesModal));
