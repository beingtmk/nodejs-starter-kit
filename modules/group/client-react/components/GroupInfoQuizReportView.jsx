import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Spin as Loader, Tabs, Typography, Icon } from "antd";
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupQuizReport from "@gqlapp/quiz-client-react/containers/GroupQuizReport.web";
import GroupQuizzes from "../containers/GroupQuizzes";
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

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
        {groupLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <Title className="group-members-tabs-heading" level={4}>
                      <Icon type="question" />
                      Quizzes
                    </Title>
                  </span>
                }
                key="1"
              >
                {this.state.flag && !groupLoading && (
                  <GroupQuizzes groupId={group && group.id} group={group} />
                )}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Title className="group-members-tabs-heading" level={4}>
                      <Icon type="area-chart" />
                      Reports
                    </Title>
                  </span>
                }
                key="2"
              >
                {this.state.flag && !groupLoading && (
                  <GroupQuizReport groupId={group && group.id} group={group} />
                )}
              </TabPane>
            </Tabs>
          </>
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
