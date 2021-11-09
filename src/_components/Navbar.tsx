import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../_services/auth.service';

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { username } = authService.currentUserValue;
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <Flex p="5" borderBottom="1px" borderBottomColor="gray.400" align="center">
      <Heading as="h2" isTruncated>
        {username}
      </Heading>
      <Spacer />
      <Button colorScheme="teal" variant="outline" onClick={logout}>
        Cerrar sesión
      </Button>
    </Flex>
  );
};
