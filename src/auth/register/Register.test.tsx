import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Register } from './Register';

describe('Register testing', () => {
  test('Show error if username is too short', async () => {
    const { getByLabelText, getByText } = render(<Register />, {
      wrapper: MemoryRouter,
    });

    const usernameInputNode = getByLabelText('username') as HTMLInputElement;

    fireEvent.focus(usernameInputNode);
    fireEvent.change(usernameInputNode, { target: { value: 'abc' } });
    fireEvent.blur(usernameInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /Se necesita un nombre de usuario con al menos 5 caracteres./i
      );

      expect(usernameInputNode.required).toBeTruthy();
      expect(invalidMsg).toBeDefined();
    });
  });

  test('Show error if email is invalid', async () => {
    const { getByLabelText, getByText } = render(<Register />, {
      wrapper: MemoryRouter,
    });

    const emailInputNode = getByLabelText('email') as HTMLInputElement;

    fireEvent.focus(emailInputNode);
    fireEvent.change(emailInputNode, { target: { value: 'invalid email' } });
    fireEvent.blur(emailInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(/Inserte un correo válido/i);

      expect(emailInputNode.required).toBeTruthy();
      expect(invalidMsg).toBeDefined();
    });
  });

  test('Show error if password has an invalid format', async () => {
    const { getByLabelText, getByText } = render(<Register />, {
      wrapper: MemoryRouter,
    });

    const passwordInputNode = getByLabelText('password') as HTMLInputElement;

    fireEvent.focus(passwordInputNode);
    fireEvent.change(passwordInputNode, { target: { value: '123456789' } });
    fireEvent.blur(passwordInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /La constraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número/i
      );

      expect(passwordInputNode.required).toBeTruthy();
      expect(invalidMsg).toBeDefined();
    });
  });

  test("Show error if confirm password don't match", async () => {
    const { getByLabelText, getByText } = render(<Register />, {
      wrapper: MemoryRouter,
    });

    const passwordInputNode = getByLabelText('password') as HTMLInputElement;

    fireEvent.focus(passwordInputNode);
    fireEvent.change(passwordInputNode, { target: { value: '12345678Aa' } });
    fireEvent.blur(passwordInputNode);

    const confirmPasswordInputNode = getByLabelText(
      'confirmPassword'
    ) as HTMLInputElement;

    fireEvent.focus(confirmPasswordInputNode);

    fireEvent.change(confirmPasswordInputNode, {
      target: { value: '12345678Aaa' },
    });

    fireEvent.blur(confirmPasswordInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(/Las contraseñas no son iguales/i);

      expect(invalidMsg).toBeDefined();
    });
  });
});
