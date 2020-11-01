import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Heading, Row, Col } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

function Feature7(props) {
  const { isMobile, t, ...tagProps } = props;
  const Feature70DataSource = {
    wrapper: { className: 'home-page-wrapper feature7-wrapper' },
    page: { className: 'home-page feature7' },
    OverPack: { playScale: 0.3 },
    titleWrapper: {
      className: 'feature7-title-wrapper',
      children: [
        {
          name: 'title',
          className: 'feature7-title-h1',
          children: (
            <>
              <Heading type="3" align="center">
                {t('feature7.titleWrapper.title')}
              </Heading>
            </>
          )
        },
        {
          name: 'content',
          className: 'feature7-title-content',
          children: t('feature7.titleWrapper.content')
        }
      ]
    },
    blockWrapper: {
      className: 'feature7-block-wrapper',
      gutter: 24,
      children: [
        {
          md: 6,
          xs: 24,
          name: 'block0',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block0.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block0.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block1',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block1.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block1.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block2',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block2.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block2.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block3',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block3.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block3.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block4',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block4.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block4.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block5',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block5.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block5.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block6',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block6.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block6.content')
              }
            ]
          }
        },
        {
          md: 6,
          xs: 24,
          name: 'block7',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg'
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: t('feature7.blockWrapper.block7.title')
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: t('feature7.blockWrapper.block7.content')
              }
            ]
          }
        }
      ]
    }
  };
  const dataSource = Feature70DataSource;
  const { blockWrapper, titleWrapper } = dataSource;
  const childrenToRender = blockWrapper.children.map((item, i) => (
    <Col {...item} key={i.toString()}>
      <a {...item.children}>{item.children.children.map(getChildrenToRender)}</a>
    </Col>
  ));
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div {...dataSource.titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim key="queue" type="bottom" leaveReverse interval={50} component={Row} {...blockWrapper}>
            {childrenToRender}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

Feature7.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate('home')(Feature7);
