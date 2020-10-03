import React from "react";
import { Spin } from "antd";
import { PropTypes } from "prop-types";

import settings from "@gqlapp/config";
import { PageLayout, LayoutCenter, MetaTags } from "@gqlapp/look-client-react";

import FaqFormComponent from "./FaqFormComponent.web";

const AddFaqView = ({ t, loading, addFaq, currentUser }) => {
  return (
    <PageLayout type="forms">
      <MetaTags title="Add FAQ" description="Add FAQ Description" />

      {loading ? (
        <Spin />
      ) : (
        <>
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <FaqFormComponent
              isAdminShow={true}
              cardTitle="Add Faq"
              t={t}
              onSubmit={addFaq}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddFaqView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addFaq: PropTypes.func,
};

export default AddFaqView;
