import {
  Box,
  ChakraProvider,
  CSSReset,
  useColorModeValue,
} from '@chakra-ui/react';
import { AppRoutes } from 'AppRoutes';
import theme from 'theme/theme';
import { jwtInterceptor } from '_helpers/jwt.interceptor';
import { responseInterceptor } from '_helpers/response.interceptor';

jwtInterceptor();
responseInterceptor();

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
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <AppRoutes />
      </Box>
    </ChakraProvider>
  );
};

export default App;
