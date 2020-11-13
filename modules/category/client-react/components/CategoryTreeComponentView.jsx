import React from 'react';
import PropTypes from 'prop-types';
import { Spin, TreeSelect } from 'antd';
import { useQuery } from 'react-apollo';

import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';

const { TreeNode } = TreeSelect;

function RenderCategoryTreeComponentChildren(props) {
  const { modalId, categoryKey } = props;
  const { loading, data } = useQuery(CATEGORY_QUERY, {
    variables: {
      id: modalId,
    },
  });
  const category = data && data.category;
  // console.log(category);
  return loading ? (
    <TreeNode key={categoryKey} disabled>
      <Spin size="small" />
    </TreeNode>
  ) : category ? (
    <TreeNode
      value={category.id}
      title={category.title}
      // key={categoryKey}
      disabled={category.subCategories && category.subCategories.length > 0}
    >
      {category.subCategories &&
        category.subCategories.length > 0 &&
        category.subCategories.map((c, i) =>
          RenderCategoryTreeComponentChildren({ modalId: c.id, categoryKey: `${i}${categoryKey}` })
        )}
    </TreeNode>
  ) : null;
}

const CategoryTreeComponentView = props => {
  const { categories, formik, name } = props;
  const onChange = value => {
    // console.log(value);
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <h5 style={{ fontSize: '14px' }}>{props.label}:</h5>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={props.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll={false}
        onChange={onChange}
      >
        {categories.edges &&
          categories.totalCount > 0 &&
          categories.edges.map((categoryItem, categoryKey) => (
            <>
              {RenderCategoryTreeComponentChildren({
                modalId: categoryItem.node.id,
                category: categoryItem.node,
                categoryKey: categoryKey,
              })}
            </>
          ))}
      </TreeSelect>
    </>
  );
};

CategoryTreeComponentView.propTypes = {
  categories: PropTypes.object,
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
};

export default CategoryTreeComponentView;
