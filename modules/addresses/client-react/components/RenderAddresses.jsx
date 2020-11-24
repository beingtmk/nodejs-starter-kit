import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { RenderField, Icon, FormItem, Row, Col, Message, Button, Popconfirm, Modal } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

const AddressFormItem = styled.div`
  display: inline-block;
  margin: 0px 5px;
  width: 75%;
`;

const HomeAddressBlock = styled.div`
  font-size: 14px;
  text-shadow: 0.7px 0 0;
  letter-spacing: 0.3px;
  position: relative;
  bottom: 8px;
`;

const AddressLines = styled.h4`
  & > h4 {
    line-height: 12px;
    color: #5d5f5f !important;
    position: relative;
    bottom: 15px;
  }
`;

const AddEditbtn = styled.div`
  position: relative;
  bottom: 10px;
  right: 6px;
`;

const AddDelbtn = styled.div`
  position: relative;
  bottom: 10px;
  left: 6px;
`;

const HomeAddress = styled.div`
  font-size: 12px;
  padding: 20px;
  padding-bottom: 1px;
  border: 3px solid ${props => props.borderColor || 'rgba(175, 226, 217, 0.81)'};
  background-color: ${props => props.backgroundColor || 'rgba(35, 177, 149, 0.2)'};
  width: 100%;
  border-radius: 10px;
  ${props =>
    props.selectable
      ? css`
          margin-bottom: 15px;
          background-color: #fff;
          width: 275px !important;
        `
      : css`
          margin-top: 15px;
          width: 275px !important;
        `}
  ${props =>
    props.active &&
    css`
      cursor: pointer;
      background-color: ${props => props.backgroundColor || 'rgba(35, 177, 149, 0.2)'};
    `}
  &:hover {
    background-color: ${props => props.selectable && (props.backgroundColor || 'rgba(35, 177, 149, 0.2)')};
  }
`;

const AddNewAddressBlock = styled.div`
  width: 100%;
  text-align: center;
  border: 1px solid #ddd;
  padding: 35px 20px;
  cursor: pointer;
  border-radius: 10px;
  height: 215px;
  background-color: white;
  width: 275px !important;
  &:hover {
    border: 3px solid rgba(175, 226, 217, 0.81);
    width: 275px !important;
  }
`;

const AddNewAddress = styled.div`
  font-size: 70px;
  line-height: 75px;
  text-shadow: 1px 0 0;
  color: #ddd;
`;

const PadB30 = styled.div`
  padding-bottom: 30px;
`;

class RenderAddress extends React.Component {
  constructor(props) {
    super(props);
    // this.props.isSelectable ? this.props.onSelect(this.props.addresses[0].id) : null;
  }

  state = {
    visible: [],
    newAddressState: false,
    address: null
  };

  componentDidMount() {
    const visible = this.state.visible;
    this.props.addresses.map((a, indexa) => {
      visible[indexa] = false;
    });
    this.setState({ visible });
  }

  classNamesgroup(e) {
    if (this.state.address === e) {
      return 'Active-Cond';
    } else {
      return 'Not-Active';
    }
  }

  renderCondition(e, id) {
    id && (this.setState({ address: e }), this.props.isSelectable ? this.props.onSelect(id) : null);
  }

  modalControl = (index, visiblity) => {
    let visible = this.state.visible;
    visible[index] = visiblity;
    this.setState({ visible });
  };

  handleAddAddress = () => {
    const { arrayHelpers, addresses } = this.props;
    const obj = {};
    const keys = [
      { key: 'streetAddress1' },
      { key: 'streetAddress2' },
      { key: 'city' },
      { key: 'state' },
      { key: 'pinCode' }
    ];
    keys.map(k => (obj[k.key] = ''));
    arrayHelpers.push(obj);

    //Setting the visiblity
    const visible = this.state.visible;
    visible[addresses.length] = true;
    this.setState({ visible, newAddressState: true });
  };

  checkAdd = index => {
    let newAddressState = this.state.newAddressState;
    this.state.newAddressState ? this.props.arrayHelpers.remove(index) : null;
    newAddressState = false;
    this.setState({ newAddressState });
  };

