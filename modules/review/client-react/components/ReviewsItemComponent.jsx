import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Row, Col, Icon, Card, Rate, Menu, Button } from 'antd';

import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';
import USER_ROUTES from '@gqlapp/user-client-react/routes';

import ImagesSlickComponent from './ImagesSlickComponent';
import ROUTES from '../routes';

const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 8px;
  z-index: 1;
`;

const DropDownPosition = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  margin: 60px;
`;

const HelpfulPosition = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 20px 40px;
`;

const ReviewsItemComponent = props => {
  const { review, showPhotos, handleHelpful, deleteReview } = props;
  const [disabled, setDisabled] = React.useState(false);

  const foundHelpful = () => {
    handleHelpful(review.id, review.helpful + 1);
    setDisabled(true);
  };

  function dropDownOpts() {
    return (
      <>
        <Menu.Item key="0">
          <Button style={{ color: 'black' }} type="link" href={`${ROUTES.editLink}/${review.id}`}>
            {'Edit'}
          </Button>
        </Menu.Item>
        <Menu.Item key="1">
          <Button style={{ color: 'black' }} type="link" onClick={() => deleteReview(review.id)}>
            Delete
          </Button>
        </Menu.Item>
      </>
    );
  }

  return (
    <Row>
      <Link to={`${USER_ROUTES.userPublicProfileLink}${review.user.id}`}>
        <Avatar
          alt=""
          src={
            (review.user.profile && review.user.profile.avatar) ||
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          }
        />
      </Link>
      <DropDownPosition>
        <DropDown type="more">{dropDownOpts()}</DropDown>
      </DropDownPosition>
      <HelpfulPosition>
        {handleHelpful && (
          <Button type="link" disabled={disabled} onClick={foundHelpful} style={{ color: 'black' }}>
            <strong>
              Found helpful &nbsp;
              <Icon type="like" theme="filled" />
              &nbsp;
              {`(${review.helpful})`}
            </strong>
          </Button>
        )}
      </HelpfulPosition>
      {/* <Link to={`/todo`}> */}
      <Card
        style={{
          margin: '28px 0px 0px 16px',
          borderWidth: '0px',
          borderRadius: '8px'
        }}
      >
        <Col span={10}>
          <h3>
            <strong>{review.user.profile && review.user.profile.fullName}</strong>
          </h3>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Rate disabled defaultValue={review.rating} style={{ fontSize: '20px' }} />
          </Row>
        </Col>
        <Col span={2}>
          <Row type="flex" justify="end"></Row>
        </Col>
        <Col span={24}>
          <div style={{ padding: '10px' }}>
            <p>{review.feedback}</p>
          </div>
        </Col>
        {showPhotos && (
          <Col span={24}>
            <ImagesSlickComponent images={review.reviewMedia} />
          </Col>
        )}
        <Col span={12}>
          <>{new Date(Number(review.createdAt)).toLocaleDateString('en-IN')}</>
        </Col>
        <Col span={12}></Col>
      </Card>
      {/* </Link> */}
    </Row>
  );
};

ReviewsItemComponent.propTypes = {
  review: PropTypes.object,
  showPhotos: PropTypes.bool,
  handleHelpful: PropTypes.func,
  deleteReview: PropTypes.func
};

export default ReviewsItemComponent;
