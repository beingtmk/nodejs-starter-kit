import React, { Component } from 'react';
import Grid from 'hedron';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import FaqFormComponent from './FaqFormComponent.web';

class EditFaqView extends Component {
  state = { flag: true };
  renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${'Edit Faq'}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );

  componentDidMount() {
    this.setState({ flag: false });
  }
  render() {
    const { t, faq, editFaq, loading, faqLoading, currentUser, deleteAdmin, refetch } = this.props;
    return (
      <>
        <PageLayout>
          <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
            <Grid.Bounds direction="vertical">
              {this.renderMetaData(t)}
              {!this.state.flag && !loading && !faqLoading ? (
                <>
                  <Grid.Box sm={{ hidden: 'true' }}>
                    <LayoutCenter>
                      <FaqFormComponent
                        cardTitle="Edit Faq"
                        t={t}
                        faq={faq}
                        isAdminShow={true}
                        onSubmit={editFaq}
                        currentUser={currentUser}
                        refetch={refetch}
                      />
                    </LayoutCenter>
                  </Grid.Box>
                  <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
                    <FaqFormComponent
                      cardTitle="Edit Faq"
                      t={t}
                      isAdminShow={true}
                      faq={faq}
                      onSubmit={editFaq}
                      currentUser={currentUser}
                    />
                  </Grid.Box>
                </>
              ) : (
                <Spin />
              )}
            </Grid.Bounds>
          </Grid.Provider>
        </PageLayout>
      </>
    );
  }
}

EditFaqView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  faq: PropTypes.object,
  currentUser: PropTypes.object,
  deleteAdmin: PropTypes.func,
  editFaq: PropTypes.func
};

export default EditFaqView;
