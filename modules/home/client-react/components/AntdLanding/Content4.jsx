import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import VideoPlay from 'react-sublime-video';
import { getChildrenToRender } from './utils';

const Content40DataSource = {
  wrapper: { className: 'home-page-wrapper content4-wrapper' },
  page: { className: 'home-page content4' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: '蚂蚁金融云提供专业的服务',
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content content4-title-content',
        children: '科技想象力，金融创造力'
      }
    ]
  },
  video: {
    className: 'content4-video',
    children: {
      video: 'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4',
      image: 'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg'
    }
  }
};

function Content4(props) {
  const { ...tagProps } = props;
  const { isMobile } = tagProps;
  const dataSource = Content40DataSource;
  delete tagProps.isMobile;
  const animation = {
    y: '+=30',
    opacity: 0,
    type: 'from',
    ease: 'easeOutQuad'
  };
  const videoChildren = dataSource.video.children.video;
  const videoNameArray = videoChildren.split('.');
  const type = videoNameArray[videoNameArray.length - 1];
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div key="title" {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </div>
        <OverPack {...dataSource.OverPack}>
          <TweenOne key="video" animation={{ ...animation, delay: 300 }} {...dataSource.video}>
            {isMobile ? (
              <video width="100%" loop poster={dataSource.video.children.image}>
                <source src={videoChildren} type={`video/${type}`} />
                <track kind="captions" />
              </video>
            ) : (
              <VideoPlay loop width="100%" poster={dataSource.video.children.image}>
                <source src={videoChildren} type={`video/${type}`} />
              </VideoPlay>
            )}
          </TweenOne>
        </OverPack>
      </div>
    </div>
  );
}

export default Content4;
