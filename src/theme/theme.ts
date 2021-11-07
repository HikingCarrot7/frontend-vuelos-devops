import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'gray.400',
          },
        },
        'light-outline': {
          field: {
            bgColor: 'gray.100',
            border: '1px solid',
          },
        },
      },
    },
  },
};

export default extendTheme(theme);
