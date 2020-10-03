import React, { Component } from "react";
import { Spin } from "antd";
import Helmet from "react-helmet";
import { PropTypes } from "prop-types";

import { PageLayout, LayoutCenter, MetaTags } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

import FaqFormComponent from "./FaqFormComponent.web";

class EditFaqView extends Component {
  state = { flag: true };

  componentDidMount() {
    this.setState({ flag: false });
  }
  render() {
    const {
      t,
      faq,
      editFaq,
      loading,
      faqLoading,
      currentUser,
      deleteAdmin,
      refetch,
    } = this.props;
    return (
      <>
        <PageLayout type="forms">
          <MetaTags title="Edit FAQ" description="Edit FAQ Description" />{" "}
          {!this.state.flag && !loading && !faqLoading ? (
            <>
              <div style={{ maxWidth: "600px", width: "100%" }}>
                <FaqFormComponent
                  cardTitle="Edit Faq"
                  t={t}
                  faq={faq}
                  isAdminShow={true}
                  onSubmit={editFaq}
                  currentUser={currentUser}
                  refetch={refetch}
                />
              </div>
            </>
          ) : (
            <Spin />
          )}
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
  editFaq: PropTypes.func,
};

export default EditFaqView;
