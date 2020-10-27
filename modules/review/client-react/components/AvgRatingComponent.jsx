import React from 'react';
import { Row, Col, Rate, Progress } from 'antd';
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

const AvgRatingComponent = props => {
  const { t } = props;
  const { one, two, three, four, five } = props.rating;
  const totalRatings = one + two + three + four + five;
  function avgRating() {
    return ((5 * five + 4 * four + 3 * three + 2 * two + 1 * one) / totalRatings).toFixed(1);
  }
  // console.log('props', totalRatings * 5, one + two * 2 + three * 3 + four * 4 + five * 5);
  return (
    <Row>
      <Col lg={3} xs={6}>
        <br />
        <br />
        <Col span={24}>
          <Row type="flex" justify="center">
            <h1>{avgRating()}</h1>
          </Row>
        </Col>
        <Col lg={{ offset: 0, span: 24 }} xs={{ offset: 6, span: 18 }}>
          <Row type="flex" justify="center">
            <TotalRating>
              {totalRatings} {t('avgRating')}
            </TotalRating>
          </Row>
        </Col>
      </Col>
      <Col lg={21} xs={18}>
        <Row>
          <Col span={22}>
            <Col span={14}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={5} count={5} />
              </Row>
            </Col>
            <Col offset={1} span={8}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(five / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{five}</h3>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Col span={14}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={4} count={4} />
              </Row>
            </Col>
            <Col offset={1} span={8}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(four / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{four}</h3>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Col span={14}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={3} count={3} />
              </Row>
            </Col>
            <Col offset={1} span={8}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(three / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{three}</h3>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Col span={14}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={2} count={2} />
              </Row>
            </Col>
            <Col offset={1} span={8}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(two / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{two}</h3>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Col span={14}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={1} count={1} />
              </Row>
            </Col>
            <Col offset={1} span={8}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(one / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{one}</h3>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

AvgRatingComponent.propTypes = {
  rating: PropTypes.object,
  t: PropTypes.func
};

export default AvgRatingComponent;
