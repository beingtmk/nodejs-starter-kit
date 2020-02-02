import { graphql } from 'react-apollo';
import update from 'immutability-helper';
// import { removeTypename, log } from '@gqlapp/core-common';
import { message } from 'antd';
import ADD_MODEL from '../graphql/AddModel.graphql';
import UPDATE_MODEL from '../graphql/UpdateModel.graphql';
// import MODEL_STATE_QUERY from '../graphql/ModelsStateQuery.client.graphql';
// import UPDATE_ORDER_BY from '../graphql/UpdateOrderBy.client.graphql';
import MODELS_QUERY from '../graphql/ModelsQuery.graphql';
import DELETE_MODEL from '../graphql/DeleteModel.graphql';

// import UPDATE_FILTER from '../graphql/UpdateFilter.client.graphql';

// const withModelsState = Component =>
//   graphql(MODEL_STATE_QUERY, {
//     props({ data: { modelState } }) {
//       return removeTypename(modelState);
//     }
//   })(Component);

const withModelAdd = Component =>
  graphql(ADD_MODEL, {
    props: ({ mutate }) => ({
      addModel: async input => {
        try {
          const { data: addModel } = await mutate({
            variables: { input }
          });
          message.destroy();
          message.success('Model added!');
          return addModel;
        } catch (e) {
          message.success("Couldn't perform the action!");
          throw e;
        }
      }
    })
  })(Component);

const withModelUpdate = Component =>
  graphql(UPDATE_MODEL, {
    props: ({ mutate }) => ({
      updateModel: async input => {
        try {
          const { data: updateModel } = await mutate({
            variables: { input }
          });
          message.destroy();
          message.success('Changes saved!');
          return updateModel;
        } catch (e) {
          message.success("Couldn't perform the action!");
          throw e;
        }
      }
    })
  })(Component);

const withDeleteModel = Component =>
  graphql(DELETE_MODEL, {
    props: ({ mutate }) => ({
      deleteModel: async input => {
        message.loading('Please wait...', 0);
        const data = await mutate({
          variables: { id: input }
        });
        message.destroy();
        if (data == null) {
          message.error("Couldn't Delete The Item");
        } else {
          message.success('Model Deleted!');
          return data;
        }
      }
    })
  })(Component);

const withModels = Component =>
  graphql(MODELS_QUERY, {
    // options: ({ orderBy, filter }) => {
    //   return {
    //     fetchPolicy: 'network-only',
    //     variables: { orderBy, filter }
    //   };
    // },
    props({ data: { loading, models, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        models,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })(Component);

// const withOrderByUpdating = Component =>
//   graphql(UPDATE_ORDER_BY, {
//     props: ({ mutate }) => ({
//       onOrderBy: orderBy => {
//         mutate({ variables: { orderBy } });
//       }
//     })
//   })(Component);

// const withFilterUpdating = Component =>
//   graphql(UPDATE_FILTER, {
//     props: ({ mutate }) => ({
//       onSearchTextChange(searchText) {
//         mutate({ variables: { filter: { searchText } } });
//       },
//       onGearCategoryChange(gearCategory) {
//         mutate({ variables: { filter: { gearCategory } } });
//       }
//     })
//   })(Component);

const updateModelsState = (modelUpdated, updateQuery) => {
  const { mutation, node } = modelUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return addModels(prev, node);
      case 'DELETED':
        return deleteModelInfo(prev, node.id);
      case 'UPDATED':
        return deleteModelInfo(prev, node.id);
      default:
        return prev;
    }
  });
};

function addModels(prev, node) {
  // check if it is duplicate
  if (prev.models.some(model => model.id === node.id)) {
    return prev;
  }

  return update(prev, {
    models: {
      $set: [node, ...prev.models]
    }
  });
}

function deleteModelInfo(prev, id) {
  const index = prev.models.findIndex(model => model.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    models: {
      $splice: [[index, 1]]
    }
  });
}

export {
  // withModelsState,
  withModelAdd,
  withModels,
  withModelUpdate,
  // withOrderByUpdating,
  // withFilterUpdating,
  withDeleteModel
};
export { updateModelsState };
