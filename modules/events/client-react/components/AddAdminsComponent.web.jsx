import React from 'react';
import styled from 'styled-components';
import {
  Icon,
  // , Modal
  Divider
} from 'antd';
import { PropTypes } from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField, RenderAutoComplete } from '@gqlapp/look-client-react';

const AddAdminBtn = styled.div`
  /* background: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 0 0 2px 2px;
  color: #1d2129;
   */
  height: 40px;
  width: 40px;
  cursor: pointer;
  text-align: center;
  margin-left: 10px;
  padding: 4px 4px;
  border: 3px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  bottom: 10px;

  &:hover {
    border: 3px solid #4c8bf5;
  }
`;
const AdminCard = styled.div`
  font-size: 12px;
  /* padding: 20px;
  padding-bottom: 1px; */
  border: 3px solid #4c8bf5;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
`;

const AdminCardLines = styled.div`
  & > h4 {
    line-height: 12px;
    color: #5d5f5f !important;
    /* position: relative;
    bottom: 15px; */
  }
`;

class AddAdminsComponent extends React.Component {
  constructor(props) {
    super(props);
    const { visible } = this.state;
    this.props.value.map((admin, index) => {
      visible[index] = false;
    });
    this.setState({ visible });
  }

  state = { visible: [], dataSource: [] };

  handleVisible = () => {
    const { visible } = this.state;
    if (!visible) {
      const admin = {};
      this.props.value.push(admin);
    }
    this.setState({ visible: visible ? false : true });
  };

  // FOR RENDERAUTOCOMPLETE
  handleSearch = value => {
    this.setState({
      dataSource: value ? this.searchResult(value) : []
    });
  };

  searchResult(query) {
    var items = this.props.users.filter(
      item =>
        item.username.toUpperCase().includes(query.toUpperCase()) ||
        (item.profile &&
          ((item.profile.firstName && item.profile.firstName.toUpperCase().includes(query.toUpperCase())) ||
            (item.profile.lastName && item.profile.lastName.toUpperCase().includes(query.toUpperCase()))))
    );
    return items;
  }

  render() {
    const {
      label,
      value,
      //  isAdmin, users,
      name
    } = this.props;
    console.log('value', value);

    let adminCard = [];
    let adminCardField = [];
    {
      value.map(
        (admin, index) => (
          (adminCard[index] = (
            <AdminCardLines>
              <h4>{admin.userName}</h4>
              <h4>{admin.contactInfo}</h4>
            </AdminCardLines>
          )),
          (adminCardField[index] = (
            <div>
              {console.log('`${name}[${index}].userName`', `${name}[${index}].userName`)}
              <Field
                name={`${name}[${index}].userName`}
                dataSource={this.state.dataSource.map(item => item.username)}
                component={RenderAutoComplete}
                label="User Name"
                value={admin.userName}
                // onSelect={this.onSelect}
                onSearch={this.handleSearch}
              />
              <Field
                name={`${name}[${index}].contactInfo`}
                component={RenderField}
                placeholder="Enter contact info..."
                type="text"
                label="Contact Info"
                value={admin.contactInfo}
              />
              <Divider />
            </div>
          ))
        )
      );
    }

    return (
      <>
        <Divider />
        <div style={{ display: 'flex' }}>
          <h4>{label} :</h4>
          <AddAdminBtn onClick={this.handleVisible}>
            <Icon style={{ fontSize: '25px' }} type="plus" />
          </AddAdminBtn>
        </div>
        <Divider />
        {value.map((admin, index) => (
          <>{adminCardField[index]}</>
        ))}
        {value.map((admin, index) => (
          <>
            <AdminCard>{adminCard[index]}</AdminCard>;
          </>
        ))}
      </>
    );
  }
}

AddAdminsComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  users: PropTypes.object,
  name: PropTypes.string
};

export default AddAdminsComponent;
