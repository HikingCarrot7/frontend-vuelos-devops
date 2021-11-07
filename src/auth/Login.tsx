import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, Link } from '@chakra-ui/layout';
import { VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ToggablePasswordViewInput } from '_components/forms/ToggablePasswordViewInput';
import { usePrevLocation } from '_hooks/usePrevLocation';
import { authService } from '../_services/auth.service';

export interface LoginProps {}

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Inserte un correo válido.'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener un mínimo de 8 caracteres.')
    .max(16, 'La contraseña debe tener un máximo de 16 caracteres.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
      'La constraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número.'
    ),
});

export const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { from } = usePrevLocation();

  useEffect(() => {
    if (authService.currentUserValue) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Box w="80%" maxW="450px" margin="auto">
      <Heading py="5">Login</Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          authService
            .login(values.email, values.password)
            .then(() => {
              navigate(from);
            })
            .catch((err: any) => {
              window.alert(err);
            })
            .finally(() => {
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
            </VStack>
            <Button
              colorScheme="teal"
              variant="outline"
              type="submit"
              width="full"
              disabled={isSubmitting}
              my={4}
            >
              Iniciar sesión
            </Button>
            <Link
              as={RouterLink}
              to={{ pathname: '/register' }}
              state={{ from }}
              color="teal.500"
            >
              ¿Nuevo? Crear una cuenta
            </Link>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
