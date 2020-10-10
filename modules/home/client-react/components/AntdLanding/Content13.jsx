import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import { Heading } from '@gqlapp/look-client-react';
import { getChildrenToRender } from './utils';

class Content13 extends React.PureComponent {
  render() {
    const { t, ...props } = this.props;
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
          {
            name: 'title',
            children: (
              <>
                <Heading type="3" align="center">
                  {t('content13.titleWrapper.title')}
                </Heading>
              </>
            ),
            className: 'title-h1'
          },
          {
            name: 'content',
            children: t('content13.titleWrapper.content'),
            className: 'title-content'
          },
          {
            name: 'content2',
            children: t('content13.titleWrapper.content2'),
            className: 'title-content'
          }
        ]
      }
    };

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
Content13.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Content13);
