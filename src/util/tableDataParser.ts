export const parseData = (data: Array<any>) => {
  const columns = createColumns(data);
  return [columns];
};

const createColumns = (data: Array<any>) => {
  const object = data[0];
  const columns = [];
  for (let key in object) {
    columns.push({
      Header: key,
      accessor: key,
    });
  }
  return columns;
};
