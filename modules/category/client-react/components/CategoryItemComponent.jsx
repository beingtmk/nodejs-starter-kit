import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card } from 'antd';
import { NavLink } from 'react-router-dom';

import { useImageLoaded } from '@gqlapp/listing-client-react/components/functions';
import { Row, Col } from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';

import ROUTES from '../routes';

const { Text } = Typography;

const CategoryItemComponent = props => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const { categories } = props;
  console.log(loaded);
  return (
    <Row gutter={[24, 24]}>
      {categories &&
        categories.length > 0 &&
        categories.map((c, idx) => (
          <Col lg={6} md={8} xs={12} key={idx}>
            <NavLink to={`${ROUTES.categoryCatalogueLink}${c.id}`}>
              <Card
                bordered={false}
                //  bodyStyle={{}}
                cover={
                  loaded ? (
                    <img ref={ref} onLoad={onLoad} alt="" src={c.imageUrl || NO_IMG} height="200px" />
                  ) : (
                    <div
                      style={{
                        overflow: 'hidden',
                        height: '126px',
                        borderRadius: '8px 8px 0px 0px',
                        background: 'linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)',
                        animation: 'ant-skeleton-loading 1.4s ease infinite'
                      }}
                      align="center"
                    ></div>
                  )
                }
              >
                <Text style={{ textAlign: 'left' }}>{c && c.title}</Text>
              </Card>
            </NavLink>
          </Col>
        ))}
    </Row>
  );
};

CategoryItemComponent.propTypes = {
  categories: PropTypes.array
};

export default CategoryItemComponent;
