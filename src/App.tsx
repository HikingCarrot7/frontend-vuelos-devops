import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './auth/Login';
import CrudTable from './components/CrudTable';

const App = () => {
  return (
    <ChakraProvider>
      <Login />
      <CrudTable />
    </ChakraProvider>
  );
};

export default App;
