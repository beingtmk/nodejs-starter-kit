import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

import { Icon, PageLayout, Divider } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';
import CategoryListingsCatalogue from '@gqlapp/listing-client-react/containers/CategoryListingsCatalogue';
import { MODAL } from '@gqlapp/review-common';
import CategoryItemComponent from '@gqlapp/category-client-react/components/CategoryItemComponent';
import CategoryNavBarComponent from '@gqlapp/category-client-react/containers/CategoryNavBarComponent';

const { Title, Paragraph } = Typography;
const BreadCrumbItem = Breadcrumb.Item;

const CategoryCatalogueView = props => {
  const { loading, category, navigation, match } = props;

  return (
    <PageLayout>
      <CategoryNavBarComponent filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }} />
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
          {category && category.subCategories && category.subCategories.length !== 0 && (
            <>
              <Divider orientation="left">
                <Title level={3}>Sub Categories</Title>
              </Divider>
              <CategoryItemComponent categories={category.subCategories} />
            </>
          )}
          <>
            <Divider />
            <CategoryListingsCatalogue match={match} navigation={navigation} />
          </>
        </>
      )}
    </PageLayout>
  );
};

CategoryCatalogueView.propTypes = {
  loading: PropTypes.bool,
  category: PropTypes.object,
  match: PropTypes.object,
  navigation: PropTypes.object
};

export default CategoryCatalogueView;
