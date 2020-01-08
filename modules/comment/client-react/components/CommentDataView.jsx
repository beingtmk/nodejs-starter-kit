import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@gqlapp/look-client-react';
import CommentDataComponent from './CommentDataComponent';

const CommentDataView = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return <span>{flag ? <CommentDataComponent {...props} /> : <Loading />}</span>;
};

CommentDataView.propTypes = {
  t: PropTypes.func
};

export default CommentDataView;
