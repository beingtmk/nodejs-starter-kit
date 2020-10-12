import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import settings from '@gqlapp/config';

const MataTags = props => {
  const { title, url, description, image } = props;
  // console.log(props);
  const displayImage =
    image || 'https://res.cloudinary.com/dpvrqxttb/image/upload/v1585145914/edgenus/tkv2wuwutfj0brqbmbja.svg';
  return (
    <Helmet>
      {/* General tags */}
      <title>{`${settings.app.name} - ${title}`}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={`www.edgenus.com${url}`} />
      <meta property="og:title" content={`${settings.app.name} - ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={displayImage} />
      <meta property="og:type" content="website" />
      {/* Twitter Card tags */}
      <meta name="twitter:title" content={`${settings.app.name} - ${title}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={displayImage} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};
MataTags.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

export default MataTags;
