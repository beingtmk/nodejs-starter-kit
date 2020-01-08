import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@gqlapp/look-client-react';
import { Collapse } from 'antd';
import CommentData from '../containers/CommentData';

const { Panel } = Collapse;

const CommentSectionComponent = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <span>
      {flag ? (
        <Collapse>
          <Panel header={<h1>{props.header}</h1>} key="1">
            <CommentData {...props}>
              <CommentData {...props}>
                <CommentData {...props} />
              </CommentData>
            </CommentData>
          </Panel>
        </Collapse>
      ) : (
        <Loading />
      )}
    </span>
  );
};

CommentSectionComponent.propTypes = {
  t: PropTypes.func,
  header: PropTypes.string
};

export default CommentSectionComponent;
