// eslint-disable-next-line import/prefer-default-export
export const displayDateCheck = (text, bool = false) => {
  if (bool) {
    return text ? 'True' : 'False';
  }
  return text ? new Date(Number(text)).toLocaleDateString('en-IN') : 'Not-Provided';
};
