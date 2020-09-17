import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { getChildrenToRender } from './utils';

class Banner4 extends React.PureComponent {
  render() {
    const { t, ...tagProps } = this.props;
    const Banner40DataSource = {
      wrapper: { className: 'home-page-wrapper banner4' },
      page: { className: 'home-page banner4-page' },
      childWrapper: {
        className: 'banner4-title-wrapper',
        children: [
          { name: 'title', children: t('banner4.childWrapper.name'), className: 'banner4-title' },
          {
            name: 'content',
            className: 'banner4-content',
            children: t('banner4.childWrapper.content')
          },
          {
            name: 'button',
            children: { href: '#', type: 'primary', children: t('banner4.childWrapper.button') }
          }
        ]
      },
      image: {
        className: 'banner4-image',
        children: 'https://gw.alipayobjects.com/mdn/rms/afts/img/A*k3InRLiZDk4AAAAAAAAAAABjARQnAQ'
      }
    };
    const dataSource = Banner40DataSource;
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
Banner4.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Banner4);
