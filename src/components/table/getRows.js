export const getRows = (rows) => {
  if (rows && !rows.length) return [];
  else {
    return rows.map((item, index) => ({ index: index + 1, ...item }));
  }
};
