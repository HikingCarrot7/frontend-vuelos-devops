import React, { useState, useEffect } from 'react';
import Table from './Table/Table';
import { Styles } from './styles';
import { parseData } from '../../util/tableDataParser';

const CrudTable = ({customData, handleChange, handleReset}) => {
  const [data, setData] = useState(customData as Array<any>)
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)
  const [myColumns] = parseData(customData);
  
  const updateMyData = (rowIndex: number, columnId: number, value: string) => {
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
  }, [data])  

  const resetData = () => {
    setData(originalData);
    handleReset(originalData);
  }

  return (
    <Styles>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={myColumns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  );
};

export default CrudTable;
