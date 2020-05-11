import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Link } from 'react-router-dom';
import { Button, Col, Card, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import MiniBlogImageComponent from './MiniBlogImageComponent';
import BlogActionsComponent from './BlogActionsComponent';
import { Name } from '../constants';

const { Meta } = Card;

const MiniBlogsCardComponent = ({ blog }) => {
  const blogData = () => {
    return (
      <>
        <Tooltip className="blog-card-tooltip" placement="bottomLeft" title={blog.title}>
          <h1 className="blog-mini-card-title two-line-limiter">{blog.title}</h1>
        </Tooltip>
        <Tooltip placement="bottomLeft" title={blog && blog.description}>
          <h2 className="blog-mini-card-description two-line-limiter">{blog && blog.description}</h2>
        </Tooltip>
        <Meta
          avatar={<Avatar src={blog.author.image} />}
          title={
            <span>
              {Name(blog.author.profile)}
              <i>({blog.author.username}) </i>
            </span>
          }
          description={<span>{`${moment(blog.createdAt).format('MMM DD, YYYY')}`}</span>}
        />
        <Divider />
        <BlogActionsComponent blog={blog} />
        <br />
        <Col xs={24} lg={24} sm={22} md={22}>
          <Link to={`/blog/${blog.id}`}>
            <Button block type="primary" ghost>
              Read
            </Button>
          </Link>
        </Col>
      </>
    );
  };
  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={<MiniBlogImageComponent catagory={[blog.model.name]} title={blog.title} image={blog.image} />}
        className="catalogue-card"
        bodyStyle={{ padding: '15px' }}
        hoverable
      >
        {blogData()}
      </Card>
    </div>
  );
};

MiniBlogsCardComponent.propTypes = {
  blog: PropTypes.object,
  t: PropTypes.func
};

export default translate('blog')(MiniBlogsCardComponent);
