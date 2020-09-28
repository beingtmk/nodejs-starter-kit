import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import { PageLayout, AddButton } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { MODAL } from '@gqlapp/review-common';

import ReviewFilterComponent from './ReviewFilterComponent.web';
import ReviewListComponent from './ReviewListComponent.web';
import ROUTES from '../routes';

import Review from '../containers/Review';

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

export interface ReviewViewProps {
  t: TranslateFunction;
  filter: {
    isActive: boolean;
    modalId: number;
    modalName: string;
  };
}

const ReviewsView: React.FC<ReviewViewProps> = props => {
  const { t, filter } = props;

  return (
    <PageLayout>
      {renderMetaData(t)}
      <Row>
        <Col span={12}>
          <h2>{t('adminPanel.title')}</h2>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Link to={ROUTES.add}>
              <AddButton color="primary">{t('adminPanel.btn.add')}</AddButton>
            </Link>
          </Row>
        </Col>
      </Row>
      <br />
      <hr />
      <ReviewFilterComponent filter={filter} {...props} />
      <hr />
      <ReviewListComponent {...props} />
      <Review
        filter={{
          isActive: true,
          modalId: 1,
          modalName: MODAL[1].value
        }}
        t={t}
      />
    </PageLayout>
  );
};

export default translate('review')(ReviewsView);
