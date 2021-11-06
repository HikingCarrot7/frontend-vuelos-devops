import { ChakraProvider } from '@chakra-ui/react';
import { exampleData } from './util/exampleData';
import CrudTable from './components/CrudTable';

const App = () => {
  const handleUpdate = (updatedData, updatedObject) => {
    console.log('Updated object:');
    console.log(updatedObject);
    console.log('Updated all data:');
    console.log(updatedData);
  };

  const handleReset = (data) => {
    console.log('Reset data');
    console.log(data);
  };

  const handleDelete = (updatedData, deletedData) => {
    console.log('Updated after delete: ');
    console.log(updatedData);
    console.log('Deleted data: ');
    console.log(deletedData);
  };

  return (
    <ChakraProvider>
      <CrudTable 
        handleChange={handleUpdate}
        handleReset={handleReset}
        customData={exampleData}
        handleDelete={handleDelete}
      />
    </ChakraProvider>
  );
};

export default App;
