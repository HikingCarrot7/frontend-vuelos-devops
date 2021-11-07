import { useEffect, useState } from 'react';
import { parseData } from 'utils/tableDataParser';
import { DataTable } from './table/Table';

export const CrudTable = ({ populateWith, handleUpdate, handleDelete }) => {
  const [data, setData] = useState(populateWith as Array<any>);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setData(populateWith);
  }, [populateWith]);

  useEffect(() => {
    setSkipPageReset(false);
    setColumns(parseData(data, deleteData));
  }, [data]);

  const deleteData = (updatedData, deletedData, rowIndex) => {
    handleDelete(updatedData, deletedData).then(() => {
      setData(updatedData);
    });
  };

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setSkipPageReset(true);
    const oldObject = data[rowIndex];

    const isDataUnchanged = oldObject[columnId] === value;

    if (isDataUnchanged) return false;

    const updatedObject = { ...oldObject, [columnId]: value };

    const updatedData = data.map((row: number, index: number) => {
      if (index === rowIndex) {
        return updatedObject;
      }

      return row;
    });

    handleUpdate(updatedData, updatedObject)
      .then(() => {
        setData(updatedData);
      })
      .catch((err) => {});

    return true;
  };

  return <DataTable {...{ columns, data, updateData, skipPageReset }} />;
};
