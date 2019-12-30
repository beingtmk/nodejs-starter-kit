import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { getChildrenToRender } from './utils';

const Content130DataSource = {
  OverPack: {
    className: 'home-page-wrapper content13-wrapper',
    playScale: 0.3
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children: 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image'
      },
      { name: 'title', children: '丰富的特色展台', className: 'title-h1' },
      {
        name: 'content',
        children: '特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家',
        className: 'title-content'
      },
      {
        name: 'content2',
        children: '现场问诊，为你答疑解难',
        className: 'title-content'
      }
    ]
  }
};

class Content13 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const dataSource = Content130DataSource;
    delete props.isMobile;
    return (
      <OverPack {...props} {...dataSource.OverPack}>
        <QueueAnim type="bottom" leaveReverse key="page" delay={[0, 100]} {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
      </OverPack>
    );
  }
}

export default Content13;
