import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = {
  styles: {
    global: (props: any) => ({
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
      },
    },
  },
};

export default extendTheme(theme);
