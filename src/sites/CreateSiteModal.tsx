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
import { Site } from 'types/entities/Site';
import * as yup from 'yup';

export interface CreateSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreateSite: (site: Site) => Promise<Site | void>;
}

const siteValidationSchema = yup.object().shape({
  country: yup
    .number()
    .typeError('El identificador debe ser un número válido')
    .positive('El identificador debe ser mayor a 0.'),
  state: yup
    .string()
    .min(3, 'Se requiere un mínimo de 3 caracteers para el estado.')
    .max(50, 'El estado es de un máximo de 50 caracteres.'),
  city: yup
    .string()
    .min(3, 'Se requiere un mínimo de 3 caracteres para la ciudad.')
    .max(50, 'La ciudad es de un máximo de 50 caracteres.'),
});

export const CreateSiteModal: React.FC<CreateSiteModalProps> = ({
  isOpen,
  onClose,
  handleCreateSite,
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
          country: 1,
          state: '',
          city: '',
        }}
        validationSchema={siteValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleCreateSite({
            country: parseInt(`${values.country}`),
            state: values.state,
            city: values.city,
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
              <ModalHeader>Crear un nuevo sitio</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="5">
                  <FormControl isInvalid={!!errors.country && touched.country}>
                    <FormLabel>País (ID)</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={GiMexico} color="gray.300" />}
                      />
                      <Input
                        name="country"
                        placeholder="México"
                        isRequired
                        ref={initialRef}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.country}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.state && touched.state}>
                    <FormLabel>Estado</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={GiFrance} color="gray.300" />}
                      />
                      <Input
                        name="state"
                        placeholder="Yucatán"
                        isRequired
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.state}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.city && touched.city}>
                    <FormLabel>Ciudad</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaCity} color="gray.300" />}
                      />
                      <Input
                        name="city"
                        placeholder="Mérida"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
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
                    Crear sitio
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
