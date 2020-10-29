import React from 'react';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';

import { Row, Col, Button, PageLayout, Heading, MetaTags } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import ROUTES from '../../routes';
import DynamicCarouselFilterView from './DynamicCarouselFilterView';
import DynamicCarouselListView from './DynamicCarouselListView';

const DynamicCarouselView = props => {
  const { t } = props;
  return (
    <PageLayout>
      <MetaTags
        title="DynamicCarousel - Admin"
        description={`${settings.app.name} - ${'View and edit DynamicCarousel'}`}
      />

      <Row>
        <Col span={12}>
          <Heading type="2">{t('dynamicCarousel.heading')}</Heading>
        </Col>
        <Col span={12} align="right">
          <Link to={ROUTES.add}>
            <Button color="primary">{t('dynamicCarousel.btn.add')}</Button>
          </Link>
        </Col>
      </Row>
      <br />
      <hr />
      <DynamicCarouselFilterView {...props} filter={{ isActive: true }} />
      <hr />
      <DynamicCarouselListView {...props} />
    </PageLayout>
  );
};
DynamicCarouselView.propTypes = {
  t: PropTypes.func
};

export default DynamicCarouselView;
