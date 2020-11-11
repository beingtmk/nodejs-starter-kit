import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card } from 'antd';
import { NavLink } from 'react-router-dom';

import { Row, Col } from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';

import ROUTES from '../routes';

const { Text } = Typography;

const CategoryItemComponent = props => {
  const { categories } = props;

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
                cover={<img alt="" src={c.imageUrl || NO_IMG} height="200px" />}
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
