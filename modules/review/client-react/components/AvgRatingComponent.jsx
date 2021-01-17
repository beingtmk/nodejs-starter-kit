import React from 'react';
import { Row, Col, Rate, Progress } from '@gqlapp/look-client-react';

import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Rating = styled(Rate)`
  font-size: 12px;
  padding-right: 10px;
`;
const TotalRating = styled.h3`
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export function avgRating(five, four, three, two, one, totalRatings) {
  return ((5 * five + 4 * four + 3 * three + 2 * two + 1 * one) / totalRatings).toFixed(1);
}

const AvgRatingComponent = props => {
  const { t } = props;
  const { one, two, three, four, five } = props.rating;
  const totalRatings = one + two + three + four + five;
  const comp = [
    {
      defaultValue: 5,
      percent: (five / totalRatings) * 100,
      value: five
    },
    {
      defaultValue: 4,
      percent: (four / totalRatings) * 100,
      value: four
    },
    {
      defaultValue: 3,
      percent: (three / totalRatings) * 100,
      value: three
    },
    {
      defaultValue: 2,
      percent: (two / totalRatings) * 100,
      value: two
    },
    {
      defaultValue: 1,
      percent: (one / totalRatings) * 100,
      value: one
    }
  ];
  const AvrgComponent = ({ defaultValue, percent, value }) => (
    <Row>
      <Col span={22}>
        <Row>
          <Col span={14}>
            <Row type="flex" justify="end">
              <Rating disabled defaultValue={defaultValue} count={defaultValue} />
            </Row>
          </Col>
          <Col offset={1} span={8}>
            <Progress strokeColor="#fc4c4c" showInfo={false} percent={percent} strokeLinecap="round" />
          </Col>
        </Row>
      </Col>
      <Col span={2}>
        <h3>{value}</h3>
      </Col>
    </Row>
  );

  AvrgComponent.propTypes = {
    defaultValue: PropTypes.number,
    percent: PropTypes.number,
    value: PropTypes.number
  };

  // console.log('props', totalRatings * 5, one + two * 2 + three * 3 + four * 4 + five * 5);
  return (
    <Row>
      <Col lg={3} xs={6}>
        <br />
        <br />
        <Row>
          <Col span={24}>
            <Row type="flex" justify="center">
              <h1>{avgRating(five, four, three, two, one, totalRatings)}</h1>
            </Row>
          </Col>
          <Col lg={{ offset: 0, span: 24 }} xs={{ offset: 6, span: 18 }}>
            <Row type="flex" justify="center">
              <TotalRating>
                {totalRatings} {t('avgRating')}
              </TotalRating>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col lg={21} xs={18}>
        {comp.map(AvrgComponent)}
      </Col>
    </Row>
  );
};

AvgRatingComponent.propTypes = {
  rating: PropTypes.object,
  t: PropTypes.func
};

export default AvgRatingComponent;
