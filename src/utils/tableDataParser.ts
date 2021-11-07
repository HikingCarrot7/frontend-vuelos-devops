import { createDeleteColumn } from '../_components/crud_table/table/DeleteColumn';

export const parseData = (data: Array<any>, setData) => {
  const columns = createColumns(data, setData);
  return columns;
};

const createColumns = (data: Array<any>, setData) => {
  const object = data[0];
  const columns = [];

  for (let key in object) {
    columns.push({
      Header: key,
      accessor: key,
    });
  }

  columns.push(addDeleteColumn(data, setData));

  return columns;
};

const addDeleteColumn = (data, setData) => {
  return {
    Header: 'Delete',
    id: 'delete',
    accessor: (str) => 'delete',
    Cell: (tableProps) => createDeleteColumn(tableProps, data, setData),
  };
};
