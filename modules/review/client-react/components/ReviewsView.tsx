import React from 'react';
import { Link } from 'react-router-dom';

import { PageLayout, AddButton, Heading, MetaTags, Row, Col } from '@gqlapp/look-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewFilterComponent from './ReviewFilterComponent.web';
import ReviewListComponent from './ReviewListComponent.web';
import ROUTES from '../routes';

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
      <MetaTags title={t('title')} description={t('meta')} />

      <Row>
        <Col span={12}>
          <Heading type="2">{t('adminPanel.title')}</Heading>
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
    </PageLayout>
  );
};

export default translate('review')(ReviewsView);
