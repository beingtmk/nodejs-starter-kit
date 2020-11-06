import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col, Carousel as AntCarousel } from '@gqlapp/look-client-react';

import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

class Feature6 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      current: 0
    };
  }

  onTitleClick = (_, i) => {
    const carouselRef = this.carouselRef.current.childRefs.carousel;
    carouselRef.goTo(i);
  };

  onBeforeChange = (_, newIndex) => {
    this.setState({
      current: newIndex
    });
  };

  getChildrenToRender = dataSource => {
    const { current } = this.state;
    const { Carousel } = dataSource;
    const { titleWrapper, children: childWrapper, wrapper, ...carouselProps } = Carousel;

    const { barWrapper, title: titleChild, ...titleWrapperProps } = titleWrapper;
    const titleToRender = [];

    const childrenToRender = childWrapper.map((item, ii) => {
      const { title, children, ...itemProps } = item;
      titleToRender.push(
        <div
          {...title}
          key={ii.toString()}
          onClick={e => {
            this.onTitleClick(e, ii);
          }}
          className={ii === current ? `${title.className || ''} active` : title.className}
        >
          {title.children}
        </div>
      );
      const childrenItem = children.map(($item, i) => {
        const { number, children: child, ...childProps } = $item;
        const numberChild = number.children.replace(/[^0-9.-]/g, '');
        const { unit, toText, ...numberProps } = number;
        return (
          <Col {...childProps} key={i.toString()}>
            <TweenOne
              {...numberProps}
              animation={{
                Children: {
                  value: parseFloat(numberChild),
                  floatLength: parseFloat(numberChild) - Math.floor(parseFloat(numberChild)) > 0 ? 2 : 0,
                  formatMoney: true
                },
                duration: 1000,
                delay: 300,
                ease: 'easeInOutCirc'
              }}
              component="span"
            >
              0
            </TweenOne>
            {unit && <span {...unit}>{unit.children}</span>}
            <p {...child}>{child.children}</p>
          </Col>
        );
      });
      return (
        <QueueAnim type="bottom" component={Row} {...itemProps} key={ii.toString()}>
          {childrenItem}
        </QueueAnim>
      );
    });

    const width = 100 / childrenToRender.length;
    return (
      <QueueAnim key="queue" leaveReverse type="bottom" delay={[0, 100]} {...wrapper} ref={this.carouselRef}>
        <div {...titleWrapperProps} key="title">
          <div {...titleChild}>
            {titleToRender}
            <div
              {...barWrapper}
              style={{
                width: `${width}%`,
                left: `${width * current}%`
              }}
            >
              <em {...barWrapper.children} />
            </div>
          </div>
        </div>
        <AntCarousel {...carouselProps} key="carousel" infinite={false} beforeChange={this.onBeforeChange}>
          {childrenToRender}
        </AntCarousel>
      </QueueAnim>
    );
  };

  render() {
    const { isMobile, t, ...props } = this.props;
    const Feature60DataSource = {
      wrapper: { className: 'home-page-wrapper feature6-wrapper' },
      OverPack: { className: 'home-page feature6', playScale: 0.3 },
      Carousel: {
        className: 'feature6-content',
        dots: false,
        wrapper: { className: 'feature6-content-wrapper' },
        titleWrapper: {
          className: 'feature6-title-wrapper',
          barWrapper: {
            className: 'feature6-title-bar-wrapper',
            children: { className: 'feature6-title-bar' }
          },
          title: { className: 'feature6-title' }
        },
        children: [
          {
            title: { className: 'feature6-title-text', children: t('feature6.block0.title') },
            className: 'feature6-item',
            name: 'block0',
            children: [
              {
                md: 8,
                xs: 24,
                className: 'feature6-number-wrapper',
                name: 'child0',
                number: {
                  className: 'feature6-number',
                  unit: { className: 'feature6-unit', children: t('feature6.block0.child0.unit') },
                  toText: true,
                  children: '116'
                },
                children: { className: 'feature6-text', children: t('feature6.block0.child0.children') }
              },
              {
                md: 8,
                xs: 24,
                className: 'feature6-number-wrapper',
                name: 'child1',
                number: {
                  className: 'feature6-number',
                  unit: { className: 'feature6-unit', children: t('feature6.block0.child1.unit') },
                  toText: true,
                  children: '1.17'
                },
                children: { className: 'feature6-text', children: t('feature6.block0.child1.children') }
              },
              {
                md: 8,
                xs: 24,
                className: 'feature6-number-wrapper',
                name: 'child2',
                number: {
                  className: 'feature6-number',
                  unit: { className: 'feature6-unit', children: t('feature6.block0.child2.unit') },
                  toText: true,
                  children: '2.10'
                },
                children: { className: 'feature6-text', children: t('feature6.block0.child2.children') }
              }
            ]
          },
          {
            title: { className: 'feature6-title-text', children: t('feature6.block1.title') },
            className: 'feature6-item',
            name: 'block1',
            children: [
              {
                md: 8,
                xs: 24,
                name: 'child0',
                className: 'feature6-number-wrapper',
                number: {
                  className: 'feature6-number',
                  unit: { className: 'feature6-unit', children: t('feature6.block1.child0.unit') },
                  toText: true,
                  children: '116'
                },
                children: { className: 'feature6-text', children: t('feature6.block1.child0.children') }
              },
              {
                md: 8,
                xs: 24,
                name: 'child1',
                className: 'feature6-number-wrapper',
                number: {
                  className: 'feature6-number',
                  unit: { className: 'feature6-unit', children: t('feature6.block1.child1.unit') },
                  toText: true,
                  children: '1.17'
                },
                children: { className: 'feature6-text', children: t('feature6.block1.child1.children') }
              },
              {
                md: 8,
                xs: 24,
                name: 'child2',
                className: 'feature6-number-wrapper',
                number: {
                  className: 'feature6-number',
                  unit: { className: 'feature6-unit', children: t('feature6.block1.child2.unit') },
                  toText: true,
                  children: '2.10'
                },
                children: { className: 'feature6-text', children: t('feature6.block1.child2.children') }
              }
            ]
          }
        ]
      }
    };

    const dataSource = Feature60DataSource;
    return (
      <div {...props} {...dataSource.wrapper}>
        <div>
          <OverPack {...dataSource.OverPack}>{this.getChildrenToRender(dataSource)}</OverPack>
        </div>
      </div>
    );
  }
}

Feature6.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate('home')(Feature6);
