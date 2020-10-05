import React from 'react';
import styled from 'styled-components';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col, Button } from 'antd';

const Img = styled.img`
  &:hover {
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  float: left;
  width: 25%;
  @media screen and (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;

const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'https://res.cloudinary.com/www-lenshood-in/image/upload/v1580224348/nodejs-starterkit/untitled_5.svg'
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: 'An all js stater-kit for all app needs.'
            },
            {
              name: 'content0',
              children: (
                <h1 style={{ fontSize: '25px', color: 'white' }}>
                  <div align="center" className="row" style={{ display: 'flex' }}>
                    <Container>
                      <Img
                        src={require('@gqlapp/listing-client-react/components/assets/facebook.svg')}
                        height="30"
                        width="30"
                        align="centre"
                      />
                    </Container>
                    <Container>
                      <Img
                        src={require('@gqlapp/listing-client-react/components/assets/youtube.png')}
                        height="30"
                        width="30"
                        align="centre"
                      />
                    </Container>
                    <Container>
                      <Img
                        src={require('@gqlapp/listing-client-react/components/assets/twitter.svg')}
                        height="30"
                        width="30"
                        align="centre"
                      />
                    </Container>
                    <Container>
                      <Img
                        src={require('@gqlapp/listing-client-react/components/assets/linkedin.svg')}
                        height="30"
                        width="30"
                        align="centre"
                      />
                    </Container>
                    <Container>
                      <Img
                        src={require('@gqlapp/listing-client-react/components/assets/instagram.png')}
                        height="30"
                        width="30"
                        align="centre"
                      />
                    </Container>
                  </div>
                </h1>
              )
            }
          ]
        }
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'About Company' },
        childWrapper: {
          children: [{ name: 'link0', href: '/about-us', children: 'About Us' }]
        }
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Static Pages' },
        childWrapper: {
          children: [
            { href: '/faq', name: 'link0', children: 'FAQ' },
            { name: 'link1', href: '/terms-of-service', children: 'Terms Of Service' },
            { name: 'link2', href: '/privacy-policy', children: 'Privacy Policy' }
          ]
        }
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Keep in Touch' },
        childWrapper: {
          children: [
            { href: '/contact', name: 'link0', children: 'Contact Us' },
            { href: '/email', name: 'link1', children: 'Email' }
          ]
        }
      }
    ]
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <>
        <span>
          <a href="https://approxyma.com">Approxyma</a>
        </span>
      </>
    )
  }
};

const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children =
    typeof item.children === 'string' && item.children.match(isImg)
      ? React.createElement('img', { src: item.children, alt: 'img' })
      : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer1'
  };

  getLiChildren = data =>
    data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item;
      return (
        <Col key={i.toString()} {...itemProps} title={null} content={null}>
          <h2 {...title}>
            {typeof title.children === 'string' && title.children.match(isImg) ? (
              <img src={title.children} width="100%" alt="img" />
            ) : (
              title.children
            )}
          </h2>
          <div {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</div>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const dataSource = Footer10DataSource;

    delete props.isMobile;
    const childrenToRender = this.getLiChildren(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim type="bottom" key="ul" leaveReverse component={Row} {...dataSource.block}>
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key="copyright"
            {...dataSource.copyrightWrapper}
          >
            <div {...dataSource.copyrightPage}>
              <div {...dataSource.copyright}>{dataSource.copyright.children}</div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
