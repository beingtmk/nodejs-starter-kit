import React from 'react';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';

import { Row, Col, PageLayout, Heading, MetaTags, AddButton } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import styled from 'styled-components';
import ROUTES from '../../routes';
import DynamicCarouselFilterView from './DynamicCarouselFilterView';
import DynamicCarouselListView from './DynamicCarouselListView';

const Title = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 0.8em;
  }
`;
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
          <Heading type="2">
            <Title>{t('dynamicCarousel.heading')}</Title>
          </Heading>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Link to={ROUTES.add}>
              <AddButton>{t('dynamicCarousel.btn.add')}</AddButton>
            </Link>
          </Row>
        </Col>
      </Row>
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
