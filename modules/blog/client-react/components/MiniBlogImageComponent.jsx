import React from "react";
import PropTypes from "prop-types";

const MiniBlogImageComponent = (props) => {
  return (
    <div
      className="blog-list-card-image"
      style={{
        overflow: "hidden",
        minWidth: "200px",
        height: "200px",

        backgroundImage: `url(${props.image})`,
        objectFit: "cover",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      align="center"
    >
      {props.catagory && (
        <div className="blog-mini-card-image-catagory">
          <h3 style={{ color: "inherit" }}>
            {props.catagory.map((item) => `${item} `)}
          </h3>
        </div>
      )}
    </div>
  );
};

MiniBlogImageComponent.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.number,
};

export default MiniBlogImageComponent;
