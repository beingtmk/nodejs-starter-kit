import React from "react";
import PropTypes from "prop-types";

// import { CardGroup } from '@gqlapp/look-client-react';
import { Avatar, Icon, Row, Col, Divider, Card } from "antd";
import { ImgUser } from "../../constants/DefaultImages";
import ProfileOrganisationDisplay from "@gqlapp/group-client-react/containers/ProfileOrganisationDisplay";
const { Meta } = Card;

const ProfileHeadComponent = ({ profile, description, userId }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Meta
        title={
          <h2>
            <Icon type="robot" />{" "}
            {profile && profile.firstName && profile.lastName
              ? profile.firstName + " " + profile.lastName
              : "Not Provided"}
          </h2>
        }
        description={
          <h3>
            (
            {profile && profile.designation
              ? profile.designation
              : "Not Provided"}
            )
          </h3>
        }
        avatar={
          <Avatar
            size={100}
            src={profile && profile.avatar ? profile.avatar : ImgUser}
          />
        }
      />
      <Divider />
      <h4 style={{fontSize:'20px', marginBottom:"15px"}}>Organisations:</h4>
      <ProfileOrganisationDisplay userId={userId} />
    </div>
  );
};

ProfileHeadComponent.propTypes = {
  profile: PropTypes.object,
  description: PropTypes.object,
};

export default ProfileHeadComponent;
