import React, { Component } from 'react';
import { Row, Col, Card, message } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@gqlapp/look-client-react';

import styled from 'styled-components';
import { PropTypes } from 'prop-types';

// import AddToCartForm from './AddToCartForm';

const Position1 = styled.h4`
  position: absolute;
  bottom: ${props => props.bottom && `${parseInt(props.bottom)}px`};
  @media only screen and (max-width: 768px) {
    bottom: ${props => props.bottom && `${parseInt(props.bottom) - 35}px`};
  }
`;
const Position = styled.h4`
  position: absolute;
  bottom: ${props => props.bottom && `${parseInt(props.bottom)}px`};
  @media only screen and (max-width: 768px) {
    bottom: ${props => props.bottom && `${parseInt(props.bottom) - 15}px`};
  }
`;

const Ribbon = styled.div`
  width: ${props => (props.width ? props.width : '150px')};
  bottom: ${props => props.bottom && props.bottom};
  background: ${props => (props.color ? props.color : 'rgb(123, 159, 199)')};

  position: absolute;
  right: 0;
  z-index: 1;
  padding: 0.15em 0.5em;
  font-size: 1.3em;
  margin: 0 0 0 -0.625em;
  line-height: 1.875em;
  text-align: center;
  color: #e6e2c8;
  border-radius: 0 0.156em 0.156em 0;
  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.5);
`;
const Align = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  padding-right: 10px;
  margin: 15px 20px;
`;

class CartItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEditModal: false,
      visibleDetailsModal: false,
      myBooks: [],
      modal1Visible: false
    };
  }

  setModal1Visible = () => {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  };

  cancel = () => {
    message.error('Click on No');
  };

  // disabledDate(current) {
  //   if (
  //     (current && current.valueOf() < Date.now()) ||
  //     this.state.myBooks.some(row => row === moment(current._d).format('YYYY-MM-DD'))
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { item, edit, onDelete } = this.props;
    console.log('cart item', this.props);
    var coverGrid = {
      xs: { span: 24 },
      md: { span: 9 },
      xxl: { span: 6 }
    };

    var infoGrid = {
      xs: { span: 24 },
      md: { span: 15 },
      xxl: { span: 18 }
    };

    if (this.props.mobile) {
      coverGrid = null;
      infoGrid = null;
      coverGrid = { span: 24 };
      infoGrid = { span: 24 };
    }

    return (
      <Col span={24} style={{ paddingRight: '10px' }}>
        <Align>
          <Row type="flex" justify="space-around" align="middle" gutter={12}>
            {edit && (
              <Col span={8}>
                <EditIcon
                  color="default"
                  onClick={
                    /* () => this.setState({ visibleEditModal: true }) */
                    () => console.log('edit in cartitemcompoent')
                  }
                  size="lg"
                />

                {/* <AddToCartForm
                  // onSubmit={onEditItem}
                  showForm={item.isOrderOptions}
                  details={item}
                  visible={this.state.visibleEditModal}
                  handleVisible={() => this.setState({ visibleEditModal: false })}
                /> */}
              </Col>
            )}

            <Col span={8}>
              {onDelete && (
                <DeleteIcon
                  title="Are you sure to delete this order?"
                  onClick={() => this.props.onDelete(item.id)}
                  size="lg"
                />
              )}
            </Col>
          </Row>
        </Align>
        <Link to={`/listing-detail/${item.listingId}`}>
          <Ribbon bottom={this.props.mobile ? '70px' : '105px'} width="120px" color="#df0303">
            {item.quantity}
          </Ribbon>
          <Ribbon bottom={this.props.mobile ? '15px' : '30px'}>&#8377; {` ${item.cost * item.quantity}`}</Ribbon>
          <Card
            // type={this.props.inner && 'inner'}
            // style={
            //   (this.props.componentStyle && this.props.componentStyle) || {
            //     boxShadow: '0px 1px 24px rgba(0, 0, 0, 0.12)'
            //     // maxHeight: '250px',
            //   }
            // }
            // className="order-cart-item"
            bodyStyle={{
              padding: '0px'
            }}
          >
            <Row>
              <Col
                {...coverGrid}
                align="center"
                style={{ maxHeight: this.props.mobile ? '130px' : '250px', overflow: 'hidden' }}
              >
                <img alt="" src={item.imageUrl} width="100%" />
              </Col>
              <Col {...infoGrid}>
                <Card
                  style={{ height: this.props.mobile ? '180px' : '250px', borderWidth: '0px' }}
                  title={<h3>{item.title}</h3>}
                  // bodyStyle={{
                  //   padding: "40px 20px 20px 20px",
                  // }}
                  // extra={

                  // }
                >
                  {/* {console.log('this.props.mobile', this.props.mobile)} */}
                  <br />
                  <h3>
                    <Position1 bottom={'100'}>
                      <span>Quantity: </span>
                    </Position1>
                  </h3>

                  <br />
                  <br />
                  <Position bottom={'30'}>
                    <strong>
                      <span>Amount</span> &#8377; {`${item.cost} X ${item.quantity}`}
                    </strong>
                  </Position>
                </Card>
              </Col>
            </Row>
          </Card>
        </Link>
      </Col>
    );
  }
}

CartItemComponent.propTypes = {
  item: PropTypes.object,
  onDelete: PropTypes.func,
  edit: PropTypes.boolean,
  onSubmit: PropTypes.func,
  mobile: PropTypes.func
};

export default // compose(
//   graphql(DISABLED_DATES, {
//     options: props => {
//       return {
//         variables: { listingId: props.item.listing.id }
//       };
//     },
//     props({ data: { loading, error, disabledDates, subscribeToMore, updateQuery, refetch } }) {
//       if (error) throw new Error(error);
//       return { loading, disabledDates, subscribeToMore, updateQuery, refetch };
//     }
//   }),
//   graphql(BOOKED_DATES, {
//     options: props => {
//       return {
//         variables: { listingId: props.item.listing.id }
//       };
//     },
//     props({ data: { loading, error, orderDetailsList } }) {
//       if (error) throw new Error(error);
//       return { bookLoading: loading, orderDetailsList };
//     }
//   })
// )(
CartItemComponent;
// );
