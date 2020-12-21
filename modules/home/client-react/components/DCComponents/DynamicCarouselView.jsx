import React from 'react';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';

import { Icon, Row, Col, PageLayout, Heading, MetaTags, AddButton } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import styled from 'styled-components';
import ROUTES from '../../routes';
import DynamicCarouselFilterComponent from './DynamicCarouselFilterComponent';
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
        <Col lg={21} md={20} xs={24}>
          <Heading type="2">
            <Title>
              <Icon type="BuildOutlined" /> &nbsp;
              {t('dynamicCarousel.heading')}
            </Title>
          </Heading>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <br />
        </Col>
        <Col lg={3} md={4} xs={24} align="right">
          <Link to={ROUTES.add}>
            <AddButton>{t('dynamicCarousel.btn.add')}</AddButton>
          </Link>
        </Col>
      </Row>
      <hr />
      <DynamicCarouselFilterComponent {...props} />
      <hr />
      <DynamicCarouselListView {...props} />
    </PageLayout>
  );
};
DynamicCarouselView.propTypes = {
  t: PropTypes.func
};

export default DynamicCarouselView;
