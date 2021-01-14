import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useImageLoaded } from '@gqlapp/listing-client-react';
import { compose } from '@gqlapp/core-common';
import { List, ListItem, Spinner, EmptyComponent } from '@gqlapp/look-client-react';

import { withDynamicCarousels } from '../../containers/DCComponents/DynamicCarouselOperations';

const Text = styled.span`
  width: 65%;
  color: white;
  font-weight: bold;
  font-size: 3vh;
  @media screen and (min-width: 320px) {
    width: 70%;
  }
`;

const ImageTabContent = props => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const { t, loading, dynamicCarousels } = props;

  const image = item => (
    <div style={{ position: 'relative' }}>
      <div className={'HVCenter'} style={{ background: 'black', opacity: '0.5' }} />
      <div className={'HVCenter'}>
        <Text>{item.title}</Text>
      </div>
      {!loaded && (
        <div
          style={{
            overflow: 'hidden',
            height: '290px',
            borderRadius: '8px 8px 0px 0px',
            background: 'linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)',
            animation: 'ant-skeleton-loading 1.4s ease infinite'
          }}
          align="center"
        ></div>
      )}
      <img
        ref={ref}
        onLoad={onLoad}
        src={item.imageUrl}
        width="100%"
        style={{
          // height: '200px',
          display: !loaded && 'none'
        }}
      />
    </div>
  );

  // console.log('props', props);
  return (
    <div align="center">
      {loading && <Spinner size="small" />}
      {!loading && dynamicCarousels && dynamicCarousels.totalCount > 0 ? (
        <List
          grid={{ /* gutter: 16, */ xs: 3, sm: 3, md: 3, lg: 4, xl: 5, xxl: 6 }}
          dataSource={dynamicCarousels.edges.map(({ node }) => node)}
          renderItem={item => <ListItem>{item.link ? <a href={item.link}>{image(item)}</a> : image(item)}</ListItem>}
        />
      ) : (
        <div style={{ height: '60vh', position: 'relative' }}>
          <EmptyComponent description={t('dynamicCarousel.adminPanel.noBannersMsg')} /* emptyLink={emptyLink} */ />
        </div>
      )}
    </div>
  );
};

ImageTabContent.propTypes = {
  loading: PropTypes.bool,
  dynamicCarousels: PropTypes.object,
  t: PropTypes.func
};

export default compose(withDynamicCarousels)(ImageTabContent);
