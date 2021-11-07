import { Modal as ChakraModal } from '@chakra-ui/modal';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaCity } from 'react-icons/fa';
import { GiFrance } from 'react-icons/gi';
import { MdArrowDropDown } from 'react-icons/md';

export interface CreateSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSiteModal: React.FC<CreateSiteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const initialRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <ChakraModal
        initialFocusRef={initialRef}
        closeOnOverlayClick={false}
        size="2xl"
        {...{ isOpen, onClose }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear un nuevo sitio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="5">
              <FormControl>
                <FormLabel>País</FormLabel>
                <Select
                  icon={<MdArrowDropDown />}
                  placeholder="Woohoo! A new icon"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GiFrance} color="gray.300" />}
                  />
                  <Input ref={initialRef} placeholder="Yucatán" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Ciudad</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FaCity} color="gray.300" />}
                  />
                  <Input placeholder="Mérida" />
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="3">
              <Button colorScheme="teal" onClick={onClose}>
                Crear sitio
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};
