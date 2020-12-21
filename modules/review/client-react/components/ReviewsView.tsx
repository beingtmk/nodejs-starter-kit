import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, PageLayout, AddButton, Heading, MetaTags, Row, Col } from '@gqlapp/look-client-react';
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
        <Col lg={21} md={20} xs={24}>
          <Heading type="2">
            <Icon type="BookOutlined" /> &nbsp;
            {t('adminPanel.title')}
          </Heading>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <br />
        </Col>
        <Col lg={3} md={4} xs={24} align="right">
          <Link to={ROUTES.add}>
            <AddButton color="primary">{t('adminPanel.btn.add')}</AddButton>
          </Link>
        </Col>
      </Row>
      <hr />
      <ReviewFilterComponent filter={filter} {...props} />
      <hr />
      <ReviewListComponent {...props} />
    </PageLayout>
  );
};

export default translate('review')(ReviewsView);
