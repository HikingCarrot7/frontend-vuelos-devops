import { useCallback, useEffect, useState } from 'react';
import { parseData } from 'utils/tableDataParser';
import { DataTable } from './table/Table';

export interface CrudTableProps<T> {
  populateWith: T[];
  askConfirmationOnDelete?: boolean;
  onUpdateDataState: React.Dispatch<React.SetStateAction<any[]>>;
  handleUpdate: (updatedData, updatedObject) => Promise<boolean>;
  handleDelete: (updatedData, updatedObject) => Promise<boolean>;
}

export const CrudTable = <T extends unknown>({
  populateWith,
  onUpdateDataState,
  handleUpdate,
  handleDelete,
  askConfirmationOnDelete = true,
}: CrudTableProps<T>) => {
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [columns, setColumns] = useState([]);

  const deleteRowCallback = useCallback(
    (updatedData, deletedData) => {
      const deleteItem = () => {
        handleDelete(updatedData, deletedData)
          .then(() => {
            onUpdateDataState(updatedData);
          })
          .catch((err) => {});
      };

      if (askConfirmationOnDelete) {
        if (window.confirm('¿Estás seguro que quiere eliminar esta entrada?')) {
          deleteItem();
        }
      } else {
        deleteItem();
      }
    },
    [askConfirmationOnDelete, handleDelete, onUpdateDataState]
  );

  useEffect(() => {
    setSkipPageReset(false);
    setColumns(parseData(populateWith, deleteRowCallback));
  }, [populateWith, deleteRowCallback]);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setSkipPageReset(true);
    const oldObject = populateWith[rowIndex];

    const isDataUnchanged = oldObject[columnId] === value;

    if (isDataUnchanged) return false;

    const updatedObject = { ...(oldObject as any), [columnId]: value };

    const updatedData = populateWith.map((item: T, index: number) => {
      if (index === rowIndex) {
        return updatedObject;
      }

      return item;
    });

    handleUpdate(updatedData, updatedObject)
      .then(() => {
        onUpdateDataState(updatedData);
      })
      .catch((err) => {});

    return true;
  };

  return (
    <DataTable {...{ columns, populateWith, updateData, skipPageReset }} />
  );
};
