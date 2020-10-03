import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { PageLayout, Loading, MetaTags } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
// import { message } from 'antd';
import BlogListComponent from "./BlogListComponent";
import BlogsFilterComponent from "./BlogsFilterComponent";

class BlogListView extends React.Component {
  state = { flag: false };
  componentDidMount() {
    this.setState({ flag: true });
  }
  render() {
    console.log("BlogListView", this.props);
    return (
      <PageLayout>
        <MetaTags title="All Blogs" description="Read Blogs" />
        {this.props.models && this.props.filter && (
          <>
            <hr />
            <BlogsFilterComponent {...this.props} />
            <hr />
          </>
        )}
        {this.state.flag && !this.props.blogLoading ? (
          <BlogListComponent {...this.props} />
        ) : (
          <Loading />
        )}
      </PageLayout>
    );
  }
}

BlogListView.propTypes = {
  t: PropTypes.func,
  blogLoading: PropTypes.bool,
  filter: PropTypes.object,
  models: PropTypes.array,
};

export default BlogListView;
