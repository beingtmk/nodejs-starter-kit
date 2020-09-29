import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Radio, Modal, message, Select } from "antd";
import Helmet from "react-helmet";

import AccountLayout from "@gqlapp/look-client-react/ui-antd/components/AccountLayout";
import { OpeningConstants } from "../constants";
import settings from "../../../../settings";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const renderMetaData = () => {
  return (
    <Helmet
      title={`${settings.app.name} - Dashboard`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - Dashboard}`,
        },
      ]}
    />
  );
};

const DashboardView = (props) => {
  const [choice, setChoice] = useState("");
  const { match } = props;
  console.log("DashBoardConst", OpeningConstants);

  const handleSetChoice = (e) => {
    if (e.target.value == OpeningConstants.PLAYAROUND) {
      message.info("All righty! Have fun.");
    }
    setChoice(e.target.value);
  };
  return (
    <AccountLayout path={match && match.path}>
      {renderMetaData()}
      <Title level={1}>
        You're a MApp insider and we are thrilled to have you here! How would
        you like to proceed?
      </Title>
      <Divider />
      <Radio.Group
        className="dashboard-radio-group"
        onChange={handleSetChoice}
        value={choice}
      >
        <Radio className="dashboard-radio" value={OpeningConstants.TOUR}>
          {OpeningConstants.TOUR}
        </Radio>
        <Radio className="dashboard-radio" value={OpeningConstants.PLAYAROUND}>
          {OpeningConstants.PLAYAROUND}
        </Radio>
        <Radio className="dashboard-radio" value={OpeningConstants.SPECIFIC}>
          {OpeningConstants.SPECIFIC}
        </Radio>
      </Radio.Group>

      {/*Modal*/}
      <Modal
        title="Tour"
        centered
        visible={choice === OpeningConstants.TOUR}
        onOk={() => setChoice("")}
        onCancel={() => setChoice("")}
        footer={null}
      >
        <Paragraph style={{ fontSize: "15px" }}>
          <ul>
            <li>
              This is Brainayan's proprietary model of people management. It is
              deeply rooted in the identity theory and the social identity
              theory.
            </li>
            <li>
              The Soul identity helps you explore each of your team members from
              various perspectives - their values, strengths, personality, as
              well as the other cognitive and demographic diversity they bring
              to the table.
            </li>
            <li>
              The Role and Goal identity is how people's job and the
              deliverables they work on impact their self worth. This is the
              space where personal identity starts interacting with the social
              space and gets impacted by it.
            </li>
            <li>
              The Shoal identity is how an individual interacts with their team
              and how it impacts their personal identity.
            </li>
            <li>
              The Poll identity is how you as the leader of the individual and
              the team impact the identity of your team members.
            </li>
            <li>
              The Whole identity is how the organization - the whole of which
              the individual is a part - impacts identities of individuals.
            </li>
            <li>
              We believe each people leader needs to explore identities of their
              team members from these perspectives. This will empower them to
              understand their people better and therefore, engage and motivate
              them more effectively. As an outcome, you will build a high
              performing team.
            </li>
          </ul>
        </Paragraph>
      </Modal>
      <br />
      <br />
      {/* DropDown*/}
      {OpeningConstants.SPECIFIC == choice && (
        <Select
          showSearch
          onSearch={(e) => {
            console.log(e);
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          placeholder="Choose from the following options"
          style={{ width: "100%", maxWidth: "350px" }}
          onChange={(e) => {
            console.log(e);
          }}
        >
          <Option value={"How to understand the diversity on my team"}>
            How to understand the diversity on my team
          </Option>
          <Option value={"How to understand people's strengths"}>
            How to understand people's strengths
          </Option>
          <Option value={"How to understand people's personalities"}>
            How to understand people's personalities
          </Option>
          <Option value={"How to understand people's values"}>
            How to understand people's values
          </Option>
          <Option value={"How to set goals"}>How to set goals</Option>
          <Option value={"Aligning roles and goals with strengths"}>
            Aligning roles and goals with strengths
          </Option>
          <Option value={"Creating an identity based collaboration model"}>
            Creating an identity based collaboration model
          </Option>
          <Option value={"Helping people build trust"}>
            Helping people build trust
          </Option>
          <Option value={"How to coach effectively"}>
            How to coach effectively
          </Option>
          <Option value={"How to align team goals with org expectations"}>
            How to align team goals with org expectations
          </Option>
          <Option value={"Giving feedback"}>Giving feedback</Option>
          <Option value={"Managing bias"}>Managing bias</Option>
          <Option value={"Resolving conflicts"}>Resolving conflicts</Option>
          <Option value={"SMART and sMART goals"}>SMART and sMART goals</Option>
          <Option value={"How to influence"}>How to influence</Option>
          <Option value={"Building relationships"}>
            Building relationships
          </Option>
        </Select>
      )}
    </AccountLayout>
  );
};

DashboardView.propTypes = {
  // currentUser: PropTypes.object,
  // shape({
  //   id: PropTypes.number,
  //   role: PropTypes.string,
  //   isActive: PropTypes.bool,
  //   createdAt: PropTypes.string,
  //   updatedAt: PropTypes.string,
  //   profile: PropTypes.shape({
  //     firstName: PropTypes.string,
  //     lastName: PropTypes.string
  //   })
  // })
};

export default DashboardView;
