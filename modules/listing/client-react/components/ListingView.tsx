import React from 'react';
import { Link } from 'react-router-dom';
import { Spin, Row, Col, Icon, Divider } from 'antd';

import { MetaTags, PageLayout, AddButton, Heading } from '@gqlapp/look-client-react';
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
  const { t, loading } = props;
  // console.log(loading);
  return (
    <PageLayout>
      <MetaTags type={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <Row>
        <Col span={22}>
          <Heading type="2">
            <Icon type="solution" /> &nbsp;
            {t('list.subTitle')}
          </Heading>
        </Col>
        <Col span={2} align="right">
          <Link to={ROUTES.add}>
            <AddButton>{t('list.btn.add')}</AddButton>
          </Link>
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <ListingFilterComponent showIsActive={true} {...props} />
      <Divider />
      <hr />
      {loading && (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin />
        </div>
      )}
      {!loading && <ListingListComponent {...props} />}
    </PageLayout>
  );
};

export default ListingView;
