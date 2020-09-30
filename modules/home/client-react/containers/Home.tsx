import React from "react";
import { graphql } from "react-apollo";

import { compose } from "@gqlapp/core-common";

import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import HomeView from "../components/HomeView";
import CURRENT_USER_QUERY from "@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql";

interface HomeProps {
  t: TranslateFunction;
}

class Home extends React.Component<HomeProps> {
  public render() {
    console.log('HomeViewCurrentUser', this.props);
    return <HomeView {...this.props} />;
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    },
  }),
  translate("home")
)(Home);
