import { Button, ButtonProps } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';

export interface FloatingButtonProps {}

export const FloatingButton: React.FC<FloatingButtonProps & ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button
      position="fixed"
      w="60px"
      h="60px"
      bottom="40px"
      right="40px"
      bgColor="#0C9"
      color="#FFF"
      borderRadius="50px"
      textAlign="center"
      boxShadow="2px 2px 2px #999"
      _hover={{
        bgColor: 'teal.100',
        color: 'gray.400',
      }}
      {...rest}
    >
      <AddIcon />
    </Button>
  );
};
