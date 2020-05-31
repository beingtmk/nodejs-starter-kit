import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { RenderField } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Row, Col, Icon, Button, Form, Modal, Popconfirm, message } from 'antd';

const FormItem = Form.Item;

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
    this.props.isSelectable ? this.props.onSelect(0) : null;
  }

  state = {
    visible: [],
    newAddressState: false,
    address: 0
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
    this.setState({ address: e });
    this.props.isSelectable ? this.props.onSelect(id) : null;
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
      t,
      label,
      onSubmit,
      backgroundColor,
      borderColor,
      handleDeleteAddress
    } = this.props;
    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }
    const isSelectable = this.props.isSelectable || false;

    //Form field Section-->>
    const keys = [
      { key: 'streetAddress1', label: 'streetAddress' },
      { key: 'streetAddress2', label: 'streetAddress' },
      { key: 'city', label: 'city' },
      { key: 'state', label: 'state' },
      { key: 'pinCode', label: 'pinCode' }
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
                  label={t(`${label}.${k.label}`)}
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

              <Row>
                <Col xl={20} lg={20} md={20} sm={4}>
                  <AddEditbtn>
                    <Button shape="circle" size="large" onClick={() => this.modalControl(indexa, true)}>
                      <Icon type="edit" />
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
                <Col xl={4} lg={4} md={1} sm={1}>
                  <Popconfirm
                    title="Are you sure to delete this address?"
                    onConfirm={() => arrayHelpers.remove(indexa) || handleDeleteAddress(address.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <AddDelbtn>
                      <Button type="danger" shape="circle" size="large">
                        <Icon type="delete" />
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
        <Grid.Provider
          // debug
          padding="0px"
          breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}
        >
          <>
            <h3 className="Addresses">Addresses</h3>
            <br />
            <Grid.Bounds direction="vertical" halign="center">
              <Row>
                <Col>
                  <Row>
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
                        <AddNewAddressBlock
                          onClick={this.handleAddAddress}
                          style={{ marginTop: !isSelectable ? '15px' : null }}
                        >
                          <AddNewAddress>
                            <Icon type="plus" />
                          </AddNewAddress>
                          <h4 style={{ position: 'relative', top: '30px' }}>Add a new address</h4>
                        </AddNewAddressBlock>
                      </PadB30>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid.Bounds>
          </>
        </Grid.Provider>
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
