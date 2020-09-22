import React from 'react';
import { graphql } from 'react-apollo';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';

// import CURRENT_USER_ADDRESS_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserAddressQuery.graphql';
// import ADD_OR_EDIT_ADDRESS from '@gqlapp/addresses-client-react/graphql/AddOrEditAddress.graphql';
// import EDIT_USER from '@gqlapp/user-client-react/graphql/EditUser.graphql';
// import CART_QUERY from '../graphql/GetCart.graphql';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import CheckoutBillView from '../components/CheckoutBillView';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';

const ORDER = {
  id: 1,
  orderDetails: [
    {
      id: 1,
      thumbnail: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 1',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 4
    },
    {
      id: 2,
      thumbnail: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 2',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 3
    }
  ]
  // , delivery: {

  // }
};

const ADDRESSES = [
  {
    id: 5,
    streetAddress1: 'Room A308, Manas Hostel, IITG',
    streetAddress2: 'North Guwahati',
    state: 'Assam',
    city: 'Guwahati',
    pinCode: '7810390',
    mobile: '+91-9085626859'
  },
  {
    id: 3,
    streetAddress1: 'Room A308, Manas Hostel, IITG',
    streetAddress2: 'Guwahati, North Guwahati',
    state: 'Assam',
    city: 'Guwahati',
    pinCode: '7810390',
    mobile: '+91-9085626859'
  }
];

class CheckoutBill extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      addressId: 0
    };
  }

  state = {
    product: {
      name: 'Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ',
      // image: naruto2,
      days: 4,
      date: {
        start: "04 Jan'19",
        end: "07 Jan'19"
      },
      refund: 5000,
      totalRent: 1300
    },
    addresses: [
      {
        streetAddress1: 'Room A308, Manas Hostel, IITG',
        streetAddress2: 'North Guwahati',
        state: 'Assam',
        city: 'Guwahati',
        pinCode: '7810390',
        mobile: '+91-9085626859'
      },
      {
        streetAddress1: 'Room A308, Manas Hostel, IITG',
        streetAddress2: 'Guwahati, North Guwahati',
        state: 'Assam',
        city: 'Guwahati',
        pinCode: '7810390',
        mobile: '+91-9085626859'
      }
    ]
  };

  handleSelect = id => {
    console.log('addresses id', id);
    // this.setState({ addressId: id });
  };

  async onSubmit() {
    const { history, navigation } = this.props;

    // Get Values

    console.log('Selected address Id', this.state.addressId);

    console.log('onSubmit Called!');

    // Add Message
    // message.info('Success! Complete Payment.');

    // Redirect
    if (history) {
      return history.push(`/checkout-order/${this.props.getCart.id}`);
    }
    if (navigation) {
      return navigation.goBack();
    }
  }

  render() {
    console.log('props', this.props);
    return (
      <>
        {/* {this.props.loading ? (
          <Loader />
        ) : ( */}
        <CheckoutBillView
          order={ORDER}
          addresses={ADDRESSES}
          onSubmit={this.onSubmit}
          onSelect={this.handleSelect}
          {...this.props}
        />
        {/* )} */}
      </>
    );
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        currentUserLoading: loading,
        currentUser
      };
    }
  }),
  graphql(GET_CART_QUERY, {
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  })
  // graphql(ADD_OR_EDIT_ADDRESS, {
  //   props: ({ mutate, ownProps: { currentUser } }) => ({
  //     addOrEditAddresses: async values => {
  //       message.destroy();
  //       message.loading('Please wait...', 0);
  //       try {
  //         values.userId = currentUser && currentUser.id;
  //         values.pinCode = Number(values.pinCode);
  //         const input = removeTypename(values);
  //         const {
  //           data: { addOrEditAddress }
  //         } = await mutate({
  //           variables: {
  //             input: input
  //           }
  //         });
  //         message.destroy();
  //         message.success(addOrEditAddress);
  //       } catch (e) {
  //         message.destroy();
  //         message.error("Couldn't perform the action");
  //         console.error(e);
  //       }
  //     }
  //   })
  // })
  // graphql(EDIT_USER, {
  //   props: ({ mutate }) => ({
  //     editUser: async input => {
  //       const {
  //         data: { editUser }
  //       } = await mutate({
  //         variables: { input }
  //       });

  //       return editUser;
  //     }
  //   })
  // })
)(translate('order')(CheckoutBill));
