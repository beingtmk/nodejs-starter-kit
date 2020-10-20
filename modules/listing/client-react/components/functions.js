export const displayDataCheck = (text, bool = false) => {
  if (bool) {
    return text ? 'True' : 'False';
  }
  return text ? text : 'Not-Provided';
};
