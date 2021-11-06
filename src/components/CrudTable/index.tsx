import React, { useState, useEffect } from 'react';
import Table from './Table/Table';
import { parseData } from '../../util/tableDataParser';

const CrudTable = ({customData, handleChange, handleReset, handleDelete}) => {
  const [data, setData] = useState(customData as Array<any>)
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)
  const [myColumns, setMyColumns] = useState([]);

  const deleteData = (updatedData, deletedData) => {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      setData(updatedData);
      handleDelete(updatedData, deletedData);
    } else {
      alert('Delete canceled');
    }
  };
  
  const updateMyData = (rowIndex: number, columnId: number, value: any) => {
    setSkipPageReset(true)
    const oldObject = data[rowIndex];
    const updatedObject = {...oldObject, [columnId]: value};
    const updatedData = data.map((row: number, index: number) => {
      if (index === rowIndex) {
        return updatedObject;
      }
      return row;
    });
    setData(updatedData);
    handleChange(updatedData, updatedObject);
  }

  useEffect(() => {
    setSkipPageReset(false)
    setMyColumns(parseData(data, deleteData));
  }, [data])

  const resetData = () => {
    setData(originalData);
    handleReset(originalData);
  }

  return (
    <>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={myColumns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </>
  );
};

export default CrudTable;
