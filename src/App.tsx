import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './auth/Login';

const App = () => {
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );
};

export default App;
