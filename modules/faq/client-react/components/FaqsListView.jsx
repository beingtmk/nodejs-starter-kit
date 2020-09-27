import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout, Button } from "@gqlapp/look-client-react";
import Loader from "@gqlapp/look-client-react/ui-antd/components/Loader";

// import FaqFilterComponent from './FaqFilterComponent';
import FaqListComponent from "./FaqListComponent";

import settings from "../../../../settings";

const FaqsListView = (props) => {
  const { t, loading, faqs } = props;
  return (
    <PageLayout>
      {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - ${"Faq Admin List"}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${"Faq Admin List"}`,
          },
        ]}
      />
      <h2>{"Faqs"}</h2>
      <Link to="/add-faq">
        <Button color="primary">{"Add Faq"}</Button>
      </Link>
      <hr />

      {/* <FaqFilterComponent {...props} /> */}

      <FaqListComponent {...props} />
    </PageLayout>
  );
};

FaqsListView.propTypes = {
  t: PropTypes.func,
};

export default translate("faqs")(FaqsListView);
