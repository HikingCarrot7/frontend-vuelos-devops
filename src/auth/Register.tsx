import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ToggablePasswordViewInput } from '_components/forms/ToggablePasswordViewInput';
import { usePrevLocation } from '_hooks/usePrevLocation';
import { authService } from '../_services/auth.service';
import { loginValidationSchema } from './Login';

export interface RegisterProps {}

const registerValidationSchema = loginValidationSchema.shape({
  username: yup
    .string()
    .min(5, 'Se necesita un nombre de usario con al menos 5 caracteres.')
    .max(35, 'El nombrede usuario es de un máximo de 35 caracteres.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no son iguales.'),
});

export const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const { from } = usePrevLocation();

  return (
    <Box w="80%" maxW="450px" margin="auto">
      <Heading py="5">Registrarse</Heading>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          authService
            .register(values.username, values.email, values.password)
            .then(() => {
              navigate(from);
              setSubmitting(false);
            })
            .catch((err) => {
              window.alert(err);
              setSubmitting(false);
            });
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing="6">
              <FormControl
                isRequired
                isInvalid={!!errors.username && touched.username}
              >
                <FormLabel>Nombre de usuario</FormLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="HikingCarrot7"
                  size="lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors.email && touched.email}
              >
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="john.doe@hotmail.com"
                  size="lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors.password && touched.password}
              >
                <FormLabel>Contraseña</FormLabel>
                <ToggablePasswordViewInput
                  inputName="password"
                  {...{ handleChange, handleBlur }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              >
                <FormLabel>Confirmar contraseña</FormLabel>
                <ToggablePasswordViewInput
                  inputName="confirmPassword"
                  {...{ handleChange, handleBlur }}
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            </VStack>
            <Button
              colorScheme="teal"
              variant="outline"
              type="submit"
              width="full"
              disabled={isSubmitting}
              my={4}
            >
              Crear cuenta
            </Button>
            <Link
              as={RouterLink}
              to={{ pathname: '/login' }}
              state={{ from }}
              color="teal.500"
            >
              ¿Ya tienes una cuenta? Iniciar sesión
            </Link>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