  render() {
    const {
      arrayHelpers,
      name,
      addresses,
      // t,
      // label,
      onSubmit,
      backgroundColor,
      borderColor,
      handleDeleteAddress
    } = this.props;
    function cancel(e) {
      console.log(e);
      Message.error('Click on No');
    }
    const isSelectable = this.props.isSelectable || false;

    //Form field Section-->>
    const keys = [
      { key: 'streetAddress1', label: 'Street address 1' },
      { key: 'streetAddress2', label: 'Street address 2' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'pinCode', label: 'Pin code' }
    ];

    let formItems = [];
    let addressCard = [];

    {
      //Geting all the fields for the form.
      addresses.map(
        (address, indexa) => (
          (formItems[indexa] = keys.map((k, indexk) => (
            <AddressFormItem>
              <FormItem key={indexk}>
                <Field
                  name={`${name}[${indexa}].${k.key}`}
                  component={RenderField}
                  placeholder={k.label}
                  type="text"
                  label={k.label}
                  value={address[k.key]}
                />
              </FormItem>
            </AddressFormItem>
          ))),
          //Geting all the addressCard.
          (addressCard[indexa] = (
            <>
              <HomeAddressBlock> Home Address </HomeAddressBlock>
              <br />
              <AddressLines>
                <h4>{address.streetAddress1 && address.streetAddress1 + ','}</h4>
                <h4>{address.streetAddress2 && address.streetAddress2 + ','}</h4>
                <h4>{address.city && address.city + ','}</h4>
                <h4>{address.state && address.state + ','}</h4>
                <h4>{address.pinCode && address.pinCode + ','}</h4>
              </AddressLines>

              <Row type="flex" justify="center">
                <Col xxl={20} lg={20} md={20} xs={20}>
                  <AddEditbtn>
                    <Button shape="circle" size="lg" onClick={() => this.modalControl(indexa, true)}>
                      <Icon type="EditOutlined" />
                    </Button>
                  </AddEditbtn>
                  <Modal
                    visible={this.state.visible[indexa]}
                    title="Address"
                    okText="Save"
                    onCancel={() => this.modalControl(indexa, false) || this.checkAdd(indexa)}
                    onOk={() =>
                      this.modalControl(indexa, false) || onSubmit(address) || this.setState({ newAddressState: false })
                    }
                  >
                    <div>
                      <FormItem>{formItems[indexa]}</FormItem>
                    </div>
                  </Modal>
                </Col>
                <Col xxl={4} lg={4} md={1} xs={4}>
                  <Popconfirm
                    title="Are you sure to delete this address?"
                    onConfirm={() => arrayHelpers.remove(indexa) || handleDeleteAddress(address.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <AddDelbtn>
                      <Button color="danger" shape="circle" size="lg">
                        <Icon type="DeleteOutlined" />
                      </Button>
                    </AddDelbtn>
                  </Popconfirm>
                </Col>
              </Row>
            </>
          ))
        )
      );
    }
    return (
      <>
        <br />
        <Row type="flex" justify="center">
          <Col>
            <PadB30>
              {isSelectable
                ? addresses.map((address, indexas) => (
                    <HomeAddress
                      backgroundColor={backgroundColor}
                      borderColor={borderColor}
                      key={indexas}
                      selectable={true}
                      onClick={() => this.renderCondition(indexas, address.id)}
                      active={this.state.address === indexas ? true : false}
                    >
                      {addressCard[indexas]}
                    </HomeAddress>
                  ))
                : addresses.map((address, indexas) => (
                    <HomeAddress
                      backgroundColor={backgroundColor}
                      borderColor={borderColor}
                      selectable={false}
                      key={indexas}
                    >
                      {addressCard[indexas]}
                    </HomeAddress>
                  ))}
            </PadB30>
          </Col>
          <Col>
            <PadB30>
              <AddNewAddressBlock onClick={this.handleAddAddress} style={{ marginTop: !isSelectable ? '15px' : null }}>
                <AddNewAddress>
                  <Icon type="PlusOutlined" />
                </AddNewAddress>
                <h4 style={{ position: 'relative', top: '30px' }}>Add a new address</h4>
              </AddNewAddressBlock>
            </PadB30>
          </Col>
        </Row>
      </>
    );
  }
}
export default RenderAddress;
RenderAddress.propTypes = {
  t: PropTypes.func,
  addresses: PropTypes.any,
  name: PropTypes.any,
  label: PropTypes.any,
  keys: PropTypes.any,
  isSelectable: PropTypes.bool,
  arrayHelpers: PropTypes.object,
  onSubmit: PropTypes.func,
  onSelect: PropTypes.func,
  handleDeleteAddress: PropTypes.func,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string
};
