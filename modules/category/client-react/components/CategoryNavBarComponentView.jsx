import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import { Menu } from 'antd';

import { Row, Col, DropDown, Card, Skeleton, Drawer, Icon, SubMenu, MenuItem, Button } from '@gqlapp/look-client-react';
import ROUTES from '@gqlapp/listing-client-react/routes';

const CategoryNavBarComponentView = props => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState([]);
  const { mobile, loading, categories } = props;

  const setDropDownMenu = category => {
    if (category.subCategories && category.subCategories.length > 0) {
      setVisible(true);
      setActiveCategory(category.subCategories);
    }
  };

  const handleClose = () => {
    setDrawerVisible(false);
  };
  const handleOpen = () => {
    setDrawerVisible(true);
  };
  // console.log(object)
  if (mobile) {
    return (
      <>
        <Row justify="start" type="flex" style={{ paddingTop: '10px' }}>
          <Button block color="primary" onClick={handleOpen}>
            <Icon type="MenuOutlined" style={{ color: 'inherit', fontSize: '15px' }} /> &nbsp;categories
          </Button>
          <hr />
        </Row>
        <Drawer placement="left" closable={false} onClose={handleClose} visible={drawerVisible}>
          {!loading ? (
            <>
              <Menu
                mode="inline"
                overflowedIndicator={<Icon type="MenuOutlined" />}
                style={{ lineHeight: '40px', background: '#f7f7f7' }}
              >
                {categories.edges &&
                  categories.totalCount > 0 &&
                  categories.edges.map(c => {
                    if (c.node.isNavbar) {
                      return (
                        <SubMenu key={c.node.title} title={c.node.title}>
                          <MenuItem key="all">
                            <a
                              href={`${ROUTES.categoryCatalogueLink}${c.node.id}`}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              All
                            </a>
                          </MenuItem>
                          {c.node.subCategories &&
                            c.node.subCategories.map(sc => (
                              <MenuItem key={sc.title}>
                                <a href={`${ROUTES.categoryCatalogueLink}${sc.id}`}>{sc.title}</a>
                              </MenuItem>
                            ))}
                        </SubMenu>
                      );
                    }
                  })}
              </Menu>
            </>
          ) : null}
        </Drawer>
      </>
    );
  }
  // console.log(visible);
  return (
    <ScrollParallax
      location="page-layout"
      animation={{
        translateY: '-24px'
      }}
      align="center"
      className="navbar-category-strip"
    >
      {!loading ? (
        <Row
          type="flex"
          justify="center"
          style={{ height: '40px', lineHeight: '40px' }}
          onMouseLeave={() => setVisible(false)}
        >
          {categories.edges &&
            categories.totalCount > 0 &&
            categories.edges.map((c, i) => {
              if (c.node.isNavbar) {
                return (
                  <Col key={i} span={24 / categories.totalCount}>
                    <a href="#" onMouseEnter={() => setDropDownMenu(c.node)}>
                      <h1>{c.node.title}</h1>
                    </a>
                  </Col>
                );
              }
            })}
          <Col span={24} style={{ visibility: 'collapse' }}>
            <DropDown visible={visible} content={'navbar-category-dropdown'} className="navbar-category-dropdown">
              <Row type="flex" justify="center" gutter={[24, 24]}>
                {activeCategory.map(sC => (
                  <Col span={3} align="center">
                    <a href={`${ROUTES.categoryCatalogueLink}${sC.id}`}>
                      <Card
                        bordered={false}
                        // style={{ border: '0px', borderRadius: '0px !important' }}
                        bodyStyle={{
                          margin: '0px',
                          padding: '0px',
                          textAlign: 'center'
                        }}
                        hoverable
                        cover={<img alt="example" src={sC.imageUrl} />}
                      >
                        {sC.title}
                      </Card>
                    </a>
                  </Col>
                ))}
              </Row>
            </DropDown>
          </Col>
        </Row>
      ) : (
        <Row type="flex" justify="center" style={{ lineHeight: '40px' }}>
          {[...Array(6).keys()].map(() => {
            <Col span={24 / 6}>
              <Skeleton active title={{ width: '50%' }} />
            </Col>;
          })}
        </Row>
      )}
    </ScrollParallax>
  );
};

CategoryNavBarComponentView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  categories: PropTypes.object,
  mobile: PropTypes.bool
};

export default CategoryNavBarComponentView;
