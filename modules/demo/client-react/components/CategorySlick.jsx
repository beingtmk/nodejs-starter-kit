import React from 'react';
import { Row, Col, Button } from 'antd';
import Slider from 'react-slick';
import styled from 'styled-components';

const Rectangle = styled(Button)`
  /* Black */

  background: #222222;
  border-radius: 29px;
`;

const Text = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  display: flex;
  align-items: center;
  text-align: center;

  color: white;
`;

const CategoryIconSlick = props => {
  const { data } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 2
  };
  return (
    <div style={{ marginTop: '10px' }}>
      <Slider {...settings}>
        {data.map(slick => {
          const { icon: Icon, category } = slick;
          return (
            <Row align="middle" type="flex" justify="space-around">
              <Col span={24}></Col>
              <Col span={24}>
                <Rectangle>
                  <Text>{category}</Text>
                </Rectangle>
              </Col>
            </Row>
          );
        })}
      </Slider>
    </div>
  );
};

export default CategoryIconSlick;
