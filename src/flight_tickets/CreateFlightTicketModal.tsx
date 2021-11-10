import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/modal';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { FaPlane } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineClass } from 'react-icons/md';
import { FlightTicket } from 'types/entities/FlightTicket';
import * as yup from 'yup';

export interface CreateFlightTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreateFlightTicket: (
    flightTicket: FlightTicket
  ) => Promise<FlightTicket | void>;
}

const flightTicketValidationSchema = yup.object().shape({
  flightId: yup
    .number()
    .typeError('El identificador debe ser un número válido')
    .positive('El identificador debe ser mayor a 0.'),
  flightClassId: yup
    .number()
    .typeError('El identificador debe ser un número válido')
    .positive('El identificador debe ser mayor a 0.'),
  passengers: yup
    .number()
    .typeError('La cantidad de pasajeros debe ser un número válido')
    .positive(
      'La cantidad de pasajeros debe ser mayor a 0 y menor o igual a 30.'
    ),
});

export const CreateFlightTicketModal: React.FC<CreateFlightTicketModalProps> =
  ({ isOpen, onClose, handleCreateFlightTicket }) => {
    const initialRef = React.useRef<HTMLInputElement>(null);

    return (
      <ChakraModal
        initialFocusRef={initialRef}
        closeOnOverlayClick={false}
        size="2xl"
        {...{ isOpen, onClose }}
      >
        <ModalOverlay />
        <Formik
          initialValues={{
            flightId: 1,
            flightClassId: 1,
            passengers: 1,
          }}
          validationSchema={flightTicketValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleCreateFlightTicket({
              flightId: parseInt(`${values.flightId}`),
              flightClassId: parseInt(`${values.flightClassId}`),
              passengers: parseInt(`${values.passengers}`),
            })
              .then(() => {
                resetForm();
              })
              .catch((err) => {
                setSubmitting(false);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <ModalContent>
                <ModalHeader>Crear un nuevo ticket de vuelo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing="5">
                    <FormControl
                      isInvalid={!!errors.flightId && touched.flightId}
                    >
                      <FormLabel>Vuelo (ID)</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<Icon as={FaPlane} color="gray.300" />}
                        />
                        <Input
                          ref={initialRef}
                          name="flightId"
                          placeholder="1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.flightId}
                          isRequired
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors.flightId}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.flightClassId && touched.flightClassId
                      }
                    >
                      <FormLabel>Clase del vuelo (ID)</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={
                            <Icon as={MdOutlineClass} color="gray.300" />
                          }
                        />
                        <Input
                          name="flightClassId"
                          placeholder="1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.flightClassId}
                          isRequired
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.flightClassId}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.passengers && touched.passengers}
                    >
                      <FormLabel>Cantidad de pasajeros</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<Icon as={FiUsers} color="gray.300" />}
                        />
                        <Input
                          name="passengers"
                          placeholder="1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.passengers}
                          isRequired
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors.passengers}</FormErrorMessage>
                    </FormControl>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <HStack spacing="3">
                    <Button
                      colorScheme="teal"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Crear ticket de vuelo
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                  </HStack>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </ChakraModal>
    );
  };
