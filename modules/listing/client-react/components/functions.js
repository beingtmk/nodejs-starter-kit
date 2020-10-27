import React from 'react';

export const displayDataCheck = (text, bool = false) => {
  if (bool) {
    return text ? 'True' : 'False';
  }
  return text ? text : 'Not-Provided';
};

export const useImageLoaded = () => {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef();
  const onLoad = () => {
    setLoaded(true);
  };
  React.useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });
  return [ref, loaded, onLoad];
};
