import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  Row,
  Icon,
  PageLayout,
  Divider,
  Spinner,
  BreadcrumbItem,
  Breadcrumb,
  Menu,
  MenuItem,
  MetaTags
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { MODAL } from '@gqlapp/review-common';
import { CategoryListingsCatalogue, LISTING_ROUTES } from '@gqlapp/listing-client-react';
import { CategoryCarousel, CategoryNavBarComponent } from '@gqlapp/category-client-react';

const CategoryCatalogueView = props => {
  const { loading, category, navigation, match, t } = props;
  return (
    <PageLayout>
      <MetaTags
        title={t('categoryCatalogue.title')}
        description={`${settings.app.name} - ${t('categoryCatalogue.title')})}`}
      />
      <CategoryNavBarComponent filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }} />
      {loading && <Spinner />}
      {category && (
        <>
          <Breadcrumb>
            <BreadcrumbItem>
              <NavLink to="/">
                <Icon type="HomeOutlined" />
              </NavLink>
            </BreadcrumbItem>
            {category && <BreadcrumbItem>{category.title}</BreadcrumbItem>}
            {category && category.subCategories && category.subCategories.length !== 0 && (
              <BreadcrumbItem
                overlay={() => (
                  <Menu>
                    {category.subCategories.map(sC => (
                      <MenuItem>
                        <a href={`${LISTING_ROUTES.categoryCatalogueLink}${sC.id}`}>{sC.title}</a>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              >
                <a href="#">Sub Categories</a>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
          <hr />
          {category && category.subCategories && category.subCategories.length !== 0 && (
            <>
              <br />
              <Row gutter={[24, 24]}>
                {category.subCategories.length > 0 && <CategoryCarousel categories={category.subCategories} />}
              </Row>
              <Divider />
            </>
          )}
          <CategoryListingsCatalogue match={match} navigation={navigation} />
        </>
      )}
    </PageLayout>
  );
};

CategoryCatalogueView.propTypes = {
  loading: PropTypes.bool,
  category: PropTypes.object,
  match: PropTypes.object,
  navigation: PropTypes.object,
  t: PropTypes.fuc
};

export default CategoryCatalogueView;
