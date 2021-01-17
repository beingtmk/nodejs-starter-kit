import React from 'react';
import { Button } from '@gqlapp/look-client-react';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

class Banner extends React.PureComponent {
  render() {
    const { t, ...currentProps } = this.props;
    const Banner30DataSource = {
      wrapper: { className: 'banner3' },
      textWrapper: {
        className: 'banner3-text-wrapper',
        children: [
          {
            name: 'nameEn',
            className: 'banner3-name-en',
            children: 'Seeking Experience & Engineering Conference'
          },
          {
            name: 'slogan',
            className: 'banner3-slogan',
            children: t('banner3.textWrapper.slogan'),
            texty: true
          },
          {
            name: 'name',
            className: 'banner3-name',
            children: t('banner3.textWrapper.name')
          },
          { name: 'button', className: 'banner3-button', children: t('banner3.textWrapper.button') },
          {
            name: 'time',
            className: 'banner3-time',
            children: t('banner3.textWrapper.time')
          }
        ]
      }
    };
    const dataSource = Banner30DataSource;
    delete currentProps.isMobile;
    const children = dataSource.textWrapper.children.map(item => {
      const { name, texty, ...$item } = item;
      if (name.match('button')) {
        return (
          <Button type="primary" key={name} {...$item}>
            {item.children}
          </Button>
        );
      }

      return (
        <div key={name} {...$item}>
          {texty ? <Texty type="mask-bottom">{item.children}</Texty> : item.children}
        </div>
      );
    });
    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <QueueAnim key="QueueAnim" type={['bottom', 'top']} delay={200} {...dataSource.textWrapper}>
          {children}
        </QueueAnim>
      </div>
    );
  }
}

Banner.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Banner);
