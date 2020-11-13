import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { compose } from '@gqlapp/core-common'

import CategoryTreeComponentView from '../components/CategoryTreeComponentView'
import { withCategories } from './CategoryOpertations'

const CategoryTreeComponent = props => {
  return (
    <>
      {!props.loading && props.categories && (
        <CategoryTreeComponentView {...props} />
      )}
    </>
  )
}

CategoryTreeComponent.propTypes = {
  categoriesUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
}

export default compose(withCategories)(CategoryTreeComponent)
