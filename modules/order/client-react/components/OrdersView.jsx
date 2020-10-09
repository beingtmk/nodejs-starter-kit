import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import { Link } from 'react-router-dom';
import { Row, Col, Icon, Divider } from 'antd';

import { PageLayout, Spin, Heading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

// import ROUTES from '../routes';
import OrderFilterComponent from './OrderFilterComponent.web';
import OrderListComponent from './OrderListComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const OrderView = props => {
  const { t, load } = props;

  return (
    <PageLayout>
      {renderMetaData(t)}
      <Row>
        <Col span={12}>
          <Heading type="2">
            <Icon type="solution" /> &nbsp;
            {t('list.subTitle')}
          </Heading>
        </Col>
        <Col span={12} align="right">
          {/* <Link to={ROUTES.add}>
            <Button color="primary">{t('list.btn.add')}</Button>
          </Link> */}
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <OrderFilterComponent {...props} />
      <Divider />
      <hr />
      {!load ? (
        <OrderListComponent {...props} />
      ) : (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin size="large" />
        </div>
      )}
    </PageLayout>
  );
};

OrderView.propTypes = {
  t: PropTypes.func,
  load: PropTypes.bool
};

export default OrderView;
