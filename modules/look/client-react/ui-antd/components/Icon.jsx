import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';
import loadable from '@loadable/component';

const SkeletonAvatar = Skeleton.Avatar;

export const IconSkeleton = props => {
  const { active = true, size = 'small', shape = 'square', style = {} } = props;

  return <SkeletonAvatar style={style} active={active} size={size} shape={shape} />;
};

IconSkeleton.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.string,
  shape: PropTypes.string,
  style: PropTypes.object
};

const Icon = props => {
  const [load, setLoad] = React.useState(false);
  const { type, style } = props;
  const DynamicIcon = type && loadable(() => import(`@ant-design/icons/es/icons/${type}.js`));

  React.useEffect(() => {
    if (DynamicIcon) {
      setLoad(true);
    }
  }, [DynamicIcon, load]);
  return load ? <DynamicIcon type={type} {...props} /> : <IconSkeleton style={style} />;
};

Icon.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object
};

export default Icon;
