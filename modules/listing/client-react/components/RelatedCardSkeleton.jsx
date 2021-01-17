import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card, Skeleton } from '@gqlapp/look-client-react';

const RelatedCardSkeleton = props => {
  const { componentStyle } = props;
  return (
    <Card
      align="left"
      style={componentStyle}
      bodyStyle={{ margin: '0px' }}
      hoverable
      cover={
        <div
          style={{
            overflow: 'hidden',
            height: '230px',
            borderRadius: '8px 8px 0px 0px',
            background: 'linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)',
            animation: 'ant-skeleton-loading 1.4s ease infinite'
          }}
          align="center"
        ></div>
      }
    >
      <Skeleton active title={{ width: '150px' }} paragraph={false} />
      <Row type="flex" gutter={24}>
        <Col span={12}>
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
        </Col>
        <Col span={12}>
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
        </Col>
        <Col span={24}>
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
        </Col>
      </Row>
    </Card>
  );
};

RelatedCardSkeleton.propTypes = {
  componentStyle: PropTypes.object
};

export default RelatedCardSkeleton;
