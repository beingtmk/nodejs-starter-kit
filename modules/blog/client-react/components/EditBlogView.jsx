import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import BlogFormCmponent from './BlogFormCmponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class EditBlogView extends React.Component {
  state = { flag: false };
  componentDidMount() {
    this.setState({ flag: true });
  }
  render() {
    return (
      <PageLayout>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.loading ? (
          <BlogFormCmponent {...this.props} cardTitle={'Edit Blog'} />
        ) : (
          <Loading />
        )}
      </PageLayout>
    );
  }
}
EditBlogView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func
};

export default EditBlogView;
