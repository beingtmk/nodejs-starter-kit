import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Icon, Divider } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ROUTES from '../routes';
// import OrderFilterComponent from './OrderFilterComponent.web';
import OrderListComponent from './OrderListComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const OrderView = props => {
  const { t } = props;

  return (
    <PageLayout>
      {renderMetaData(t)}
      <Row>
        <Col span={12}>
          <h2>
            <Icon type="solution" /> &nbsp;
            {t('list.subTitle')}
          </h2>
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
      {/* <OrderFilterComponent {...props} /> */}
      <Divider />
      <hr />
      <OrderListComponent {...props} />
    </PageLayout>
  );
};

export default OrderView;
