import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './auth/Login';
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

  return (
    <ChakraProvider>
      <Login />
      <CrudTable 
        handleChange={handleUpdate}
        handleReset={handleReset}
        customData={exampleData}  
      />
    </ChakraProvider>
  );
};

export default App;
