import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col, Icon, Card, Rate, Menu, Button } from 'antd';
import { PropTypes } from 'prop-types';
import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';

// import ImagesSlickComponent from './ImagesSlickComponent';

const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 8px;
  z-index: 1;
`;

const ReviewsItemComponent = props => {
  const { review, showPhotos, onSubmit, handleHelpful, history } = props;
  const [disabled, setDisabled] = React.useState(false);

  const foundHelpful = () => {
    handleHelpful(review.id, review.helpful + 1);
    setDisabled(true);
  };

  return (
    <Row>
      <Avatar
        alt=""
        src={review.user.profile.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
      />
      <Card
        style={{
          margin: '28px 0px 0px 16px',
          borderWidth: '0px',
          borderRadius: '8px'
        }}
      >
        <Col span={10}>
          <h3>
            <strong>{review.user.profile.fullName}</strong>
          </h3>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Rate disabled defaultValue={review.rating} style={{ fontSize: '20px' }} />
          </Row>
        </Col>
        <Col span={2}>
          <Row type="flex" justify="end">
            <DropDown type="more">
              <Menu.Item key="0">
                <Button style={{ color: 'black' }} type="link" href={`/edit/review/${review.id}`}>
                  {'Edit'}
                </Button>
              </Menu.Item>
              <Menu.Item key="1">
                <Button style={{ color: 'black' }} type="link" disabled onClick={() => onSubmit(review.id, 'DELETE')}>
                  Delete
                </Button>
              </Menu.Item>
            </DropDown>
          </Row>
        </Col>
        <Col span={24}>
          <div style={{ padding: '10px' }}>
            <p>{review.feedback}</p>
          </div>
        </Col>
        {showPhotos && <Col span={24}>{/* <ImagesSlickComponent images={review.reviewImages} /> */}</Col>}
        <Col span={12}>
          <>{moment(`${review.createdAt}`).format('LL')}</>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end" align="middle">
            <Button type="link" disabled={disabled} onClick={foundHelpful} style={{ color: 'black' }}>
              <strong>
                Found helpful &nbsp;
                <Icon type="like" theme="filled" />
                &nbsp;
                {`(${review.helpful})`}
              </strong>
            </Button>
          </Row>
        </Col>
      </Card>
    </Row>
  );
};

ReviewsItemComponent.propTypes = {
  review: PropTypes.object,
  showPhotos: PropTypes.bool
};

export default ReviewsItemComponent;
