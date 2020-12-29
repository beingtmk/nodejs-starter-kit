import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import {
  Space,
  Icon,
  Row,
  Col,
  RenderField,
  RenderUpload,
  Button,
  RenderCheckBox,
  Card,
  FormItem
} from '@gqlapp/look-client-react';

const RendersubCategories = props => {
  const { name, setload, values, arrayHelpers } = props;
  const add = () => {
    let obj = {};

    obj['title'] = '';
    obj['description'] = '';
    obj['isNavbar'] = false;
    obj['imageUrl'] = '';
    obj['subCategories'] = [];

    arrayHelpers.push(obj);
  };
  let formItems = null;
  // console.log('valllll', values);

  if (values && values.length !== 0) {
    formItems = values.map((v, indexv) => {
      return (
        <FormItem required={false} key={indexv} style={{ margin: '0px' }}>
          <Card
            type="inner"
            style={{ background: '#f3f3f3', marginBottom: '20px' }}
            title={
              <Row>
                <Col span={18}>
                  <Field
                    name={`${name}[${indexv}].title`}
                    component={RenderField}
                    placeholder={'Sub Category Title'}
                    type="text"
                    style={{ marginBottom: '0px' }}
                    value={v.title}
                  />
                </Col>
                <Col span={6} align="right">
                  <>
                    {values.length >= 1 ? (
                      <Icon
                        style={{ fontSize: '25px', paddingTop: '5px' }}
                        title="Remove "
                        className="dynamic-delete-button"
                        type="MinusCircleOutlined"
                        onClick={() => arrayHelpers.remove(indexv)}
                      />
                    ) : null}
                  </>
                </Col>
              </Row>
            }
          >
            <Col span={24}>
              <Row gutter={10}>
                <Field
                  name={`${name}[${indexv}].description`}
                  component={RenderField}
                  type="text"
                  label={'Description'}
                  // DataUpdate={DataUpdate}
                  value={v.description}
                />
                <Field
                  name={`${name}[${indexv}].isNavbar`}
                  component={RenderCheckBox}
                  type="checkbox"
                  label={'Is Navbar'}
                  checked={v.isNavbar}
                />
                <Field
                  name={`${name}[${indexv}].imageUrl`}
                  component={RenderUpload}
                  type="text"
                  setload={load => setload(load)}
                  label={'Image url'}
                  value={v.imageUrl}
                />
              </Row>
              <FieldArray
                name={`${name}[${indexv}].subCategories`}
                render={arrayHelpers => (
                  <RendersubCategories
                    arrayHelpers={arrayHelpers}
                    values={v.subCategories}
                    // label={"Add Choices"}
                    name={`${name}[${indexv}].subCategories`}
                    setload={setload}
                  />
                )}
              />
            </Col>
          </Card>
        </FormItem>
      );
    });
  }
  return (
    <div>
      <FormItem label={<Space align="center">{props.label}</Space>}>
        {formItems}
        <FormItem>
          <Button style={{ width: '100%' }} onClick={add}>
            {'Add Sub Type'}
          </Button>
        </FormItem>
      </FormItem>
    </div>
  );
};

RendersubCategories.propTypes = {
  values: PropTypes.object,
  arrayHelpers: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  setload: PropTypes.func
};

export default RendersubCategories;
