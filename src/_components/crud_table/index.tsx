import React, { useEffect, useState } from 'react';
import { parseData } from 'utils/tableDataParser';
import Table from './Table/Table';

const CrudTable = ({ customData, handleChange, handleReset, handleDelete }) => {
  const [data, setData] = useState(customData as Array<any>);
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [myColumns, setMyColumns] = useState([]);

  const deleteData = (updatedData, deletedData, rowIndex) => {
    const confirmDelete = window.confirm(
      `Are you sure to delete row ${rowIndex}?`
    );

    if (confirmDelete) {
      setData(updatedData);
      handleDelete(updatedData, deletedData);
    } else {
      alert('Delete canceled');
    }
  };

  const updateMyData = (rowIndex: number, columnId: string, value: any) => {
    let dataWasUpdated = false;
    setSkipPageReset(true);
    const oldObject = data[rowIndex];

    const isDataUnchanged = oldObject[columnId] === value;

    if (isDataUnchanged) return dataWasUpdated;

    const confirmUpdate = window.confirm(
      `Are you sure to update row ${rowIndex} at column ${columnId} from ${oldObject[columnId]} to ${value}?`
    );

    if (!confirmUpdate) return dataWasUpdated;

    const updatedObject = { ...oldObject, [columnId]: value };

    const updatedData = data.map((row: number, index: number) => {
      if (index === rowIndex) {
        return updatedObject;
      }
      return row;
    });

    setData(updatedData);
    handleChange(updatedData, updatedObject);
    dataWasUpdated = true;
    return dataWasUpdated;
  };

  useEffect(() => {
    setSkipPageReset(false);
    setMyColumns(parseData(data, deleteData));
  }, [data]);

  const resetData = () => {
    setData(originalData);
    handleReset(originalData);
  };

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
