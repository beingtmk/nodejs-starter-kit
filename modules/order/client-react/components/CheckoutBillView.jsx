import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  Icon,
  ModalDrawer,
  MetaTags,
  PageLayout,
  Row,
  Col,
  /* Card, */ Spinner
} from '@gqlapp/look-client-react';
import AddressItemComponent from '@gqlapp/addresses-client-react/components/AddressItemComponent';
import AddressForm from '@gqlapp/addresses-client-react/components/AddressForm';

import settings from '@gqlapp/config';
import CheckoutLayout from './CheckoutLayout';
import OrderSummary from './OrderSummary';

const CheckoutBillView = props => {
  const {
    t,
    addresses,
    /* onSelect, */ deleteAddress,
    addOrEditAddresses,
    cartLoading,
    /* btnDisabled, */ history
  } = props;
  const getCart = !props.loading && props.getCart;

  return (
    <PageLayout>
      <MetaTags title="Bill" description={`${settings.app.name} - ${'meta'}`} />
      {cartLoading && <Spinner />}

      {!cartLoading && (
        <CheckoutLayout
          t={t}
          title={'Select Address'}
          extra={
            <ModalDrawer
              buttonText={
                <>
                  <Icon type="PlusOutlined" /> Add new address
                </>
              }
              modalTitle="Edit Address"
              block={false}
              height="auto"
              // shape="circle"
              size="md"
              type="default"
            >
              <AddressForm t={t} onSubmit={addOrEditAddresses} />
            </ModalDrawer>
            // <AddButton style={{ width: 'fit-content' }}>{t('checkoutCart.btn.add')}</AddButton>
          }
          loading={getCart && getCart.orderDetails.length > 0}
          Col1={
            <Row>
              <Col span={1} />
              <Col span={23}>
                {addresses &&
                  addresses.map((a, i) => (
                    <>
                      <AddressItemComponent
                        address={a}
                        t={t}
                        onEdit={addOrEditAddresses}
                        onDelete={() => deleteAddress(a.id)}
                      />
                      {addresses.length - 1 !== i ? <Divider /> : <br />}
                    </>
                  ))}
              </Col>
            </Row>
          }
          Col2={<OrderSummary t={t} getCart={getCart} history={history} />}
        />
      )}
    </PageLayout>
  );
};

CheckoutBillView.propTypes = {
  addresses: PropTypes.object,
  currentUser: PropTypes.object,
  addOrEditAddresses: PropTypes.func,
  onSubmit: PropTypes.func,
  cartLoading: PropTypes.bool,
  deleteAddress: PropTypes.func,
  btnDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSelect: PropTypes.func,
  getCart: PropTypes.object,
  history: PropTypes.object
};

export default CheckoutBillView;
