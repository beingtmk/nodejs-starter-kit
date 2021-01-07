import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';

import { NO_IMG } from '@gqlapp/listing-common';
import { Row, Col, Carousel } from '@gqlapp/look-client-react';

const ListingDetailImgCarousel = props => {
  const { images, youtubeUrl, carouselLayout = true } = props;
  const [visibleImgIdx, setVisibleImgIdx] = useState([true]);
  const [visibleVidIdx, setVisibleVidIdx] = useState([]);

  let carouselThumbnail = [];
  carouselThumbnail = youtubeUrl && youtubeUrl.length !== 0 ? [...carouselThumbnail, ...youtubeUrl] : [];
  carouselThumbnail =
    images && images.length !== 0
      ? [...carouselThumbnail, ...images]
      : carouselThumbnail.length !== 0
      ? [...carouselThumbnail]
      : [{ url: NO_IMG, type: 'image' }];

  const status = {
    // eslint-disable-next-line react/display-name
    customPaging: function(i) {
      return (
        <a>
          <img
            src={
              (carouselThumbnail &&
                carouselThumbnail.length !== 0 &&
                carouselThumbnail[i] &&
                carouselThumbnail[i].type === 'image' &&
                carouselThumbnail[i].url) ||
              'https://res.cloudinary.com/approxyma/image/upload/v1596703877/3721679-youtube_108064_ratbaa.png'
            }
            style={{ width: '30px', height: '30px', zIndex: '10' }}
          />
        </a>
      );
    },
    // autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false
  };

  const getYoutubeUrl = url => {
    // console.log('url', url);
    const newUrl = url.replace('watch?v=', 'embed/');

    return newUrl;
  };

  const showImg = (type, idx) => {
    const visImg = [...Array(images.length).keys()].map(() => false);
    const visVid = [...Array(youtubeUrl.length).keys()].map(() => false);
    if (type === 'img') {
      visImg[idx] = true;
      setVisibleImgIdx(visImg);
      setVisibleVidIdx(visVid);
    } else {
      visVid[idx] = true;
      setVisibleImgIdx(visImg);
      setVisibleVidIdx(visVid);
    }
  };
  return (
    <Row gutter={4}>
      <Col lg={carouselLayout ? 24 : 0} md={carouselLayout ? 24 : 0} xs={24}>
        <div align="center">
          <div
            style={{
              height: 'fit-content',
              position: 'relative',
              marginBottom: '30px'
            }}
          >
            <Carousel spanType2={true} showArrow={carouselLayout} {...status}>
              {images &&
                images.map((item, id) => (
                  <div key={id} align="center">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: '',
                          isFluidWidth: true,
                          src: item.url,
                          srcSet: item.url,
                          sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                          src: item.url,
                          width: 1426,
                          height: 2000
                        },
                        lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                      }}
                      {...{
                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                        enlargedImagePosition: 'over'
                      }}
                    />
                  </div>
                ))}
              {youtubeUrl.length > 0 &&
                youtubeUrl.map(yT => (
                  <div key="video">
                    <iframe
                      width="100%"
                      height="300px"
                      src={getYoutubeUrl(yT.url)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </Col>
      <Col lg={!carouselLayout ? 24 : 0} md={!carouselLayout ? 24 : 0} xs={0}>
        <Row gutter={24}>
          <Col lg={4} md={4} xs={0}>
            {images &&
              images.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '5px' }} align="center" onClick={() => showImg('img', idx)}>
                  <img src={item.url} width={80} />
                </div>
              ))}
            {youtubeUrl.length > 0 &&
              youtubeUrl.map((i, idx) => (
                <div key={idx} style={{ marginBottom: '5px' }} align="center" onClick={() => showImg('vid', idx)}>
                  <img
                    src={
                      'https://res.cloudinary.com/approxyma/image/upload/v1596703877/3721679-youtube_108064_ratbaa.png'
                    }
                    width={80}
                  />
                </div>
              ))}
          </Col>
          <Col lg={20} md={20} xs={24}>
            {images &&
              images.map((item, idx) => (
                <div key={idx} align="center">
                  {visibleImgIdx[idx] && (
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: 'Product preview image.',
                          isFluidWidth: true,
                          src: item.url
                        },
                        largeImage: {
                          src: item.url,
                          width: 1200,
                          height: 1800
                        }
                      }}
                      enlargedImageContainerStyle={{ zIndex: '1' }}
                    />
                  )}
                </div>
              ))}
            {youtubeUrl.length > 0 &&
              youtubeUrl.map((yT, idx) => (
                <div key="video">
                  {visibleVidIdx[idx] && (
                    <iframe
                      width="100%"
                      height="300px"
                      src={getYoutubeUrl(yT.url)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

ListingDetailImgCarousel.propTypes = {
  images: PropTypes.array,
  youtubeUrl: PropTypes.array,
  carouselLayout: PropTypes.bool
};

export default ListingDetailImgCarousel;
