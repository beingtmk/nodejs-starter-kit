import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { EmptyComponent, AddButton, Heading, Row, Col } from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { LISTING_ROUTES } from '@gqlapp/listing-client-react';

import CheckoutStepsComponent from './CheckoutStepsComponent';

const CustomBody = styled.div`
  background: white;
  margin: 0 -200%;
  padding: 0 200%;
`;
const CheckoutLayout = props => {
  const { cartLoading, loading, t, title, extra, step, Col1, Col2 } = props;
  return loading ? (
    <>
      <Row type="flex">
        <Col span={24} align="center">
          <CheckoutStepsComponent step={step} t={t} />
        </Col>
        <Col span={24}>
          <CustomBody>
            <br />
            <Row>
              <Col span={12}>
                <Heading>{title}</Heading>
              </Col>
              <Col span={12}>{extra}</Col>
            </Row>
            <br />
            <Row gutter={24}>
              <Col xxl={16} lg={16} xs={24}>
                {Col1}
                <br />
                <Link className="listing-link" to={`${LISTING_ROUTES.listingCatalogue}`} target="_blank">
                  <AddButton ghost block>
                    Continue Shopping
                  </AddButton>
                </Link>
              </Col>
              <Col lg={8} sm={24} xs={24}>
                {Col2}
              </Col>
            </Row>
            <br />
            <br />
            <br />
          </CustomBody>
        </Col>
      </Row>
    </>
  ) : (
    !cartLoading && (
      <div style={{ height: '100vh', position: 'relative' }}>
        <EmptyComponent
          description={'You have no items in your Cart'}
          emptyLink={`${LISTING_ROUTES.listingCatalogue}`}
          showAddBtn={true}
          btnText={t('checkoutCart.btn.add')}
        />
      </div>
    )
  );
};

CheckoutLayout.propTypes = {
  cartLoading: PropTypes.bool,
  loading: PropTypes.bool,
  step: PropTypes.number,
  t: PropTypes.func,
  title: PropTypes.string,
  extra: PropTypes.node,
  Col1: PropTypes.node,
  Col2: PropTypes.node
};

export default CheckoutLayout;
