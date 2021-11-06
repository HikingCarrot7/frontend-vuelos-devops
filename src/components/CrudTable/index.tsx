import React, { useState, useEffect } from 'react';
import Table from './Table/Table';
import { Styles } from './styles';
import {parseData} from '../../util/tableDataParser';

const CrudTable = () => {
  const customData = [
    {
      name: 'Carlos',
      lastName: 'Chan',
      age: 21,
      email: 'carlos@gmail.com'
    },
    {
      name: 'Emmanuel',
      lastName: 'Chable',
      age: 22,
      email: 'emman@gmail.com'
    },
    {
      name: 'Nicolas',
      lastName: 'Canul',
      age: 21,
      email: 'nicolas@gmail.com'
    },
    {
      name: 'Eusebio',
      lastName: 'Ajax',
      age: 21,
      email: 'eusebio@gmail.com'
    }
  ];
  const [data, setData] = useState(customData)
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)
  const [myColumns] = parseData(customData);
  
  const updateMyData = (rowIndex: number, columnId: number, value: string) => {
    setSkipPageReset(true)
    setData((old: any) =>
      old.map((row: number, index: number) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])  

  const resetData = () => setData(originalData)

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
