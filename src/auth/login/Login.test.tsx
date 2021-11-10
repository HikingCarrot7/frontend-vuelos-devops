import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Login } from './Login';

describe('Login testing', () => {
  test('Email should accept input text', async () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInputNode = getByLabelText('email') as HTMLInputElement;

    expect(emailInputNode.value).toBe('');

    fireEvent.change(emailInputNode, {
      target: { value: 'jonhdoe@gmail.com' },
    });

    // https://davidwcai.medium.com/react-testing-library-and-the-not-wrapped-in-act-errors-491a5629193b
    await waitFor(() => {
      expect(emailInputNode.value).toBe('jonhdoe@gmail.com');
    });
  });

  test('Password should accept input text', async () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInputNode = getByLabelText('password') as HTMLInputElement;

    expect(passwordInputNode.value).toBe('');

    fireEvent.change(passwordInputNode, {
      target: { value: 'password' },
    });

    await waitFor(() => {
      expect(passwordInputNode.value).toBe('password');
    });
  });

  test('Show error if email is invalid', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInputNode = getByLabelText('email') as HTMLInputElement;

    fireEvent.focus(emailInputNode);
    fireEvent.change(emailInputNode, { target: { value: 'invalid email' } });
    fireEvent.blur(emailInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(/Inserte un correo válido/i);

      expect(invalidMsg).toBeDefined();
    });
  });

  test('Show error if password is too short', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInputNode = getByLabelText('password') as HTMLInputElement;

    fireEvent.focus(passwordInputNode);
    fireEvent.change(passwordInputNode, { target: { value: '123' } });
    fireEvent.blur(passwordInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /La contraseña debe tener un mínimo de 8 caracteres/i
      );

      expect(invalidMsg).toBeDefined();
    });
  });

  test('Show error if password has an invalid format', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInputNode = getByLabelText('password') as HTMLInputElement;

    fireEvent.focus(passwordInputNode);
    fireEvent.change(passwordInputNode, { target: { value: '1234567890' } });
    fireEvent.blur(passwordInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /La constraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número./i
      );

      expect(invalidMsg).toBeDefined();
    });
  });

  test('Toggle password visibility should work', async () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const toggleButtonNode = getByLabelText(
      'toggle-password-visibility'
    ) as HTMLButtonElement;
    const passwordInputNode = getByLabelText('password') as HTMLInputElement;

    expect(passwordInputNode.type).toBe('password');

    fireEvent.click(toggleButtonNode);

    expect(passwordInputNode.type).toBe('text');
  });
});
