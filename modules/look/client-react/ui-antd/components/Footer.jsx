import React from 'react';
import styled from 'styled-components';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';

import { PAGES_ROUTES } from '@gqlapp/pages-client-react';

import Row from './Row';
import Col from './Col';
import Icon from './Icon';
import Collapse from './Collapse';
import CollapsePanel from './CollapsePanel';

const Img = styled.img`
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Container = styled.a`
  float: left;
  width: 25%;
  @media screen and (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;

const ChildLink = styled.div`
  @media only screen and (max-width: 768px) {
    display: inline-grid;
  }
`;

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
          <Col lg={24} md={24} xs={0}>
            <h2 style={{ color: 'white' }} {...title}>
              {typeof title.children === 'string' && title.children.match(isImg) ? (
                <img src={title.children} width="100%" alt="img" />
              ) : (
                title.children
              )}
            </h2>
            <ChildLink {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</ChildLink>
          </Col>
          <Col lg={0} md={0} xs={24}>
            {item.name === 'dropdownable' ? (
              <Collapse
                expandIconPosition={'right'}
                accordion
                ghost
                expandIcon={({ isActive }) =>
                  isActive ? (
                    <Icon type="CaretUpFilled" style={{ fontSize: '20px', color: 'white' }} />
                  ) : (
                    <Icon type="CaretDownFilled" style={{ fontSize: '20px', color: 'white' }} />
                  )
                }
              >
                <CollapsePanel header={<h2 style={{ color: 'white', margin: '0' }}>{title.children}</h2>}>
                  <ChildLink {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</ChildLink>
                </CollapsePanel>
              </Collapse>
            ) : (
              <>
                <h2 {...title}>
                  {typeof title.children === 'string' && title.children.match(isImg) ? (
                    <img src={title.children} width="100%" alt="img" />
                  ) : (
                    title.children
                  )}
                </h2>
                <ChildLink {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</ChildLink>
              </>
            )}
          </Col>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const platform = props.platform;
    const year = new Date().getFullYear();
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
            lg: 6,
            xl: 6,
            className: 'block',
            title: {
              className: 'logo',
              children: platform && platform.logo
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
                        <Container
                          href={platform && platform.platformSocial && platform.platformSocial.facebook}
                          target="_blank"
                        >
                          <Img
                            src={
                              'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170780/ypoeagxzxrcwfnhxydir.svg'
                            }
                            height="30"
                            width="30"
                            align="centre"
                          />
                        </Container>
                        <Container
                          href={platform && platform.platformSocial && platform.platformSocial.youtube}
                          target="_blank"
                        >
                          <Img
                            src={
                              'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170807/nqwlv8ulatkj8qnml6uq.png'
                            }
                            height="30"
                            width="30"
                            align="centre"
                          />
                        </Container>
                        <Container
                          href={platform && platform.platformSocial && platform.platformSocial.twitter}
                          target="_blank"
                        >
                          <Img
                            src={
                              'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170822/ieq0oplvvympjnwqdhvm.svg'
                            }
                            height="30"
                            width="30"
                            align="centre"
                          />
                        </Container>
                        <Container
                          href={platform && platform.platformSocial && platform.platformSocial.linkedIn}
                          target="_blank"
                        >
                          <Img
                            src={
                              'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170837/q0hfnknlfdrsnlfq6chx.svg'
                            }
                            height="30"
                            width="30"
                            align="centre"
                          />
                        </Container>
                        <Container
                          href={platform && platform.platformSocial && platform.platformSocial.instagram}
                          target="_blank"
                        >
                          <Img
                            src={
                              'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602170860/twtea5mc1wxflssxbwx9.png'
                            }
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
            name: 'dropdownable',
            xs: 24,
            md: 6,
            lg: 6,
            xl: 6,
            className: 'block',
            title: { children: 'About Company' },
            childWrapper: {
              children: [{ name: 'link0', href: PAGES_ROUTES.aboutUs, children: 'About Us' }]
            }
          },
          {
            name: 'dropdownable',
            xs: 24,
            md: 6,
            lg: 6,
            xl: 6,
            className: 'block',
            title: { children: 'Static Pages' },
            childWrapper: {
              children: [
                { href: PAGES_ROUTES.faq, name: 'link0', children: 'FAQ' },
                { name: 'link1', href: PAGES_ROUTES.termsOfService, children: 'Terms Of Service' },
                { name: 'link2', href: PAGES_ROUTES.privacyPolicy, children: 'Privacy Policy' }
              ]
            }
          },
          {
            name: 'dropdownable',
            xs: 24,
            md: 6,
            lg: 6,
            xl: 6,
            className: 'block',
            title: { children: 'Keep in Touch' },
            childWrapper: {
              align: 'center',
              children: [
                { href: '/contact', name: 'link0', children: 'Contact Us' },
                { href: PAGES_ROUTES.email, name: 'link1', children: 'Email' }
              ]
            }
          }
        ]
      },
      copyrightWrapper: { className: 'copyright-wrapper' },
      copyrightPage: { className: 'home-page' },
      copyright: {
        className: 'copyright',
        children: platform && (
          <>
            <span>
              <a href="https://approxyma.com" target="_blank" rel="noopener noreferrer">
                {platform.name} &copy; {year}
              </a>
            </span>
          </>
        )
      }
    };
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
