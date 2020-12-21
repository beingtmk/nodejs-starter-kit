import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import { Row, Col, Heading, Icon, PageLayout, MetaTags /* , AddButton  */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

// import ROUTES from '../routes';
import DiscountsFilterComponent from './DiscountsFilterComponent';
import DiscountsListComponent from './DiscountsListComponent';

const DiscountsView = props => {
  const { t } = props;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <Row>
        <Col lg={22} md={20} xs={24}>
          <Heading type="2">
            <Icon type="PercentageOutlined" />
            &nbsp;
            {t('discount.subTitle')}
          </Heading>
        </Col>
        {/* <Col lg={0} md={0} xs={24}>
          <br />
        </Col>
        <Col lg={2} md={4} xs={24} align="right">
          <Link to={ROUTES.add}>
            <AddButton>{t('discount.btn.add')}</AddButton>
          </Link>
        </Col> */}
      </Row>
      <hr />
      <DiscountsFilterComponent showIsActive={true} {...props} />
      <hr />
      <DiscountsListComponent {...props} />
    </PageLayout>
  );
};

DiscountsView.propTypes = {
  t: PropTypes.func
};

export default DiscountsView;
