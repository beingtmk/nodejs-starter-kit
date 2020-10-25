import React from 'react';
import { Row, Col, Rate, Progress } from 'antd';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';

const Rating = styled(Rate)`
  font-size: 12px;
  padding-right: 10px;
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
      <Col span={6}>
        <br />
        <br />
        <Col span={24}>
          <Row type="flex" justify="center">
            <h1>{avgRating()}</h1>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <h3>
              {totalRatings} {t('avgRating')}
            </h3>
          </Row>
        </Col>
      </Col>
      <Col span={18}>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={5} count={5} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(five / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{displayDataCheck(five)}</h3>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={4} count={4} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(four / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{displayDataCheck(four)}</h3>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={3} count={3} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(three / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{displayDataCheck(three)}</h3>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={2} count={2} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(two / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{displayDataCheck(two)}</h3>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={1} count={1} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(one / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <h3>{displayDataCheck(one)}</h3>
          </Col>
        </Col>
      </Col>
    </Row>
  );
};

AvgRatingComponent.propTypes = {
  rating: PropTypes.object,
  t: PropTypes.func
};

export default AvgRatingComponent;
