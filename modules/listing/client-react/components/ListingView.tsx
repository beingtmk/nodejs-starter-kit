import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, MetaTags, PageLayout, AddButton, Heading, Row, Col } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import ROUTES from '../routes';
import ListingFilterComponent from './ListingFilterComponent.web';
import ListingListComponent from './ListingListComponent.web';

export interface ListingViewProps {
  t: TranslateFunction;
  loading: boolean;
}

const ListingView: React.FC<ListingViewProps> = props => {
  const { t } = props;
  // console.log(loading);
  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <Row>
        <Col lg={22} md={20} xs={24}>
          <Heading type="2">
            <Icon type="SolutionOutlined" />
            &nbsp;
            {t('list.subTitle')}
          </Heading>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <br />
        </Col>
        <Col lg={2} md={4} xs={24} align="right">
          <Link to={ROUTES.add}>
            <AddButton>{t('list.btn.add')}</AddButton>
          </Link>
        </Col>
      </Row>
      <hr />
      <ListingFilterComponent showCategoryFilter={true} showIsActive={true} affix={false} {...props} />
      <hr />
      <ListingListComponent {...props} />
    </PageLayout>
  );
};

export default ListingView;
