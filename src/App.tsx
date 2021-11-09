import { ChakraProvider, CSSReset } from '@chakra-ui/react';
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
      <AppRoutes />
    </ChakraProvider>
  );
};

export default App;
