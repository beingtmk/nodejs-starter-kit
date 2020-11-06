import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { Icon, Button } from '@gqlapp/look-client-react';

import { isImg } from './utils';

class Banner extends React.PureComponent {
  render() {
    const { t, ...currentProps } = this.props;
    const Banner00DataSource = {
      wrapper: { className: 'banner0' },
      textWrapper: { className: 'banner0-text-wrapper' },
      title: {
        className: 'banner0-title',
        children: t('banner0.title')
      },
      content: {
        className: 'banner0-content',
        children: t('banner0.content')
      },
      button: { className: 'banner0-button', children: t('banner0.button') }
    };
    const dataSource = Banner00DataSource;
    delete currentProps.isMobile;
    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <QueueAnim key="QueueAnim" type={['bottom', 'top']} delay={200} {...dataSource.textWrapper}>
          <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' && dataSource.title.children.match(isImg) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div>
          <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="banner0-icon"
          key="icon"
        >
          <Icon type="DownOutlined" />
        </TweenOne>
      </div>
    );
  }
}
Banner.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Banner);
