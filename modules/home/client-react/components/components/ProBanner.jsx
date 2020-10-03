import React from "react";
import PropTypes from "prop-types";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Button } from "antd";
import BannerSVGAnim from "./component/BannerSVGAnim";

function Banner(props) {
  return (
    <div className="pro-banner-container">
      <div className="pro-banner-wrapper">
        {/* {props.isMobile && (
          <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
            <div className="home-banner-image">
              <img
                alt="banner"
                src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
                width="100%"
              />
            </div>
          </TweenOne>
        )} */}
        <QueueAnim
          className="banner-title-wrapper"
          type={props.isMobile ? "bottom" : "right"}
        >
          <div key="line" className="title-line-wrapper">
            <div
              className="title-line"
              style={{ transform: "translateX(-64px)" }}
            />
          </div>
          <h1 key="h1">MApp!</h1>
          <p key="content">
            Welcome to MApp!
            <br /> You've reached the one stop shop for manager awesomeness.{" "}
            <br /> Log in and explore the world of people management.
          </p>
          <div key="button" className="button-wrapper">
            <Button type="primary" icon="login" href="login">
              Login
            </Button>
            <Button
              icon="user-add"
              style={{ margin: "0 16px" }}
              type="primary"
              href="register"
              ghost
            >
              Sign Up
            </Button>
          </div>
        </QueueAnim>

        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      </div>
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
