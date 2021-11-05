import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './components/auth/Login';

const App = () => {
  return (
    <ChakraProvider>
      <Login></Login>
    </ChakraProvider>
  );
};

export default App;
