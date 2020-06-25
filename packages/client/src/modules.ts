import group from '@gqlapp/group-client-react';
import tag from '@gqlapp/tag-client-react';
import geolocation from '@gqlapp/geolocation-client-react';
import bookmark from '@gqlapp/bookmark-client-react';
import like from '@gqlapp/like-client-react';
import comment from '@gqlapp/comment-client-react';
import blog from '@gqlapp/blog-client-react';
import pwa from '@gqlapp/pwa-client-react';
import home from '@gqlapp/home-client-react';
import core from '@gqlapp/core-client-react';
import look from '@gqlapp/look-client-react';
import i18n from '@gqlapp/i18n-client-react';
import counter from '@gqlapp/counter-client-react';
import chat from '@gqlapp/chat-client-react';
import contact from '@gqlapp/contact-client-react';
import validation from '@gqlapp/validation-common-react';
import ClientModule from '@gqlapp/module-client-react';
import defaultRouter from '@gqlapp/router-client-react';
import payments from '@gqlapp/payments-client-react';
import authentication from '@gqlapp/authentication-client-react';
import '@gqlapp/favicon-common';

const post = require('@gqlapp/post-client-react').default;
const pageNotFound = require('@gqlapp/page-not-found-client-react').default;
const reports = require('@gqlapp/reports-client-react').default;
const upload = require('@gqlapp/upload-client-react').default;
const pagination = require('@gqlapp/pagination-client-react').default;
const user = require('@gqlapp/user-client-react').default;

const modules = new ClientModule(
  group,
  tag,
  geolocation,
  bookmark,
  like,
  comment,
  blog,
  pwa,
  home,
  look,
  validation,
  defaultRouter,
  counter,
  post,
  upload,
  contact,
  pagination,
  chat,
  payments,
  user,
  i18n,
  reports,
  pageNotFound,
  core,
  authentication
);

export default modules;
