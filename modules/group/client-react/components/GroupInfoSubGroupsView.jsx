import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import {
  Menu,
  Icon,
  Spin as Loader,
  Row,
  Col,
  Empty,
  Typography,
  PageHeader,
  Divider,
  Button,
} from "antd";
import { MenuItem } from "@gqlapp/look-client-react";
import GroupLayout from "@gqlapp/look-client-react/ui-antd/components/GroupLayout";
import settings from "@gqlapp/config";
import GroupInfoQuizReport from "../containers/GroupInfoQuizReport";
import GroupComponent from "./GroupComponent";
import GroupInfoMembers from "../containers/GroupInfoMembers";
import { GroupCatalogueComponent } from "./MyGroupsComponent";
import AddGroupModal from "../containers/AddGroupModal";

const { Title, Text, Paragraph } = Typography;

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("SubGroups")}`}
    meta={[
      {
        name: "description",
        content: `${settings.app.name} - ${t("SubGroups")}`,
      },
    ]}
  />
);

class GroupInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false, current: "info" };
  }

  componentDidMount() {
    this.setState({ flag: true });
  }

  fetchMoreData = async () => {
    let hasMore = this.props.groups.pageInfo.hasNextPage;
    const endCursor = this.props.groups.pageInfo.endCursor;
    if (!hasMore) return;
    await this.props.loadData(endCursor + 1, "add");
  };

  render() {
    const { groups, match, navigation } = this.props;
    let id = 0;
    if (match) {
      id = match.params.id;
    } else if (navigation) {
      id = navigation.state.params.id;
    }
    const hasMore = groups && groups.pageInfo && groups.pageInfo.hasNextPage;
    console.log("GroupInfoSubGroupsView", this.props);
    return (
      <GroupLayout id={id} path={match && match.path}>
        {renderMetaData(this.props.t)}
        <PageHeader
          ghost={false}
          backIcon={<Icon type="apartment" />}
          title={<Title>Sub Groups</Title>}
          extra={[<AddGroupModal groupId={id} />]}
        />

        <Divider style={{ marginTop: "0" }} />
        {this.state.flag && this.props.groupLoading ? (
          <div align="center">
            <Loader />
          </div>
        ) : groups && groups.edges && groups.edges.length !== 0 ? (
          <>
            <Row gutter={24}>
              {groups.edges.map((edge, key) => (
                <Col xs={24} md={12} lg={8}>
                  <GroupCatalogueComponent item={edge.node} key={key} />
                </Col>
              ))}
            </Row>
            {hasMore && (
              <div align="center">
                <Button onClick={this.fetchMoreData}>Load More</Button>
              </div>
            )}
          </>
        ) : (
          <Empty />
        )}
      </GroupLayout>
    );
  }
}

GroupInfoView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func,
};

export default GroupInfoView;
