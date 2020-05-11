import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import ADD_TO_CART from '../graphql/AddToCart.graphql';

import AddTocartCard from '../components/AddTocartCard';

class AddToCart extends React.Component {
  onSubmit = async redirect => {
    const { history, navigation, currentUser } = this.props;

    if (!currentUser) {
      return history.push('/login/');
    }
    // Get Values
    // console.log(values);
    // const listing = this.props.listing;
    // const obj = {
    //   listingId: listing.id,
    //   userId: currentUser.id,
    // };
    // console.log(history, "called");
    // // Call Mutation

    // try {
    //   await this.props.addToCart(obj);
    // } catch (e) {
    //   message.error("Failed!");
    //   console.log(e);
    //   // throw new FormError('Failed!', e);
    // }

    // // Add Message
    // message.success("Success! Complete your Order.");

    // // Redirect
    // if (history || navigation) {
    //   if (history && redirect) {
    //     return history.push("/checkout-cart/");
    //   }
    // }
  };

  render() {
    // const cancellationPolicy = t('listingDetail.content.cancellationPolicy');
    const cancellationPolicy = 'This is the cancellationPolicy';
    // const damagePolicy = t('listingDetail.content.damagePolicy');
    // const damagePolicy = 'This is the damagePolicy';
    console.log('props, add to cart', this.props);
    return (
      <>
        {/* <h1>Add TO Cart</h1> */}
        <AddTocartCard onSubmit={this.onSubmit} {...this.props} />
      </>
    );
  }
}

export default compose(
  // graphql(ADD_TO_CART, {
  //   props: ({ mutate }) => ({
  //     addToCart: async values => {
  //       console.log('mutation start', values);
  //       await mutate({
  //         variables: {
  //           input: values
  //         }
  //       });
  //       console.log(values, 'mutation called');
  //     }
  //   })
  // }),
  translate('listing')
)(AddToCart);
