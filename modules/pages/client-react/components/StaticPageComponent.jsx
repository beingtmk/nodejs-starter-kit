import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@gqlapp/look-client-react';
import QueueAnim from 'rc-queue-anim';

const Banner00DataSource = {
  wrapper: { className: 'staticP' },
  textWrapper: { className: 'staticP-text-wrapper' },
  title: {
    className: 'staticP-title',
    children: 'https://res.cloudinary.com/www-lenshood-in/image/upload/v1580223483/nodejs-starterkit/untitled_4.svg'
  },
  content: {
    className: 'staticP-content',
    children: 'An All JavaScript Solution For Your App Needs'
  },
  button: { className: 'staticP-button', children: 'Learn More' }
};

class Banner extends React.PureComponent {
  render() {
    const { ...currentProps } = this.props;
    const { children } = this.props;
    // console.log('static page', children);
    const dataSource = Banner00DataSource;
    delete currentProps.isMobile;
    return (
      <div style={{ background: 'white' }}>
        <div
          {...currentProps}
          {...dataSource.wrapper}
          style={{
            background: `url(${this.props.background ||
              'https://res.cloudinary.com/www-lenshood-in/image/upload/v1579772693/nodejs-starterkit/xHxWkcvaIcuAdQl.jpg'})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            float: 'right'
          }}
        >
          <QueueAnim key="QueueAnim" type={['bottom', 'top']} delay={200} {...dataSource.textWrapper}>
            <h2
              key="title"
              style={{
                fontSize: '45px',
                textAlign: 'center',
                color: 'white',
                marginTop: '-20px',
                marginBottom: '0'
              }}
            >
              {this.props.title}
            </h2>
            <div name="content" className="content-underline" style={{ marginBottom: '20px', height: '3px' }}>
              <div align="center">
                <div key="line" className="title-line-wrapper" align="left">
                  <div
                    className="title-line staticP-title-line"
                    style={{ height: '3px' }}
                    // style={{ transform: "translateX(-64px)" }}
                  />
                </div>
              </div>
            </div>
          </QueueAnim>
        </div>
        <Divider />
        <div style={{ maxWidth: '1200px', margin: 'auto', paddingTop: '30px' }}>{children}</div>
      </div>
    );
  }
}

Banner.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  title: PropTypes.string
};

export default Banner;
