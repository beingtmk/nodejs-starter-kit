import React from 'react';
import { PropTypes } from 'prop-types';
import { Rate, Icon, Button, Row, Col, Card, Avatar, Divider, Popconfirm, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Meta } = Card;

const Name = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;

  color: #6c6b6b;
`;

const Number = styled.div`
  /* Number */

  position: absolute;
  left: 20px;
  top: 8px;

  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 8px;
  /* or 80% */

  /* Gray */

  color: #9b9b9b;
`;

const Details = styled.p`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  margin-top: 5px;
  /* Gray */

  color: #9b9b9b;
`;

const UserDisplayDetailComponent = props => {
  const { user } = props;
  return (
    <Link className="listing-link" to="/baker">
      <Card
        // title={<h3>{user.title}</h3>}
        style={{
          marginBottom: '24px',
          height: '100px',
          borderWidth: '0px'
        }}
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
        // extra={
        //     <Row>
        //       <Col span={12}>
        //         <BorderListzero block onClick={() => history.push(`/edit/listing/${user.id}`)}>
        //           <Icon type="edit" />
        //         </BorderListzero>
        //       </Col>
        //       {this.props.deleteProduct && (
        //         <Col span={12}>
        //           <Popconfirm
        //             title="Are you sure to delete this Listing?"
        //             onConfirm={() => this.props.deleteProduct(user.id)}
        //             onCancel={this.cancel}
        //             okText="Yes"
        //             cancelText="No"
        //           >
        //             <BorderListzero block>
        //               <Icon type="delete" />
        //             </BorderListzero>
        //           </Popconfirm>
        //         </Col>
        //       )}
        //     </Row>
        //   )
        // }
      >
        <Row justify="space-around" type="flex" align="middle">
          <Col span={6} align="center" style={{ width: '100px', overflow: 'hidden' }}>
            <img alt="" src={user.thumbnail} height="100px" width="100px" style={{ borderRadius: '50%' }} />
          </Col>
          <Col span={15}>
            <Name>{user.name}</Name>
            <Row>
              {user.menu.map(item => {
                return (
                  <Col span={24 / user.menu.length}>
                    <Details>{item} . </Details>
                  </Col>
                );
              })}
            </Row>
            <Row justify="space-around">
              <Col span={4}>
                <Rate
                  style={{
                    fontSize: '15px'
                  }}
                  count={1}
                  disabled
                  defaultValue={user.ratting}
                />
                <Number>{user.ratting}</Number>
              </Col>
              <Col span={4}>
                <Number>{user.distance}km</Number>
              </Col>
              <Col span={4}>
                <Number>Avg.Price</Number>
              </Col>
              <Col span={4} />
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default UserDisplayDetailComponent;
