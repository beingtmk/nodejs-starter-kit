import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import AdminModelsListComponent from '../components/AdminModelsListComponent';
// import ModelsFilterComponent from "../components/ModelsFilterComponent";
import { useModelsWithSubscription } from './withSubscription';
import {
  // withFilterUpdating,
  // withOrderByUpdating,
  withModelUpdate,
  withModels,
  // withModelsState,
  withModelAdd,
  updateModelsState,
  withDeleteModel
} from './ModelOperations';

const AdminModelsList = props => {
  const { t, updateQuery, subscribeToMore } = props;
  const modelUpdated = useModelsWithSubscription(subscribeToMore);
  useEffect(() => {
    if (modelUpdated) {
      updateModelsState(modelUpdated, updateQuery);
    }
  });

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <h1>List of Models</h1>
      <hr />
      {/* <ModelsFilterComponent {...props} />
      <hr /> */}
      <AdminModelsListComponent {...props} />
    </PageLayout>
  );
};

AdminModelsList.propTypes = {
  modelUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  subscribeToMore: PropTypes.func
  // filter: PropTypes.object
};

export default compose(
  // withModelsState,
  withModels,
  // withOrderByUpdating,
  // withFilterUpdating,
  withModelUpdate,
  withModelAdd,
  withDeleteModel
)(translate('blog')(AdminModelsList));
