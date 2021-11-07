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
