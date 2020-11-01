import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import { Row, Col } from '@gqlapp/look-client-react';

import { getChildrenToRender } from './utils';

function Pricing0(props) {
  const { t, ...tagProps } = props;
  const { isMobile } = tagProps;
  const Pricing00DataSource = {
    wrapper: { className: 'home-page-wrapper pricing0-wrapper' },
    OverPack: { playScale: 0.3, className: 'home-page pricing0' },
    imgWrapper: { className: 'pricing0-img-wrapper', md: 12, xs: 24 },
    img: {
      className: 'pricing0-img',
      name: 'image',
      children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ'
    },
    childWrapper: {
      className: 'pricing0-text-wrapper',
      md: 12,
      xs: 24,
      children: [
        {
          name: 'title',
          children: t('pricing0.childWrapper.title'),
          className: 'pricing0-title'
        },
        {
          name: 'content',
          children: t('pricing0.childWrapper.content'),
          className: 'pricing0-content'
        },
        { name: 'pricing', children: '¥2,200', className: 'pricing0-pricing' },
        {
          name: 'button',
          children: {
            icon: 'shopping-cart',
            href: '#',
            type: 'primary',
            children: t('pricing0.childWrapper.button')
          }
        }
      ]
    }
  };
  const dataSource = Pricing00DataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile
      ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
      : {
          x: '-=30',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
  };
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <OverPack component={Row} {...dataSource.OverPack}>
        <TweenOne
          key="img"
          animation={animType.one}
          resetStyle
          {...dataSource.imgWrapper}
          component={Col}
          componentProps={{
            md: dataSource.imgWrapper.md,
            xs: dataSource.imgWrapper.xs
          }}
        >
          <span {...dataSource.img}>
            <img src={dataSource.img.children} width="100%" alt="img" />
          </span>
        </TweenOne>
        <QueueAnim
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.childWrapper}
          component={Col}
          componentProps={{
            md: dataSource.childWrapper.md,
            xs: dataSource.childWrapper.xs
          }}
        >
          {dataSource.childWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
      </OverPack>
    </div>
  );
}
Pricing0.propTypes = {
  t: PropTypes.func
};

export default translate('home')(Pricing0);
