import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

import { NO_IMG } from '@gqlapp/listing-common';
import { Row, Col, Carousel } from '@gqlapp/look-client-react';
import { PropTypes } from 'prop-types';

const ListingDetailImgCarousel = props => {
  const { images, youtubeUrl } = props;

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

  return (
    <Row gutter={4}>
      {/* <Col lg={4} md={4} xs={0}>
      {images &&
        images.map((item, id) => (
          <div key={id} style={{ marginBottom: '5px' }} align="center">
            <Image src={item.url} width={80} />
          </div>
        ))}
    </Col> */}
      {/* <Col lg={20} md={20} xs={24}> */}
      <Col lg={24} md={24} xs={24}>
        <Col lg={24} md={24} xs={24}>
          <div align="center">
            <div
              style={{
                height: 'fit-content',
                position: 'relative',
                marginBottom: '30px'
              }}
            >
              <Carousel spanType2={true} /* showArrow={false} */ {...status}>
                {images &&
                  images.map((item, id) => (
                    <div key={id} align="center">
                      {/* <Tooltip title="click to zoom" placement="bottom">
                  <Image src={item.url} height={300} />
                </Tooltip> */}
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
      </Col>
    </Row>
  );
};

ListingDetailImgCarousel.propTypes = {
  images: PropTypes.array,
  youtubeUrl: PropTypes.array
};

export default ListingDetailImgCarousel;
