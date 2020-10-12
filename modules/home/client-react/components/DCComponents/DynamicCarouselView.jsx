import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Button, PageLayout, Heading, MetaTags } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import ROUTES from '../../routes';
import DynamicCarouselFilterView from './DynamicCarouselFilterView';
import DynamicCarouselListView from './DynamicCarouselListView';

const DynamicCarouselView = props => {
  return (
    <PageLayout>
      <MetaTags
        title="DynamicCarousel - Admin"
        description={`${settings.app.name} - ${'View and edit DynamicCarousel'}`}
      />

      <Row>
        <Col span={12}>
          <Heading type="2">Dynamic Carousel</Heading>
        </Col>
        <Col span={12} align="right">
          <Link to={ROUTES.add}>
            <Button color="primary">Add</Button>
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

export default DynamicCarouselView;
