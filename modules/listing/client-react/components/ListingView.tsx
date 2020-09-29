import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Divider } from 'antd';

import { PageLayout, AddButton } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import ROUTES from '../routes';
import ListingFilterComponent from './ListingFilterComponent.web';
import ListingListComponent from './ListingListComponent.web';

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

export interface ListingViewProps {
  t: TranslateFunction;
}

const ListingView: React.SFC<ListingViewProps> = props => {
  const { t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <Row>
        <Col span={22}>
          <h2>
            <Icon type="solution" /> &nbsp;
            {t('list.subTitle')}
          </h2>
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
      <ListingFilterComponent {...props} />
      <Divider />
      <hr />
      <ListingListComponent {...props} />
    </PageLayout>
  );
};

export default ListingView;
