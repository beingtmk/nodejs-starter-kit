import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Spin as Loader } from "antd";
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupQuizReport from "@gqlapp/quiz-client-react/containers/GroupQuizReport.web";

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

class GroupInfoQuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false };
  }

  componentDidMount() {
    this.setState({ flag: true });
  }

  render() {
    const { group, groupLoading, match, navigation } = this.props;
    let id = 0;
    if (match) {
      id = match.params.id;
    } else if (navigation) {
      id = navigation.state.params.id;
    }
    return (
      <GroupLayout id={id} path={match && match.path}>
        {groupLoading && (
          <div>
            <Loader />
          </div>
        )}
        {this.state.flag && !groupLoading && (
          <GroupQuizReport groupId={group && group.id} group={group} />
        )}
      </GroupLayout>
    );
  }
}

GroupInfoQuizView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func,
};

export default GroupInfoQuizView;
