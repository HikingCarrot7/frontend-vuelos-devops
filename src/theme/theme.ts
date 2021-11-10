import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Input } from './components/Input';

const theme = {
  styles: {
    global: (props: any) => ({
      body: {
        minHeight: '100vh',
        bgColor: mode('gray.100', 'gray.900')(props),
      },
      '*::placeholder': {
        color: mode('gray.600', 'whiteAlpha.400')(props),
      },
    }),
  },
  components: {
    Input,
  },
};

export default extendTheme(theme);
