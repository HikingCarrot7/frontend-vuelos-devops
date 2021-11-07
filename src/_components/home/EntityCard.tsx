import Icon from '@chakra-ui/icon';
import { Text, TextProps, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router';

export interface EntityCardProps {
  label: string;
  navigateTo: string;
  icon: IconType;
}

export const EntityCard: React.FC<EntityCardProps & TextProps> = ({
  label,
  navigateTo,
  icon,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(navigateTo);
  };

  return (
    <VStack
      flexDirection="column"
      cursor="pointer"
      w={{ base: '100%', md: '450px' }}
      align="center"
      border="1px"
      borderColor="gray.300"
      borderRadius="8px"
      mx={{ base: 0, md: 5 }}
      my={{ base: 5, md: 0 }}
      p="5"
      _hover={{
        bg: useColorModeValue('gray.200', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200'),
      }}
      onClick={handleCardClick}
    >
      <Icon as={icon} fontSize="70px" />
      <Text fontSize="40px">{label}</Text>
    </VStack>
  );
};
