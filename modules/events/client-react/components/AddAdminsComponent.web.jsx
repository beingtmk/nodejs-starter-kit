import React from 'react';
import Grid from 'hedron';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, Icon, Divider } from 'antd';
import { RenderField, RenderUpload, Button } from '@gqlapp/look-client-react';

const FormItem = Form.Item;

const HomeAddressBlock = styled.div`
  font-size: 14px;
  text-shadow: 0.7px 0 0;
  letter-spacing: 0.3px;
  /* position: relative;
  bottom: 8px; */
`;

const AddressLines = styled.h4`
  & > h4 {
    line-height: 12px;
    color: #5d5f5f !important;
    /* position: relative;
    bottom: 15px; */
  }
`;

const HomeAddress = styled.div`
  font-size: 12px;
  margin: 0px 27px 10px;
  padding: 0px 10px;
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
          width: 165px !important;
        `
      : css`
          /* margin-top: 15px; */
          width: 165px !important;
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
const Visible = styled.div`
  display: ${props => props.visible || 'none'};
`;

export default class AddAdminsComponent extends React.Component {
  state = {
    visible: []
  };

  componentDidMount() {
    const visible = this.state.visible;
    this.props.values.map((v, indexv) => {
      visible[indexv] = 'none';
    });
    this.setState({ visible });
  }

  add = () => {
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};
    const keys = this.props.keys;

    keys.map(k => (obj[k.key] = ''));

    arrayHelpers.push(obj);
    this.handleVisible(this.props.values.length);
  };

  handleVisible = index => {
    const visible = this.state.visible;
    visible[index] = visible[index] === 'block' ? 'none' : 'block';
    this.setState({ visible });
  };

  handleDelete = async (index, id) => {
    this.props.arrayHelpers.remove(index);
    try {
      await this.props.deleteValue(id);
    } catch (e) {
      throw Error(e);
    }
  };

  render() {
    // console.log('props addadmns', this.props);
    const {
      keys,
      name,
      values
      // , arrayHelpers
    } = this.props;
    // const keys = this.props.keys;
    // const name = this.props.name;
    // const values = this.props.values;
    // const arrayHelpers = this.props.arrayHelpers;
    let formItems = null;

    if (values) {
      formItems = values.map((v, indexv) => (
        <Visible visible={this.state.visible[indexv]}>
          <FormItem required={false} key={indexv} style={{ height: '75px' }}>
            {keys.map((k, indexk) => (
              <FormItem style={{ display: 'inline-block', margin: '0px 5px' }} key={indexk}>
                {k.type == 'text' ? (
                  <Field
                    name={`${name}[${indexv}].${k.key}`}
                    component={RenderField}
                    placeholder={k.placeholder || k.key}
                    type="text"
                    label={`${k.label || k.key}`}
                    // label={`${k.label || k.key} #${indexv + 1}`}
                    value={v[k.key]}
                    key={indexv}
                    // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />
                ) : null}

                {k.type == 'number' ? (
                  <Field
                    name={`${name}[${indexv}].${k.key}`}
                    component={RenderField}
                    placeholder={k.placeholder || k.key}
                    type="number"
                    label={`${k.label || k.key}`}
                    value={v[k.key]}
                    key={indexv}
                  />
                ) : null}

                {k.type == 'image' ? (
                  <Field
                    name={`${name}[${indexv}].${k.key}`}
                    component={RenderUpload}
                    type="text"
                    setload={this.props.setload}
                    label={k.label || k.key}
                    value={v[k.key]}
                    key={indexv}
                    // style={{ display: 'inline-block', margin: '0px 5px' }}
                  />
                ) : null}
              </FormItem>
            ))}
            {keys.length > 1 ? (
              <>
                <Icon type="check" style={{ padding: '50px 10px' }} onClick={() => this.handleVisible(indexv)} />
                <Icon
                  title="Remove "
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.handleDelete(indexv, v.id)}
                />
              </>
            ) : null}
          </FormItem>
          <Divider />
        </Visible>
      ));
    }

    let formCards = null;

    if (values) {
      formCards = values.map((v, indexv) => (
        <Grid.Box>
          <Grid.Bounds direction="vertical">
            <HomeAddress>
              <Grid.Box>
                <HomeAddressBlock>Admin</HomeAddressBlock>
              </Grid.Box>
              <Grid.Box>
                <AddressLines>
                  {keys.map(k => (
                    <h4>{v[k.key]}</h4>
                  ))}
                </AddressLines>
              </Grid.Box>
              {keys.length > 1 ? (
                <Grid.Box shiftRight fill>
                  <Icon
                    style={{ fontSize: '15px', padding: '0px 10px' }}
                    type="edit"
                    onClick={() => this.handleVisible(indexv)}
                  />
                </Grid.Box>
              ) : null}
            </HomeAddress>
          </Grid.Bounds>
        </Grid.Box>
      ));
    }

    return (
      <Grid.Provider
        // debug
        padding="0px"
        breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}
      >
        <Grid.Bounds direction="horizontal">
          <Grid.Box fill>
            <FormItem label={this.props.label}>
              <Grid.Bounds direction="vertical">
                <Grid.Box>{formItems}</Grid.Box>
                <Grid.Box>
                  <Grid.Bounds direction="horizontal" wrap>
                    {formCards}
                  </Grid.Bounds>
                </Grid.Box>
              </Grid.Bounds>
            </FormItem>
          </Grid.Box>
          <Grid.Box>
            <Button onClick={this.add} type="button" disabled={this.state.visible.includes('block')}>
              <Icon type="plus" />
            </Button>
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    );
  }
}

AddAdminsComponent.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  keys: PropTypes.array,
  setload: PropTypes.func,
  deleteValue: PropTypes.func,
  buttonText: PropTypes.string,
  arrayHelpers: PropTypes.object
};
