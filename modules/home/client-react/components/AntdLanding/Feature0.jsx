import React from 'react';
import PropTypes from 'prop-types';

import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

class Content extends React.PureComponent {
  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { wrapper, titleWrapper, page, OverPack: overPackData, childWrapper } = dataSource;
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...overPackData}>
            <QueueAnim type="bottom" key="block" leaveReverse component={Row} componentProps={childWrapper}>
              {childWrapper.children.map((block, i) => {
                const { children: item, ...blockProps } = block;
                return (
                  <Col key={i.toString()} {...blockProps}>
                    <div {...item}>{item.children.map(getChildrenToRender)}</div>
                  </Col>
                );
              })}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  dataSource: PropTypes.shape({
    wrapper: PropTypes.object,
    page: PropTypes.object,
    OverPack: PropTypes.object,
    titleWrapper: PropTypes.shape({
      children: PropTypes.object
    }),
    childWrapper: PropTypes.shape({
      children: PropTypes.object
    })
  })
};

export default Content;
