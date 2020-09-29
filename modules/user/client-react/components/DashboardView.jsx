import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Radio } from "antd";
import Helmet from "react-helmet";

import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import AccountLayout from "@gqlapp/look-client-react/ui-antd/components/AccountLayout";
import { OpeningConstants } from "../constants";
import settings from "../../../../settings";

const { Title, Paragraph, Text } = Typography;

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
  return (
    <AccountLayout path={match && match.path}>
      {renderMetaData()}
      <Title level={1}>
        <Texty type="left" mode="sync">
          You're a MApp insider and we are thrilled to have you here! How would
          you like to proceed?
        </Texty>
      </Title>
      <Divider />
      <Radio.Group className='dashboard-radio-group' onChange={(e)=> setChoice(e.target.value)} value={choice}>
        <Radio  className='dashboard-radio' value={OpeningConstants.TOUR}>{OpeningConstants.TOUR}</Radio>
        <Radio className='dashboard-radio' value={OpeningConstants.PLAYAROUND}>
          {OpeningConstants.PLAYAROUND}
        </Radio>
        <Radio className='dashboard-radio' value={OpeningConstants.SPECIFIC}>
          {OpeningConstants.SPECIFIC}
        </Radio>
      </Radio.Group>
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
