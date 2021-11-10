import { fireEvent, render, waitFor } from '@testing-library/react';
import { CreateSiteModal } from './CreateSiteModal';

describe('Create site form', () => {
  let mockedOnCloseMethod;
  let mockedHandleCreateSite;

  beforeEach(() => {
    mockedOnCloseMethod = jest.fn();
    mockedHandleCreateSite = jest.fn(() => Promise.resolve());
  });

  test('Should call handleCreateSite method when inputs are valid', async () => {
    const newSite = {
      country: 10,
      state: 'Yucatán',
      city: 'Mérida',
    };

    const { getByLabelText } = render(
      <CreateSiteModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateSite={mockedHandleCreateSite}
      />
    );

    const countryInputNode = getByLabelText('country') as HTMLInputElement;
    const stateInputNode = getByLabelText('state') as HTMLInputElement;
    const cityInputNode = getByLabelText('city') as HTMLInputElement;

    fireEvent.change(countryInputNode, { target: { value: newSite.country } });
    fireEvent.change(stateInputNode, { target: { value: newSite.state } });
    fireEvent.change(cityInputNode, { target: { value: newSite.city } });

    const createSiteButton = getByLabelText('create-site') as HTMLButtonElement;

    fireEvent.click(createSiteButton);

    await waitFor(() => {
      expect(mockedHandleCreateSite).toHaveBeenCalledTimes(1);
      expect(mockedHandleCreateSite).toHaveBeenCalledWith(newSite);
    });
  });

  test('Should show error if state is too short or too large', async () => {
    const { getByText, getByLabelText } = render(
      <CreateSiteModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateSite={mockedHandleCreateSite}
      />
    );

    const stateInputNode = getByLabelText('state') as HTMLInputElement;

    fireEvent.focus(stateInputNode);
    fireEvent.change(stateInputNode, { target: { value: 'Yu' } });
    fireEvent.blur(stateInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /Se requiere un mínimo de 3 caracteres para el estado/i
      );
      expect(invalidMsg).toBeDefined();
      expect(mockedHandleCreateSite).toHaveBeenCalledTimes(0);
      expect(mockedOnCloseMethod).toHaveBeenCalledTimes(0);
    });

    fireEvent.focus(stateInputNode);
    fireEvent.change(stateInputNode, {
      target: {
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    });
    fireEvent.blur(stateInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /El estado es de un máximo de 50 caracteres/i
      );
      expect(invalidMsg).toBeDefined();
      expect(mockedHandleCreateSite).toHaveBeenCalledTimes(0);
      expect(mockedOnCloseMethod).toHaveBeenCalledTimes(0);
    });
  });

  test('Should show error if city is too short or too large', async () => {
    const { getByText, getByLabelText } = render(
      <CreateSiteModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateSite={mockedHandleCreateSite}
      />
    );

    const cityInputNode = getByLabelText('city') as HTMLInputElement;

    fireEvent.focus(cityInputNode);
    fireEvent.change(cityInputNode, { target: { value: 'Mé' } });
    fireEvent.blur(cityInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /Se requiere un mínimo de 3 caracteres para la ciudad/i
      );
      expect(invalidMsg).toBeDefined();
      expect(mockedHandleCreateSite).toHaveBeenCalledTimes(0);
      expect(mockedOnCloseMethod).toHaveBeenCalledTimes(0);
    });

    fireEvent.focus(cityInputNode);
    fireEvent.change(cityInputNode, {
      target: {
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    });
    fireEvent.blur(cityInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /La ciudad es de un máximo de 50 caracteres/i
      );
      expect(invalidMsg).toBeDefined();
      expect(mockedHandleCreateSite).toHaveBeenCalledTimes(0);
      expect(mockedOnCloseMethod).toHaveBeenCalledTimes(0);
    });
  });
});
