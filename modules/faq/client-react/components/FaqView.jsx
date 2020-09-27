import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Card, Typography, Icon } from "antd";
import { translate } from "@gqlapp/i18n-client-react";
import {
  PageLayout,
  Button,
  Loader,
  CatalogueWithInfiniteScroll,
} from "@gqlapp/look-client-react";
import settings from "../../../../settings";
import RenderFaqComponent from './RenderFaqComponent';
const { Text } = Typography;

const NoFaqsMessage = ({ t }) => (
  <div className="text-center">No Faqs</div>
);

const FaqView = (props) => {
  const { t, loading, faqs } = props;
  return (
    <PageLayout>
      {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - ${"Faq"}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${"Faq"}`,
          },
        ]}
      />
      <h2>{"Faqs"}</h2>
      <br />
      <div style={{ overflowX: "auto" }}>
        {loading && !faqs && (
          <div style={{ marginTop: "20px" }} align="center">
            <Loader text="Faqs Loading" />
          </div>
        )}

        {!loading && faqs && (
          <>
            {faqs.edges && faqs.edges.length !== 0 ? (
              <CatalogueWithInfiniteScroll
                grid={{
                  gutter: 24,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                component={RenderFaqComponent}
                endMessage={"End Of Faqs"}
                loadData={props.loadDataFaqs}
                list={props.faqs}
                loading={props.loading}
                hasMore={props.faqs.pageInfo.hasNextPage}
                endCursor={props.faqs.pageInfo.endCursor}
                totalCount={props.faqs.totalCount}
              />
            ) : (
              <NoFaqsMessage t={t} />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

FaqView.propTypes = {
  t: PropTypes.func,
};

export default translate("faqs")(FaqView);
