import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
// import { Menu, Icon } from "antd";
// import { Loading, MenuItem } from "@gqlapp/look-client-react";
// import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupQuizReport from '@gqlapp/quiz-client-react/containers/GroupQuizReport.web';


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
    const {group} = this.props;
    console.log('groupInfoQUizView', this.props)
    return (
      <>
      {this.state.flag && (<GroupQuizReport groupId={group && group.id}  group={group}/>)}
      </>
    );
  }
}

GroupInfoQuizView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func,
};

export default GroupInfoQuizView;
