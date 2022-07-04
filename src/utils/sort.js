export const sortByProperty = (property, order) => {
  if (order === 'ascending')
    return (a, b) =>
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  else
    return (a, b) =>
      a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
};

export const sortByDate = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
};
