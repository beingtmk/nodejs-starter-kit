import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { compose } from '@gqlapp/core-common';
import { PropTypes } from 'prop-types';
import { Row, Col, Icon, Card, Rate, Menu, Button } from 'antd';

import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';
import USER_ROUTES from '@gqlapp/user-client-react/routes';
import LISTING_ROUTES from '@gqlapp/listing-client-react/routes';
import { withReviewHelpfulStatus } from '../containers/ReviewOperations';
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
  @media only screen and (max-width: 768px) {
    margin: 60px 10px 10px 10px;
  }
`;

const HelpfulPosition = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 20px 40px;
`;

const ReviewModala = styled.a`
  &:hover {
    cursor: ${props => (props.showModal ? 'pointer' : 'unset')};
  }
`;

const ReviewsItemComponent = props => {
  const {
    review,
    showPhotos,
    handleHelpful,
    deleteReview,
    currentUser,
    showModal = false,
    history,
    reviewHelpfulStatus
  } = props;
  const [status, setStatus] = React.useState(reviewHelpfulStatus);

  React.useEffect(() => {
    setStatus(reviewHelpfulStatus);
  }, [reviewHelpfulStatus]);

  const foundHelpful = () => {
    console.log(status);
    if (!status) {
      handleHelpful(review.id, review.helpful + 1, review.user.id);
      // setDisabled(true);
    } else {
      handleHelpful(review.id, review.helpful - 1, review.user.id);
    }
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
      {review.user.id === (currentUser && currentUser.id) && (
        <DropDownPosition>
          <DropDown type="more">{dropDownOpts()}</DropDown>
        </DropDownPosition>
      )}
      <HelpfulPosition>
        {handleHelpful && (
          <Button type="link" onClick={foundHelpful} style={{ color: 'black' }}>
            <strong>
              {status ? (
                <>
                  Found helpful &nbsp;
                  <Icon type="like" theme="filled" />
                  &nbsp;
                </>
              ) : (
                <>
                  Found unhelpful &nbsp;
                  <Icon type="dislike" theme="filled" />
                  &nbsp;
                </>
              )}

              {`(${review.helpful})`}
            </strong>
          </Button>
        )}
      </HelpfulPosition>
      <ReviewModala
        showModal={showModal}
        onClick={() => showModal && history.push(`${LISTING_ROUTES.listingDetailLink}${review.modalReview.modalId}`)}
      >
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
      </ReviewModala>
    </Row>
  );
};

ReviewsItemComponent.propTypes = {
  review: PropTypes.object,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  showPhotos: PropTypes.bool,
  showModal: PropTypes.bool,
  reviewHelpfulStatus: PropTypes.bool,
  handleHelpful: PropTypes.func,
  deleteReview: PropTypes.func
};

export default compose(withReviewHelpfulStatus)(ReviewsItemComponent);
