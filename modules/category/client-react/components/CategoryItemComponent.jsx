import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Text, Card } from '@gqlapp/look-client-react';
import { useImageLoaded, LISTING_ROUTES } from '@gqlapp/listing-client-react';
import { NO_IMG } from '@gqlapp/listing-common';

const CategoryItemComponent = props => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const { category, componentStyle } = props;

  const cardImg = (
    <img
      alt=""
      ref={ref}
      onLoad={onLoad}
      src={category.imageUrl || NO_IMG}
      style={{
        width: '100%',
        // height: '200px',
        display: !loaded && 'none'
      }}
    />
  );

  return (
    <div style={componentStyle}>
      <NavLink to={`${LISTING_ROUTES.categoryCatalogueLink}${category.id}`}>
        <Card
          bordered={false}
          bodyStyle={{
            padding: '4px 0px'
          }}
          cover={
            <div
              style={{
                height: 'fit-content'
              }}
            >
              {cardImg}
              {!loaded && (
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
              )}
            </div>
          }
        >
          <div align="center">
            <Text>{category && category.title}</Text>
          </div>
        </Card>
      </NavLink>
    </div>
  );
};

CategoryItemComponent.propTypes = {
  category: PropTypes.object,
  componentStyle: PropTypes.object
};

export default CategoryItemComponent;
