import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import TweenOne from 'rc-tween-one';
import { Link } from 'react-router-dom';

import {
  // CardText, Button,
  Icon
} from '@gqlapp/look-client-react';

const { Meta } = Card;

const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

// const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
// const ease0 = TweenOne.easing.path(p0);
class ProfileCatalogueCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      item
      // paused
    } = this.props;
    const ViewProfileAction = () => {
      return (
        <h4 style={{ textAlign: 'right', color: 'white' }} href={`public-profile/${item.id}`}>
          View Profile <Icon type="arrow-right" />
        </h4>
      );
    };
    return (
      <Link to={`/public-profile/${item.user ? item.user.id : item.id}`}>
        <Card
          style={this.props.componentStyle}
          align="left"
          cover={<img alt="" src={item.avatar || AVATAR} height="100%" />}
          className="catalogue-card profile-catalogue profile-catalogue-card"
          bodyStyle={{ padding: '0px 0px' }}
        >
          <Meta title={<h1>{`${item.profile.firstName} ${item.profile.lastName}`}</h1>} />
        </Card>
      </Link>
    );
  }
}

ProfileCatalogueCard.propTypes = {
  address: PropTypes.object,
  item: PropTypes.object,
  subTitle: PropTypes.string,
  index: PropTypes.number
};

export default ProfileCatalogueCard;
