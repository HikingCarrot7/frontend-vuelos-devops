import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../_services/auth.service';

export interface NavbarProps {
  username: string;
}

export const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Text>{username}</Text>
      <Button colorScheme="teal" variant="outline" onClick={logout}>
        Cerrar sesión
      </Button>
    </Box>
  );
};
