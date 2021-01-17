import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import { FormItem, TreeSelect, Space, Icon } from '@gqlapp/look-client-react';

import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';

const CategoryTreeComponentView = props => {
  const {
    icon = 'ProfileOutlined',
    categories,
    nullable = true,
    formik,
    name,
    client,
    disableParent = false,
    inFilter = false
  } = props;
  const [data, setData] = useState([
    nullable && {
      id: 'abc',
      pId: 0,
      title: 'Parent Category',
      value: 0,
      isLeaf: true
    },
    ...(categories.edges &&
      categories.totalCount > 0 &&
      categories.edges.map(c => {
        return {
          id: c.node.id,
          pId: c.node.parentCategoryId ? c.node.parentCategoryId : 0,
          title: c.node.title,
          value: c.node.id,
          isLeaf: c.node.isLeaf,
          disabled: disableParent && !c.node.isLeaf
        };
      }))
  ]);
  const onChange = value => {
    const { onChange } = props;
    if (onChange) {
      onChange(value);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const LoadData = async treeNode => {
    const {
      data: { category },
      loading
    } = await client.query({
      query: CATEGORY_QUERY,
      variables: {
        id: treeNode.id
      }
    });
    !loading &&
      setData(
        data.concat(
          category.subCategories.map(sC => {
            return {
              id: sC.id,
              pId: sC.parentCategoryId,
              value: sC.id,
              title: sC.title,
              isLeaf: sC.isLeaf,
              disabled: disableParent && !sC.isLeaf
            };
          })
        )
      );
  };

  let labels = inFilter
    ? {}
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      };

  return (
    <FormItem
      label={
        <Space align="center">
          {icon && <Icon type={icon} />}
          {props.label}
        </Space>
      }
      style={{ width: '100%' }}
      {...labels}
    >
      <TreeSelect
        treeDataSimpleMode
        showSearch
        style={{ width: '100%' }}
        value={props.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll={false}
        onChange={onChange}
        loadData={LoadData}
        treeData={data}
      />
    </FormItem>
  );
};

CategoryTreeComponentView.propTypes = {
  categories: PropTypes.object,
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  client: PropTypes.object,
  disableParent: PropTypes.bool,
  nullable: PropTypes.bool,
  inFilter: PropTypes.bool,
  icon: PropTypes.string,
  onChange: PropTypes.func
};

export default withApollo(CategoryTreeComponentView);
