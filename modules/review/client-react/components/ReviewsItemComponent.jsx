import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { compose } from '@gqlapp/core-common';
import { PropTypes } from 'prop-types';
import { Icon, Row, Col, Card, Rate, Button, DropDown, MenuItem } from '@gqlapp/look-client-react';
import { USER_ROUTES } from '@gqlapp/user-client-react';
import { LISTING_ROUTES, displayDataCheck } from '@gqlapp/listing-client-react';

import { withReviewHelpfulStatus } from '../containers/ReviewOperations';
import ImagesSlickComponent from './ImagesSlickComponent';
import ROUTES from '../routes';
import { displayDateCheck } from './functions';

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
    margin: 60px 40px 10px 10px;
  }
`;

const HelpfulPosition = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 20px 40px;
  @media screen and (max-width: 767px) {
    margin: 20px;
  }
`;

const ReviewModala = styled.a`
  &:hover {
    cursor: ${props => (props.showModal ? 'pointer' : 'unset')};
  }
`;

const ReviewsItemComponent = props => {
  const {
    t,
    review,
    showPhotos,
    handleHelpful,
    deleteReview,
    currentUser,
    showModal = false,
    history,
    reviewHelpfulStatus
  } = props;
  const [status, setStatus] = React.useState(reviewHelpfulStatus && reviewHelpfulStatus);

  React.useEffect(() => {
    setStatus(reviewHelpfulStatus);
  }, [reviewHelpfulStatus]);

  const foundHelpful = () => {
    handleHelpful(review.id, currentUser.id);
  };

  function dropDownOpts() {
    return (
      <>
        <MenuItem key="0">
          <Button style={{ color: 'black' }} color="link" href={`${ROUTES.editLink}/${review.id}`}>
            {t('reviewItem.btn.edit')}
          </Button>
        </MenuItem>
        <MenuItem key="1">
          <Button style={{ color: 'black' }} color="link" onClick={() => deleteReview(review.id)}>
            {t('reviewItem.btn.delete')}
          </Button>
        </MenuItem>
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
          <DropDown type="MoreOutlined">{dropDownOpts()}</DropDown>
        </DropDownPosition>
      )}
      <HelpfulPosition>
        {handleHelpful && (
          <Button color="link" onClick={foundHelpful} style={{ color: 'black' }}>
            <strong>
              {!status ? (
                <>
                  {t('reviewItem.helpful')}
                  <Icon type="LikeFilled" />
                  &nbsp;
                </>
              ) : (
                <>
                  {t('reviewItem.unhelpful')}
                  <Icon type="DislikeFilled" />
                  &nbsp;
                </>
              )}

              {`(${displayDataCheck(review.helpful)})`}
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
          <Row>
            <Col lg={10} md={10} xs={24}>
              <h3>
                <strong>{review.user.profile && displayDataCheck(review.user.profile.fullName)}</strong>
              </h3>
            </Col>
            <Col lg={12} md={12} xs={16}>
              <Row type="flex" justify="end">
                <Rate disabled defaultValue={review.rating} style={{ fontSize: '20px' }} />
              </Row>
            </Col>
            <Col lg={2} md={2} xs={4}>
              <Row type="flex" justify="end"></Row>
            </Col>
            <Col lg={24} md={24} xs={24}>
              <div style={{ padding: '10px' }}>
                <p>{displayDataCheck(review.feedback)}</p>
              </div>
            </Col>
            {showPhotos && (
              <Col lg={24} md={24} xs={24}>
                <ImagesSlickComponent images={review.reviewMedia} />
              </Col>
            )}
            <Col lg={12} md={12} xs={24}>
              <>{displayDateCheck(review.createdAt)}</>
            </Col>
            <Col lg={0} md={0} xs={24}>
              <br />
            </Col>
          </Row>
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
  deleteReview: PropTypes.func,
  t: PropTypes.func
};

export default compose(withReviewHelpfulStatus)(ReviewsItemComponent);
