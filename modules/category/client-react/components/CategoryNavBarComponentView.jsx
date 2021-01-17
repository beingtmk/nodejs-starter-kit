import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

import { useImageLoaded, LISTING_ROUTES } from '@gqlapp/listing-client-react';
import {
  Affix,
  Row,
  Col,
  DropDown,
  Card,
  Skeleton,
  Drawer,
  Icon,
  SubMenu,
  MenuItem,
  Button,
  Menu
} from '@gqlapp/look-client-react';

const WhiteDiv = styled.div`
  background: white;
  padding: 5px;
`;

const CategoryNavBarComponentView = props => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const [visible, setVisible] = useState(false);
  const [showImg, setShowImg] = useState(true);
  const [colWidth, setColWidth] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState([]);
  const { loading, categories } = props;

  const setDropDownMenu = category => {
    const catLength = category.subCategories.filter(sC => sC.isNavbar && sC).length;
    if (category.subCategories && catLength > 0) {
      setVisible(true);
      setActiveCategory(category.subCategories);
      // if (catLength < 16) {
      //   if (catLength < 8) {
      //     setColWidth([...Array(catLength).keys()].map(() => 24 / catLength));
      //   } else {
      //     const isEvent = Boolean(!(catLength % 2));
      //     if (isEvent) {
      //       setColWidth([
      //         ...[...Array(catLength / 2).keys()].map(() => 24 / parseInt(catLength / 2)),
      //         ...[...Array(catLength / 2).keys()].map(() => 24 / parseInt(catLength / 2)),
      //       ]);
      //     } else {
      //       console.log(catLength);
      //       setColWidth([
      //         ...[...Array(parseInt(catLength / 2)).keys()].map(() => parseInt(24 / parseInt(catLength / 2))),
      //         ...[...Array(catLength - parseInt(catLength / 2)).keys()].map(() =>
      //           parseInt(24 / (catLength - parseInt(catLength / 2)))
      //         ),
      //       ]);
      //     }
      //   }
      // }
      if (catLength < 16) {
        setShowImg(true);
        if (catLength < 8) {
          setColWidth([...Array(catLength).keys()].map(() => parseInt(24 / catLength)));
        } else {
          setColWidth([
            ...[...Array(8).keys()].map(() => 3),
            ...[...Array(catLength - 8).keys()].map(() => parseInt(24 / (catLength - 8)))
          ]);
        }
      } else {
        setShowImg(false);
        console.log([...Array(catLength % 8).keys()].map(() => parseInt(24 / (catLength % 8))));
        setColWidth([
          ...[...Array(catLength - (catLength % 8)).keys()].map(() => 3),
          ...[...Array(catLength % 8).keys()].map(() => parseInt(24 / (catLength % 8)))
        ]);
      }
    } else {
      setVisible(false);
    }
  };

  const handleClose = () => {
    setDrawerVisible(false);
  };
  const handleOpen = () => {
    setDrawerVisible(true);
  };

  // console.log(visible);
  return (
    <Row>
      <Col lg={0} md={0} xs={24}>
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
                              href={`${LISTING_ROUTES.categoryCatalogueLink}${c.node.id}`}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              All
                            </a>
                          </MenuItem>
                          {c.node.subCategories &&
                            c.node.subCategories.map(sc => (
                              <MenuItem key={sc.title}>
                                <a href={`${LISTING_ROUTES.categoryCatalogueLink}${sc.id}`}>{sc.title}</a>
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
      </Col>
      <Col lg={24} md={24} xs={0}>
        <Affix offsetTop={68}>
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
                  categories.edges
                    .filter(c => c.node.isNavbar && c)
                    .map((c, i) => {
                      if (c.node.isNavbar) {
                        return (
                          <Col
                            key={i}
                            span={parseInt(24 / parseInt(categories.edges.filter(c => c.node.isNavbar && c).length))}
                          >
                            <a
                              // href="#"
                              href={`${LISTING_ROUTES.categoryCatalogueLink}${c.node.id}`}
                              onMouseEnter={() => setDropDownMenu(c.node)}
                            >
                              <Row>
                                <Col lg={24} md={0} xs={0}>
                                  <h2>{c.node.title}</h2>
                                </Col>
                                <Col lg={0} md={24} xs={24}>
                                  <span style={{ fontSize: 'larger', color: 'black' }}>{c.node.title}</span>
                                </Col>
                              </Row>
                            </a>
                          </Col>
                        );
                      }
                    })}
                <Col span={24} style={{ visibility: 'collapse' }}>
                  <DropDown visible={visible} content={'navbar-category-dropdown'} className="navbar-category-dropdown">
                    <Affix offsetTop={92}>
                      <WhiteDiv>
                        <Row type="flex" justify="center" gutter={[6, 6]}>
                          {activeCategory.map(
                            (sC, idx) =>
                              sC.isNavbar && (
                                <Col span={colWidth[idx]} key={idx} align="center">
                                  <a href={`${LISTING_ROUTES.categoryCatalogueLink}${sC.id}`}>
                                    <Card
                                      // style={{ height: '145px' }}
                                      bodyStyle={{
                                        margin: '0px',
                                        padding: '0px'
                                      }}
                                      hoverable
                                    >
                                      <Card
                                        bordered={false}
                                        style={{
                                          width: '120px'
                                          /* height: 'fit-content' */
                                          /* border: '0px', borderRadius: '0px !important' */
                                        }}
                                        bodyStyle={{
                                          // margin: showImg && '0px',
                                          padding: showImg && '0px',
                                          textAlign: 'center'
                                        }}
                                        // hoverable
                                        cover={
                                          showImg && (
                                            <>
                                              {!loaded && (
                                                <div
                                                  style={{
                                                    overflow: 'hidden',
                                                    height: '126px',
                                                    borderRadius: '8px 8px 0px 0px',
                                                    background:
                                                      'linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)',
                                                    animation: 'ant-skeleton-loading 1.4s ease infinite'
                                                  }}
                                                  align="center"
                                                ></div>
                                              )}
                                              <img
                                                ref={ref}
                                                onLoad={onLoad}
                                                alt="example"
                                                src={sC.imageUrl}
                                                style={{
                                                  // width: 'fit-content',
                                                  display: !loaded && 'none'
                                                }}
                                              />
                                            </>
                                          )
                                        }
                                      >
                                        {sC.title}
                                      </Card>
                                    </Card>
                                  </a>
                                </Col>
                              )
                          )}
                        </Row>
                      </WhiteDiv>
                    </Affix>
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
        </Affix>
      </Col>
    </Row>
  );
};

CategoryNavBarComponentView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  categories: PropTypes.object,
  mobile: PropTypes.bool
};

export default CategoryNavBarComponentView;
