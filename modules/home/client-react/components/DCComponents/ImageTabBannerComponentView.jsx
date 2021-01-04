import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, TabPane } from '@gqlapp/look-client-react';
import { TAB_LABEL } from '@gqlapp/home-common';

import { getChildrenToRender } from '../AntdLanding/utils';
import ImageTabContent from './ImageTabContent';

const ImageTabBannerComponentView = props => {
  const { t } = props;
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
        // {
        //   name: 'content',
        //   className: 'content-underline',
        //   children: (
        //     <div align="center">
        //       <div key="line" className="title-line-wrapper" align="left">
        //         <div
        //           className="title-line"
        //           // style={{ transform: "translateX(-64px)" }}
        //         />
        //       </div>
        //     </div>
        //   ),
        // },
        {
          name: 'content',
          className: 'content-underline',
          children: (
            <div align="center">
              {
                <Tabs centered>
                  {TAB_LABEL.map((tL, indx) => (
                    <TabPane
                      tab={
                        <span>
                          {/* <AppleOutlined /> */}
                          {tL}
                        </span>
                      }
                      key={indx}
                    >
                      <ImageTabContent t={t} filter={{ label: tL, isActive: true }} />
                    </TabPane>
                  ))}
                </Tabs>
              }
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
  const { wrapper, titleWrapper, page } = dataSource;
  return (
    <div {...props} {...wrapper}>
      <div {...page}>
        <div {...titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
      </div>
    </div>
  );
};

ImageTabBannerComponentView.propTypes = {
  isMobile: PropTypes.bool,
  data: PropTypes.object,
  t: PropTypes.func
};

export default ImageTabBannerComponentView;
