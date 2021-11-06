import React from 'react';

const DeleteColumn = ({tableProps, data, setData}) => {
  return (
    <span
      style={{
        cursor: 'pointer',
        color: 'blue',
        textDecoration: 'underline',
      }}
      onClick={() => {
        const dataCopy = [...data];
        const dataToDelete = data[tableProps.row.index];
        dataCopy.splice(tableProps.row.index, 1);
        setData(dataCopy, dataToDelete, tableProps.row.index);
      }}
    >
      Delete
    </span>
  );
};

export const createDeleteColumn = (tableProps, data, setData) => {
  return <DeleteColumn tableProps={tableProps} data={data} setData={setData} />;
};

export default DeleteColumn;