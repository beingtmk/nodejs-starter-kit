import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Row, Col, Button, PageLayout, Heading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import DynamicCarouselFilterView from './DynamicCarouselFilterView';
import DynamicCarouselListView from './DynamicCarouselListView';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - ${'DynamicCarousel - Admin'}`}
    meta={[
      {
        name: 'description',
        content: `${settings.app.name} - ${'View and edit DynamicCarousel'}`
      }
    ]}
  />
);

const DynamicCarouselView = props => {
  return (
    <PageLayout>
      {renderMetaData()}
      <Row>
        <Col span={12}>
          <Heading type="2">Dynamic Carousel</Heading>
        </Col>
        <Col span={12} align="right">
          <Link to="/new/dynamic-carousel">
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
