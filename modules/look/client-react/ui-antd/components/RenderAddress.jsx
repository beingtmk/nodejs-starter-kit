import React from 'react';
// import Grid from 'hedron';
import PropTypes from 'prop-types';
// import styled, { css } from 'styled-components';
import { RenderField } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Row, Col, Icon, Button, Form, Modal, Popconfirm, message } from 'antd';

const FormItem = Form.Item;

// const AddressFormItem = styled.div`
//   display: inline-block;
//   margin: 0px 5px;
//   width: 75%;
// `;

// const HomeAddressBlock = styled.div`
//   font-size: 14px;
//   text-shadow: 0.7px 0 0;
//   letter-spacing: 0.3px;
//   position: relative;
//   bottom: 8px;
// `;

// const AddressLines = styled.div`
//   line-height: 12px;
//   color: #5d5f5f !important;
//   position: relative;
//   bottom: 15px;
// `;

// const HomeAddress = styled.div`
//   font-size: 12px;
//   padding: 20px;
//   padding-bottom: 1px;
//   border: 3px solid rgba(175, 226, 217, 0.81);
//   background-color: rgba(35, 177, 149, 0.2);
//   width: 100%;
//   border-radius: 10px;
// `;

// const AddNewAddressBlock = styled.div`
//   width: 100%;
//   text-align: center;
//   border: 1px solid #ddd;
//   padding: 35px 20px;
//   cursor: pointer;
//   border-radius: 10px;
//   height: 215px;
//   background-color: white;
//   width: 300px !important;

//   &:hover && {
//     border: 3px solid rgba(175, 226, 217, 0.81);
//     width: 300px !important;
//   }
// `;

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
      return 'Active-Cond HomeAddress';
    } else {
      return 'Not-Active HomeAddress';
    }
  }

  renderCondition(e) {
    this.setState({ address: e });
    this.props.isSelectable ? this.props.onSelect(e) : null;
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
    const { arrayHelpers, name, addresses, t, label, onSubmit } = this.props;
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
            <FormItem className="addressFormItem" key={indexk}>
              <Field
                name={`${name}[${indexa}].${k.key}`}
                component={RenderField}
                placeholder={k.label}
                type="text"
                label={t(`${label}.${k.label}`)}
                value={address[k.key]}
              />
            </FormItem>
          ))),
          //Geting all the addressCard.
          (addressCard[indexa] = (
            <>
              <div className="HomeAddressBlock"> Home Address </div>
              <br />
              <div className="addressLines">
                <h4>{address.streetAddress1 && address.streetAddress1 + ','}</h4>
                <h4>{address.streetAddress2 && address.streetAddress2 + ','}</h4>
                <h4>{address.city && address.city + ','}</h4>
                <h4>{address.state && address.state + ','}</h4>
                <h4>{address.pinCode && address.pinCode + ','}</h4>
              </div>

              <Row className="margBot8">
                <Col span={12} align="left">
                  <Button
                    className="addEditbtn"
                    shape="circle"
                    size="large"
                    onClick={() => this.modalControl(indexa, true)}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Modal
                    visible={this.state.visible[indexa]}
                    title="Address"
                    okText="Save"
                    onCancel={() => this.modalControl(indexa, false) || this.checkAdd(indexa)}
                    onOk={() =>
                      this.modalControl(indexa, false) || onSubmit() || this.setState({ newAddressState: false })
                    }
                  >
                    <div>
                      <FormItem>{formItems[indexa]}</FormItem>
                    </div>
                  </Modal>
                </Col>
                <Col span={12} align="right">
                  <Popconfirm
                    title="Are you sure to delete this address?"
                    onConfirm={() => arrayHelpers.remove(indexa)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="addDelbtn" type="danger" shape="circle" size="large">
                      <Icon type="delete" />
                    </Button>
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
        <Row>
          <Col span={24}>
            <h3 className="Addresses">Addresses</h3>
            <br />
          </Col>
          <Col>
            <Row>
              <Col span={24} className="PadB30">
                {isSelectable
                  ? addresses.map((address, indexas) => (
                      <div
                        key={indexas}
                        onClick={() => this.renderCondition(indexas)}
                        className={this.classNamesgroup(indexas) + ' addis-Sel'}
                      >
                        {addressCard[indexas]}
                      </div>
                    ))
                  : addresses.map((address, indexas) => (
                      <div className="HomeAddress addnot-Sel" key={indexas}>
                        {addressCard[indexas]}
                      </div>
                    ))}
              </Col>
              <Col span={24} className="PadB30">
                <div
                  className="AddNewAddressBlock"
                  onClick={this.handleAddAddress}
                  style={{ marginTop: !isSelectable ? '15px' : null }}
                >
                  <div className="AddNewAddress">
                    <Icon type="plus" />
                  </div>
                  <h4 style={{ position: 'relative', top: '30px' }}>Add a new address</h4>
                </div>
              </Col>
            </Row>
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
  onSelect: PropTypes.func
};
