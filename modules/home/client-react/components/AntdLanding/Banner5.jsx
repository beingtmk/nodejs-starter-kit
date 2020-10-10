import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Heading } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Banner5 extends React.PureComponent {
  render() {
    const { t, ...tagProps } = this.props;
    const Banner50DataSource = {
      wrapper: { className: 'home-page-wrapper banner5' },
      page: { className: 'home-page banner5-page' },
      childWrapper: {
        className: 'banner5-title-wrapper',
        children: [
          {
            name: 'title',
            children: (
              <>
                <Heading type="3">{t('banner5.title')}</Heading>
              </>
            ),
            className: 'banner5-title'
          },
          {
            name: 'explain',
            className: 'banner5-explain',
            children: t('banner5.explain')
          },
          {
            name: 'content',
            className: 'banner5-content',
            children: t('banner5.content')
          },
          {
            name: 'button',
            className: 'banner5-button-wrapper',
            children: {
              href: '#',
              className: 'banner5-button',
              type: 'primary',
              children: t('banner5.button')
            }
          }
        ]
      },
      image: {
        className: 'banner5-image',
        children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ'
      }
    };
    const dataSource = Banner50DataSource;
    delete tagProps.isMobile;
    const animType = {
      queue: 'bottom',
      one: {
        y: '+=30',
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad'
      }
    };
    return (
      <div {...tagProps} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <QueueAnim
            key="text"
            type={animType.queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.childWrapper}
            componentProps={{
              md: dataSource.childWrapper.md,
              xs: dataSource.childWrapper.xs
            }}
          >
            {dataSource.childWrapper.children.map(getChildrenToRender)}
          </QueueAnim>
          <TweenOne animation={animType.one} key="title" {...dataSource.image}>
            <img src={dataSource.image.children} width="100%" alt="img" />
          </TweenOne>
        </div>
      </div>
    );
  }
}
Banner5.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Banner5);
