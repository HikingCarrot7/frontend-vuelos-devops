import { IconButton } from '@chakra-ui/button';
import { Center } from '@chakra-ui/layout';
import { BsFillTrashFill } from 'react-icons/bs';

const DeleteColumn = ({ tableProps, data, setData }) => {
  const handleOnClick = () => {
    const newData = [...data];
    const dataToDelete = data[tableProps.row.index];

    newData.splice(tableProps.row.index, 1);

    setData(newData, dataToDelete, tableProps.row.index);
  };

  return (
    <Center>
      <IconButton
        aria-label="delete-button"
        colorScheme="red"
        variant="outline"
        icon={<BsFillTrashFill />}
        onClick={handleOnClick}
      />
    </Center>
  );
};

export const createDeleteColumn = (tableProps, data, setData) => {
  return <DeleteColumn {...{ tableProps, data, setData }} />;
};

export default DeleteColumn;
