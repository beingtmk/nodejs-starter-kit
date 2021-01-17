import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';

import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col, Empty, Button } from '@gqlapp/look-client-react';

import ROUTES from '../../routes';
import { getChildrenToRender } from '../AntdLanding/utils';

const Img = styled.img`
  height: 300px;
  width: 100%;
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  margin: 10px 0;
  font-size: 25px;
`;

class Content extends React.PureComponent {
  render() {
    const { isMobile, t, ...props } = this.props;
    const Feature00DataSource = {
      wrapper: { className: 'home-page-wrapper current-content0-wrapper' },
      page: { className: 'home-page current-content0' },
      OverPack: { playScale: 0, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: t('imageBanner.titleWrapper.title'),
            className: 'title-h1 featuredHome-title'
          },
          {
            name: 'content',
            className: 'content-underline',
            children: (
              <div align="center">
                <div key="line" className="title-line-wrapper" align="left">
                  <div
                    className="title-line"
                    // style={{ transform: "translateX(-64px)" }}
                  />
                </div>
              </div>
            )
          }
        ]
      },
      childWrapper: {
        className: 'current-content0-block-wrapper',
        children:
          props.data &&
          props.data.edges &&
          props.data.edges.map((img, indx) => {
            return {
              name: `block${indx}`,
              className: 'current-content0-block',
              lg: 7,
              md: 12,
              xs: 24,
              children: {
                className: 'current-content0-block-item',
                children: [
                  {
                    title: img.node.title,
                    link: img.node.link,
                    name: 'image',
                    className: 'zoomIn',
                    children: img.node.imageUrl
                  }
                ]
              }
            };
          })
      }
    };
    const dataSource = Feature00DataSource;
    const { wrapper, titleWrapper, page, OverPack: overPackData, childWrapper } = dataSource;
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...overPackData}>
            <QueueAnim type="bottom" key="block" leaveReverse component={Row} componentProps={childWrapper}>
              <Row type="flex" justify="space-between" align="middle">
                {childWrapper.children.length > 0 ? (
                  childWrapper.children.map((block, i) => {
                    const { children: item, ...blockProps } = block;
                    return (
                      <Col key={i.toString()} {...blockProps}>
                        <div {...item}>
                          {item.children.map((item, i) => {
                            return (
                              <div align="center">
                                {item.link ? (
                                  <a href={item.link}>
                                    <Img className={item.className} key={i} src={item.children} />
                                    <Title>{item.title}</Title>
                                  </a>
                                ) : (
                                  <>
                                    <Img className={item.className} key={i} src={item.children} />
                                    <Title>{item.title}</Title>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Col span={24}>
                    <div align="center">
                      <Empty description={'No Image Banners to show.'}>
                        <Link to={`${ROUTES.add}`}>
                          <Button color="primary">Add</Button>
                        </Link>
                      </Empty>
                    </div>
                  </Col>
                )}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  isMobile: PropTypes.bool,
  t: PropTypes.func
};

export default Content;
