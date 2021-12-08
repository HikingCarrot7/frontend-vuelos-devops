import { createDeleteColumn } from '../_components/crud_table/table/DeleteColumn';

export const parseData = (data: any[], deleteRowCallback) => {
  return createColumns(data, deleteRowCallback);
};

const createColumns = (data: any[], deleteRowCallback) => {
  const object = data[0];
  const columns = [];

  for (let key in object) {
    columns.push({
      Header: key,
      accessor: key,
    });
  }

  columns.push(addDeleteColumn(data, deleteRowCallback));

  return columns;
};

const addDeleteColumn = (data, deleteRowCallback) => {
  return {
    id: 'delete',
    Header: 'Delete',
    accessor: (str) => 'delete',
    Cell: (tableProps) => {
      return createDeleteColumn(tableProps, data, deleteRowCallback);
    },
  };
};
