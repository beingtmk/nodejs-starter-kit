import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";
import { Spin as Loader } from "antd";
import settings from "../../../../settings";

// To Do Abstract Out

class ProfileView extends React.Component {
  render() {
    const renderMetaData = (t) => {
      return (
        <Helmet
          title={`${settings.app.name} - ${t("profile.title")}`}
          meta={[
            {
              name: "description",
              content: `${settings.app.name} - ${t("profile.meta")}`,
            },
          ]}
        />
      );
    };

    const { t } = this.props;
    const { currentUser, currentUserLoading } = this.props;

    if (currentUserLoading && !currentUser) {
      return (
        <PageLayout select="/profile">
          {renderMetaData(t)}
          <Loader text={t("profile.loadMsg")} />
        </PageLayout>
      );
    } else if (currentUser) {
      return (
        <PageLayout select="/profile">
          {renderMetaData(t)}

          <main className="home-content-layout ant-layout-content" id="content">
            <div
              style={{
                marginTop: "54px",
                borderRadius: "0",
                border: "0",
                position: "relative",
              }}
              className="ant-card ant-card-bordered"
            >
              {/*coverphoto*/}

              <div className="ant-card-cover">
                <div
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    background: "#3f0869",
                    padding: "140px",
                    height: "33vm",
                    width: "100%",
                  }}
                ></div>
              </div>

              {/*middlepart*/}

              <div
                className="ant-card-body"
                style={{
                  maxWidth: "1200px",
                  margin: "auto",
                  position: "inherit",
                  paddingTop: "104px",
                }}
              >
                {/*Avatar*/}
                <span
                  style={{
                    width: "160px",
                    height: "160px",
                    lineHeight: "160px",
                    fontSize: "18px",
                    position: "absolute",
                    top: "-80px",
                    border: "5px solid white",
                  }}
                  className="ant-avatar ant-avatar-circle ant-avatar-image"
                >
                  <img src="https://lh3.googleusercontent.com/a-/AOh14Git-cuYF5b5-Q-oJMTsl6CJYVWhse8gmTYP-OZBMQ=s96-c"></img>
                </span>

                {/* avatar description*/}
                <div class="ant-card-meta">
                  <div class="ant-card-meta-detail">
                    <div class="ant-card-meta-title">
                      <h2>Yashwanth Sambaraj</h2>
                    </div>
                    <div class="ant-card-meta-description">
                      <h4>Web developer STUDENT</h4>
                    </div>
                  </div>
                </div>

                <br></br>

                {/*Exit and edit buttons*/}
                <div
                  style={{ position: "absolute", top: "24px", right: "24px" }}
                >
                  <a
                    href="#"
                    style={{ marginRight: "24px" }}
                    className="ant-btn ant-btn-primary ant-btn-circle-outline ant-btn-lg ant-btn-background-ghost"
                  >
                    <i
                      aria-label="icon: export"
                      className="anticon anticon-export"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        class=""
                        data-icon="export"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M888.3 757.4h-53.8c-4.2 0-7.7 3.5-7.7 7.7v61.8H197.1V197.1h629.8v61.8c0 4.2 3.5 7.7 7.7 7.7h53.8c4.2 0 7.7-3.4 7.7-7.7V158.7c0-17-13.7-30.7-30.7-30.7H158.7c-17 0-30.7 13.7-30.7 30.7v706.6c0 17 13.7 30.7 30.7 30.7h706.6c17 0 30.7-13.7 30.7-30.7V765.1c0-4.3-3.5-7.7-7.7-7.7zm18.6-251.7L765 393.7c-5.3-4.2-13-.4-13 6.3v76H438c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"></path>
                      </svg>
                    </i>
                  </a>
                  <a
                    href="#"
                    className="ant-btn ant-btn-primary ant-btn-circle-outline ant-btn-lg"
                  >
                    <i aria-label="icon: edit" className="anticon anticon-edit">
                      <svg
                        viewBox="64 64 896 896"
                        class=""
                        data-icon="edit"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                      </svg>
                    </i>
                  </a>
                </div>

                {/*About me and socialmedia links*/}
                <div
                  className="ant-row"
                  style={{ marginLeft: "-12px", marginRight: "-12px" }}
                >
                  {/*About me */}
                  <div
                    style={{ paddingLeft: "12px", paddingRight: "12px" }}
                    className="ant-col ant-col-xs-24 ant-col-md-16"
                  >
                    <div style={{ marginBottom: "24px" }}>
                      <p className="md-block-unstyled">
                        About me?! Haha u already know!
                      </p>
                    </div>
                  </div>

                  {/*socialmedia links*/}
                  <div
                    style={{ paddingLeft: "12px", paddingRight: "12px" }}
                    class="ant-col ant-col-xs-24 ant-col-md-8"
                  >
                    <div
                      style={{ paddingLeft: "12px", paddingRight: "12px" }}
                      className="ant-col ant-col-4"
                    >
                      <a href="#">
                        <i
                          aria-label="icon: facebook"
                          style={{ fontSize: "40px", color: "#41413c" }}
                          className="anticon anticon-facebook"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            class=""
                            data-icon="facebook"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"></path>
                          </svg>
                        </i>
                      </a>
                    </div>

                    <div
                      style={{ paddingLeft: "12px", paddingRight: "12px" }}
                      className="ant-col ant-col-4"
                    >
                      <a href="#">
                        <i
                          aria-label="icon: instagram"
                          style={{ fontSize: "40px", color: "#41413c" }}
                          className="anticon anticon-instagram"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            class=""
                            data-icon="instagram"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path>
                          </svg>
                        </i>
                      </a>
                    </div>

                    <div
                      style={{ paddingLeft: "12px", paddingRight: "12px" }}
                      className="ant-col ant-col-4"
                    >
                      <a href="#">
                        <i
                          aria-label="icon: linkedin"
                          style={{ fontSize: "40px", color: "#41413c" }}
                          className="anticon anticon-linkedin"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            class=""
                            data-icon="linkedin"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M847.7 112H176.3c-35.5 0-64.3 28.8-64.3 64.3v671.4c0 35.5 28.8 64.3 64.3 64.3h671.4c35.5 0 64.3-28.8 64.3-64.3V176.3c0-35.5-28.8-64.3-64.3-64.3zm0 736c-447.8-.1-671.7-.2-671.7-.3.1-447.8.2-671.7.3-671.7 447.8.1 671.7.2 671.7.3-.1 447.8-.2 671.7-.3 671.7zM230.6 411.9h118.7v381.8H230.6zm59.4-52.2c37.9 0 68.8-30.8 68.8-68.8a68.8 68.8 0 1 0-137.6 0c-.1 38 30.7 68.8 68.8 68.8zm252.3 245.1c0-49.8 9.5-98 71.2-98 60.8 0 61.7 56.9 61.7 101.2v185.7h118.6V584.3c0-102.8-22.2-181.9-142.3-181.9-57.7 0-96.4 31.7-112.3 61.7h-1.6v-52.2H423.7v381.8h118.6V604.8z"></path>
                          </svg>
                        </i>
                      </a>
                    </div>

                    <div
                      style={{ paddingLeft: "12px", paddingRight: "12px" }}
                      className="ant-col ant-col-4"
                    >
                      <a href="#">
                        <i
                          aria-label="icon: twitter"
                          style={{ fontSize: "40px", color: "#41413c" }}
                          className="anticon anticon-twitter"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            class=""
                            data-icon="twitter"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
                          </svg>
                        </i>
                      </a>
                    </div>

                    <div
                      style={{ paddingLeft: "12px", paddingRight: "12px" }}
                      className="ant-col ant-col-4"
                    >
                      <a href="#">
                        <i
                          aria-label="icon: youtube"
                          style={{ fontSize: "40px", color: "#41413c" }}
                          className="anticon anticon-youtube"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            class=""
                            data-icon="youtube"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M960 509.2c0-2.2 0-4.7-.1-7.6-.1-8.1-.3-17.2-.5-26.9-.8-27.9-2.2-55.7-4.4-81.9-3-36.1-7.4-66.2-13.4-88.8a139.52 139.52 0 0 0-98.3-98.5c-28.3-7.6-83.7-12.3-161.7-15.2-37.1-1.4-76.8-2.3-116.5-2.8-13.9-.2-26.8-.3-38.4-.4h-29.4c-11.6.1-24.5.2-38.4.4-39.7.5-79.4 1.4-116.5 2.8-78 3-133.5 7.7-161.7 15.2A139.35 139.35 0 0 0 82.4 304C76.3 326.6 72 356.7 69 392.8c-2.2 26.2-3.6 54-4.4 81.9-.3 9.7-.4 18.8-.5 26.9 0 2.9-.1 5.4-.1 7.6v5.6c0 2.2 0 4.7.1 7.6.1 8.1.3 17.2.5 26.9.8 27.9 2.2 55.7 4.4 81.9 3 36.1 7.4 66.2 13.4 88.8 12.8 47.9 50.4 85.7 98.3 98.5 28.2 7.6 83.7 12.3 161.7 15.2 37.1 1.4 76.8 2.3 116.5 2.8 13.9.2 26.8.3 38.4.4h29.4c11.6-.1 24.5-.2 38.4-.4 39.7-.5 79.4-1.4 116.5-2.8 78-3 133.5-7.7 161.7-15.2 47.9-12.8 85.5-50.5 98.3-98.5 6.1-22.6 10.4-52.7 13.4-88.8 2.2-26.2 3.6-54 4.4-81.9.3-9.7.4-18.8.5-26.9 0-2.9.1-5.4.1-7.6v-5.6zm-72 5.2c0 2.1 0 4.4-.1 7.1-.1 7.8-.3 16.4-.5 25.7-.7 26.6-2.1 53.2-4.2 77.9-2.7 32.2-6.5 58.6-11.2 76.3-6.2 23.1-24.4 41.4-47.4 47.5-21 5.6-73.9 10.1-145.8 12.8-36.4 1.4-75.6 2.3-114.7 2.8-13.7.2-26.4.3-37.8.3h-28.6l-37.8-.3c-39.1-.5-78.2-1.4-114.7-2.8-71.9-2.8-124.9-7.2-145.8-12.8-23-6.2-41.2-24.4-47.4-47.5-4.7-17.7-8.5-44.1-11.2-76.3-2.1-24.7-3.4-51.3-4.2-77.9-.3-9.3-.4-18-.5-25.7 0-2.7-.1-5.1-.1-7.1v-4.8c0-2.1 0-4.4.1-7.1.1-7.8.3-16.4.5-25.7.7-26.6 2.1-53.2 4.2-77.9 2.7-32.2 6.5-58.6 11.2-76.3 6.2-23.1 24.4-41.4 47.4-47.5 21-5.6 73.9-10.1 145.8-12.8 36.4-1.4 75.6-2.3 114.7-2.8 13.7-.2 26.4-.3 37.8-.3h28.6l37.8.3c39.1.5 78.2 1.4 114.7 2.8 71.9 2.8 124.9 7.2 145.8 12.8 23 6.2 41.2 24.4 47.4 47.5 4.7 17.7 8.5 44.1 11.2 76.3 2.1 24.7 3.4 51.3 4.2 77.9.3 9.3.4 18 .5 25.7 0 2.7.1 5.1.1 7.1v4.8zM423 646l232-135-232-133z"></path>
                          </svg>
                        </i>
                      </a>
                    </div>
                  </div>
                </div>

                {/*breakline*/}
                <div
                  className="ant-divider ant-divider-horizontal ant-divider-with-text-left"
                  style={{ marginTop: "20px" }}
                >
                  <span className="ant-divider-inner-text">Info</span>
                </div>

                {/*4 interests*/}
                <div style={{ marginBottom: "24px" }}>
                  <p className="md-block-unstyled">
                    <strong className="md-inline-bold">❤ Loves </strong>
                    -&gt; myself
                  </p>
                  <p className="md-block-unstyled">
                    <br></br>
                  </p>
                  <p className="md-block-unstyled">
                    <strong class="md-inline-bold">🔰 Lives in</strong>
                    -&gt; Hyderabad
                  </p>
                  <p className="md-block-unstyled">
                    <br></br>
                  </p>
                  <p className="md-block-unstyled">
                    <strong className="md-inline-bold">🏙 Owner of</strong>
                    -&gt; my mind
                  </p>
                  <p className="md-block-unstyled">
                    <br></br>
                  </p>
                  <p className="md-block-unstyled">
                    <strong className="md-inline-bold">💬 Speaks </strong>
                    -&gt; telugu,hindi,english
                  </p>
                </div>

                {/* line breaker*/}
                <div class="ant-divider ant-divider-horizontal"></div>
              </div>
            </div>

            <br></br>

            {/*portfolio*/}
            <div style={{ maxWidth: "1200px", margin: "auto" }}>
              <br></br>

              <div style={{ overflowX: "auto", padding: "24px" }}>
                <div className="ant-row">
                  <div className="ant-col ant-col-20">
                    <h2 style={{ fontSize: "1.8em" }}>Portfolio</h2>
                  </div>
                  {/*add button*/}
                  <div align="right" className="ant-col ant-col-4">
                    <button type="button" className="ant-btn ant-btn-icon-only">
                      <i
                        aria-label="icon: plus"
                        className="anticon anticon-plus"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          class=""
                          data-icon="plus"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                          <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                        </svg>
                      </i>
                    </button>
                  </div>
                </div>

                <br></br>

                {/*list of portfolios*/}
                <div
                  className="ant-row"
                  style={{ marginLeft: "-12px", marginRight: "-12px" }}
                >
                  {/*1st portfolio*/}
                  <div
                    className="ant-col ant-col-xs-24 ant-col-md-8 ant-col-lg-6"
                    style={{ paddingLeft: "12px", paddingRight: "12px" }}
                  >
                    <div
                      className="ant-card ant-card-bordered"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="ant-card-cover">
                        <div>
                          <div
                            align="center"
                            style={{
                              position: "relative",
                              cursor: "pointer",
                              width: "100%",
                              height: "200px",
                              overflowX: "hidden",
                              borderRadius: "10px 10px 0px 0px",
                            }}
                          >
                            <img alt="" height="100%" src="#"></img>
                          </div>
                        </div>
                      </div>
                      <div className="ant-card-body">
                        <span
                          className="ant-typography gallery-card-one-line-limiter"
                          style={{ fontSize: "15px", height: "21px" }}
                        >
                          <strong></strong>
                        </span>
                        <span
                          className="ant-typography gallery-card-two-line-limiter"
                          style={{ minHeight: "42px" }}
                        ></span>
                      </div>

                      <ul className="ant-card-actions">
                        <li style={{ width: "50%" }}>
                          <span>
                            <i
                              aria-label="icon: delete"
                              tabindex="-1"
                              className="anticon anticon-delete"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                class=""
                                data-icon="delete"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                              </svg>
                            </i>
                          </span>
                        </li>
                        <li style={{ width: "50%" }}>
                          <span>
                            <i
                              aria-label="icon: edit"
                              tabindex="-1"
                              className="anticon anticon-edit"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                class=""
                                data-icon="edit"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                              </svg>
                            </i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*2nd portfolio*/}
                  <div
                    className="ant-col ant-col-xs-24 ant-col-md-8 ant-col-lg-6"
                    style={{ paddingLeft: "12px", paddingRight: "12px" }}
                  >
                    <div
                      className="ant-card ant-card-bordered"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="ant-card-cover">
                        <div>
                          <div
                            align="center"
                            style={{
                              position: "relative",
                              cursor: "pointer",
                              width: "100%",
                              height: "200px",
                              overflowX: "hidden",
                              borderRadius: "10px 10px 0px 0px",
                            }}
                          >
                            <img alt="" height="100%" src="#"></img>
                          </div>
                        </div>
                      </div>
                      <div className="ant-card-body">
                        <span
                          className="ant-typography gallery-card-one-line-limiter"
                          style={{ fontSize: "15px", height: "21px" }}
                        >
                          <strong></strong>
                        </span>
                        <span
                          className="ant-typography gallery-card-two-line-limiter"
                          style={{ minHeight: "42px" }}
                        ></span>
                      </div>
                      <ul className="ant-card-actions">
                        <li style={{ width: "50%" }}>
                          <span>
                            <i
                              aria-label="icon: delete"
                              tabindex="-1"
                              className="anticon anticon-delete"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                class=""
                                data-icon="delete"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                              </svg>
                            </i>
                          </span>
                        </li>
                        <li style={{ width: "50%" }}>
                          <span>
                            <i
                              aria-label="icon: edit"
                              tabindex="-1"
                              className="anticon anticon-edit"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                class=""
                                data-icon="edit"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                              </svg>
                            </i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*3rd portfolio*/}
                  <div
                    className="ant-col ant-col-xs-24 ant-col-md-8 ant-col-lg-6"
                    style={{ paddingLeft: "12px", paddingRight: "12px" }}
                  >
                    <div
                      className="ant-card ant-card-bordered"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="ant-card-cover">
                        <div>
                          <div
                            align="center"
                            style={{
                              position: "relative",
                              cursor: "pointer",
                              width: "100%",
                              height: "200px",
                              overflowX: "hidden",
                              borderRadius: "10px 10px 0px 0px",
                            }}
                          >
                            <img alt="" height="100%" src="#"></img>
                          </div>
                        </div>
                      </div>
                      <div className="ant-card-body">
                        <span
                          className="ant-typography gallery-card-one-line-limiter"
                          style={{ fontSize: "15px", height: "21px" }}
                        >
                          <strong></strong>
                        </span>
                        <span
                          className="ant-typography gallery-card-two-line-limiter"
                          style={{ minHeight: "42px" }}
                        ></span>
                      </div>
                      <ul className="ant-card-actions">
                        <li style={{ width: "50%" }}>
                          <span>
                            <i
                              aria-label="icon: delete"
                              tabindex="-1"
                              className="anticon anticon-delete"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                class=""
                                data-icon="delete"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                              </svg>
                            </i>
                          </span>
                        </li>
                        <li style={{ width: "50%" }}>
                          <span>
                            <i
                              aria-label="icon: edit"
                              tabindex="-1"
                              className="anticon anticon-edit"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                class=""
                                data-icon="edit"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                              </svg>
                            </i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
          </main>
        </PageLayout>
      );
    } else {
      return (
        <PageLayout>
          {renderMetaData(t)}
          <h2>{t("profile.errorMsg")}</h2>
        </PageLayout>
      );
    }
  }
}

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func,
  match: PropTypes.object,
  navigation: PropTypes.object,
};
export default translate("user")(ProfileView);
