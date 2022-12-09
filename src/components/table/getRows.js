export const getRows = (rows) => {
  if (rows && !rows.length) return [];
  else {
    return [...rows]
      .reverse()
      .map((item, index) => ({ index: index + 1, ...item }));
  }
};
