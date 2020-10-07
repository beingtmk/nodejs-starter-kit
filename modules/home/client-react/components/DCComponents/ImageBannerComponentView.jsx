import React from 'react';
import PropTypes from 'prop-types';

import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from '../AntdLanding/utils';

class Content extends React.PureComponent {
  render() {
    const { isMobile, ...props } = this.props;
    const Feature00DataSource = {
      wrapper: { className: 'home-page-wrapper current-content0-wrapper' },
      page: { className: 'home-page current-content0' },
      OverPack: { playScale: 0, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'title',
            children: 'Image Banner',
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
              md: 7,
              xs: 12,
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
                {childWrapper.children.map((block, i) => {
                  const { children: item, ...blockProps } = block;
                  return (
                    <Col key={i.toString()} {...blockProps}>
                      <div {...item}>
                        {item.children.map((item, i) => {
                          return (
                            <>
                              {item.link ? (
                                <a href={item.link}>
                                  {getChildrenToRender(item, i)}
                                  <h2>{item.title}</h2>
                                </a>
                              ) : (
                                <>
                                  {getChildrenToRender(item, i)}
                                  <h2>{item.title}</h2>
                                </>
                              )}
                            </>
                          );
                        })}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  isMobile: PropTypes.bool
};

export default Content;
