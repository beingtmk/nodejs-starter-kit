import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

// import { UrlMethod } from '@gqlapp/core-client-react';
// import CategoryPageListings from '@gqlapp/listing-client-react/containers/CategoryPageListings';
import { Icon, PageLayout, Divider } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import CategoryItemComponent from './CategoryItemComponent';

const { Title, Paragraph } = Typography;
const BreadCrumbItem = Breadcrumb.Item;

const CategoryCatalogueView = props => {
  const { loading, category } = props;

  return (
    <PageLayout>
      {loading && <Spinner />}
      {category && (
        <>
          <Breadcrumb>
            <BreadCrumbItem>
              <NavLink to="/">
                <Icon type="HomeOutlined" />
              </NavLink>
            </BreadCrumbItem>
            {category && (
              <BreadCrumbItem>
                {/* <NavLink to={`/category-item/${category.id}/${UrlMethod(category.title)}`}> */}
                {category.title}
                {/* </NavLink> */}
              </BreadCrumbItem>
            )}
          </Breadcrumb>
          <Typography style={{ marginTop: '15px' }}>
            <Title level={2}>{category.title}</Title>
            <Paragraph>{category.description}</Paragraph>
          </Typography>
          {category && category.subCategories && category.subCategories.length !== 0 ? (
            <>
              <Divider orientation="left">
                <Title level={3}>Sub Categories</Title>
              </Divider>
              <CategoryItemComponent categories={category.subCategories} />
            </>
          ) : (
            <>
              <Divider />
              <h1>hello</h1>
              {/* {category && (
            <CategoryPageListings history={history} categoryTitle={category && category.title} />
          )} */}
            </>
          )}
        </>
      )}
    </PageLayout>
  );
};

CategoryCatalogueView.propTypes = {
  loading: PropTypes.bool,
  category: PropTypes.object
};

export default CategoryCatalogueView;
