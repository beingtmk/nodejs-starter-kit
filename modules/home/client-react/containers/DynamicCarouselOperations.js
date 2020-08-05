import { message } from 'antd';
import { graphql } from 'react-apollo';

// Query
import DYNAMIC_CAROUSEL_QUERY from '../graphql/DynamicCarouselQuery.graphql';
import DYNAMIC_CAROUSELS_QUERY from '../graphql/DynamicCarouselsQuery.graphql';

// Mutation
import ADD_DYNAMIC_CAROUSEL from '../graphql/AddDynamicCarousel.graphql';
import DELETE_DYNAMIC_CAROUSEL from '../graphql/DeleteDynamicCarousel.graphql';
import EDIT_DYNAMIC_CAROUSEL from '../graphql/EditDynamicCarousel.graphql';

const withDynamicCarousels = Component =>
  graphql(DYNAMIC_CAROUSELS_QUERY, {
    props({ data: { loading, error, dynamicCarousels } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, dynamicCarousels };
    }
  })(Component);

const withDynamicCarousel = Component =>
  graphql(DYNAMIC_CAROUSEL_QUERY, {
    options: props => {
      // console.log(props);
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, dynamicCarousel, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, dynamicCarousel, subscribeToMore, updateQuery };
    }
  })(Component);

const withDeleteDynamicCarousel = Component =>
  graphql(DELETE_DYNAMIC_CAROUSEL, {
    props: ({ mutate }) => ({
      deleteDynamicCarousel: async id => {
        const {
          data: { deleteDynamicCarousel }
        } = await mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteDynamicCarousel: {
              id: id,
              __typename: 'DynamicCarousel'
            }
          }
        });
        console.log('object', deleteDynamicCarousel);
        if (deleteDynamicCarousel) message.warning('Banner deleted.');
        else message.warning('Try again!');
      }
    })
  })(Component);

const withAddDynamicCarousel = Component =>
  graphql(ADD_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      addDynamicCarousel: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addDynamicCarousel: {
                __typename: 'DynamicCarousel',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Banner added.');
          history.push('/dynamic-carousel');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

const withEditDynamicCarousel = Component =>
  graphql(EDIT_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      editDynamicCarousel: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          // console.log('input', input);
          await mutate({
            variables: {
              input: values
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          history.push('/dynamic-carousel');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export {
  withDynamicCarousels,
  withDynamicCarousel,
  withDeleteDynamicCarousel,
  withAddDynamicCarousel,
  withEditDynamicCarousel
};
