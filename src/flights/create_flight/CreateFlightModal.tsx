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
import { FaCity } from 'react-icons/fa';
import { GiFrance, GiMexico } from 'react-icons/gi';
import { Flight } from 'types/entities/Flight';
import * as yup from 'yup';

export interface CreateFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreateFlight: (flight: Flight) => Promise<Flight | void>;
}

const flightValidationSchema = yup.object().shape({
  estimatedHours: yup
    .number()
    .min(0, 'Se requiere un mínimo de 0 horas')
    .max(100, 'Se requiere un máximo de 100 horas')
    .typeError('Las horas estimadas deben ser un número válido'),
  takeOffSiteId: yup
    .number()
    .typeError('El identificador debe ser un número válido')
    .positive('El identificador debe ser mayor a 0.'),
  landingSiteId: yup
    .number()
    .typeError('El identificador debe ser un número válido')
    .positive('El identificador debe ser mayor a 0.'),
  date: yup
    .string()
    .matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, 'La fecha debe tener el formato YYYY-MM-DD'),
  hour: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'La hora debe tener el formato HH:MM (24 horas).'),
});

export const CreateFlightModal: React.FC<CreateFlightModalProps> = ({
  isOpen,
  onClose,
  handleCreateFlight,
}) => {
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
          estimatedHours: 1,
          takeOffSiteId: 1,
          landingSiteId: 2,
          date: '',
          hour: '',
        }}
        validationSchema={flightValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleCreateFlight({
            estimatedHours: parseInt(`${values.estimatedHours}`),
            takeOffSiteId: parseInt(`${values.takeOffSiteId}`),
            landingSiteId: parseInt(`${values.landingSiteId}`),
            date: values.date,
            hour: values.hour,
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
              <ModalHeader>Crear un nuevo vuelo</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="5">
                  <FormControl isInvalid={!!errors.estimatedHours && touched.estimatedHours}>
                    <FormLabel>Horas estimadas</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={GiMexico} color="gray.300" />}
                      />
                      <Input
                        aria-label="estimatedHours"
                        name="estimatedHours"
                        placeholder="0"
                        isRequired
                        ref={initialRef}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.estimatedHours}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.estimatedHours}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.takeOffSiteId && touched.takeOffSiteId}>
                    <FormLabel>Sitio de despegue (ID)</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={GiFrance} color="gray.300" />}
                      />
                      <Input
                        aria-label="takeOffSiteId"
                        name="takeOffSiteId"
                        placeholder="1"
                        isRequired
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.takeOffSiteId}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.takeOffSiteId}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.landingSiteId && touched.landingSiteId}>
                    <FormLabel>Sitio de aterrizaje (ID)</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaCity} color="gray.300" />}
                      />
                      <Input
                        aria-label="landingSiteId"
                        name="landingSiteId"
                        placeholder="2"
                        isRequired
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.landingSiteId}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.landingSiteId}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.date && touched.date}>
                    <FormLabel>Fecha de vuelo</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaCity} color="gray.300" />}
                      />
                      <Input
                        aria-label="date"
                        name="date"
                        placeholder="YYYY-MM-DD"
                        isRequired
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.date}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.hour && touched.hour}>
                    <FormLabel>Hora de vuelo</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaCity} color="gray.300" />}
                      />
                      <Input
                        aria-label="hour"
                        name="hour"
                        placeholder="HH:MM"
                        isRequired
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.hour}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.hour}</FormErrorMessage>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <HStack spacing="3">
                  <Button
                    colorScheme="teal"
                    type="submit"
                    aria-label="create-flight"
                    disabled={isSubmitting}
                  >
                    Crear vuelo
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
