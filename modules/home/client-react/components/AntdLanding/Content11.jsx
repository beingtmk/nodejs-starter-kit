import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Heading, Button } from '@gqlapp/look-client-react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { getChildrenToRender } from './utils';

class Content11 extends React.PureComponent {
  render() {
    const { t, ...props } = this.props;
    const Content110DataSource = {
      OverPack: {
        className: 'home-page-wrapper content11-wrapper',
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
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('content11.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          },
          {
            name: 'content',
            children: t('content11.titleWrapper.content'),
            className: 'title-content'
          },
          {
            name: 'content2',
            children: t('content11.titleWrapper.content2'),
            className: 'title-content'
          }
        ]
      },
      button: {
        className: '',
        children: { a: { className: 'button', href: '#', children: t('content11.button') } }
      }
    };
    const dataSource = Content110DataSource;
    delete props.isMobile;
    return (
      <OverPack {...props} {...dataSource.OverPack}>
        <QueueAnim type="bottom" leaveReverse key="page" delay={[0, 100]} {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: 'center' }}
          {...dataSource.button}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          <Button {...dataSource.button.children.a}>{dataSource.button.children.a.children}</Button>
        </TweenOne>
      </OverPack>
    );
  }
}
Content11.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate('home')(Content11);
