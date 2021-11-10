import { fireEvent, render, waitFor } from '@testing-library/react';
import { CreateFlightTicketModal } from './CreateFlightTicketModal';

describe('Create flight ticket form', () => {
  let mockedOnCloseMethod;
  let mockedHandleCreateFlightTicket;

  beforeEach(() => {
    mockedOnCloseMethod = jest.fn();
    mockedHandleCreateFlightTicket = jest.fn(() => Promise.resolve());
  });

  test('Should call handleCreateFlightTicket method when inputs are valid', async () => {
    const newTicket = {
      flightId: 10,
      flightClassId: 1,
      passengers: 10,
    };

    const { getByLabelText } = render(
      <CreateFlightTicketModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateFlightTicket={mockedHandleCreateFlightTicket}
      />
    );

    const flightIdInputNode = getByLabelText('flightId') as HTMLInputElement;

    const flightClassIdInputNode = getByLabelText(
      'flightClassId'
    ) as HTMLInputElement;

    const passengersInputNode = getByLabelText(
      'passengers'
    ) as HTMLInputElement;

    fireEvent.change(flightIdInputNode, {
      target: { value: newTicket.flightId },
    });

    fireEvent.change(flightClassIdInputNode, {
      target: { value: newTicket.flightClassId },
    });

    fireEvent.change(passengersInputNode, {
      target: { value: newTicket.passengers },
    });

    const createFlightTicketButton = getByLabelText(
      'create-flight-ticket'
    ) as HTMLButtonElement;

    fireEvent.click(createFlightTicketButton);

    await waitFor(() => {
      expect(mockedHandleCreateFlightTicket).toHaveBeenCalledTimes(1);
      expect(mockedHandleCreateFlightTicket).toHaveBeenCalledWith(newTicket);
    });
  });

  test('Should show error is number of passengers is invalid', async () => {
    const { getByText, getByLabelText } = render(
      <CreateFlightTicketModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateFlightTicket={mockedHandleCreateFlightTicket}
      />
    );

    const passengersInputNode = getByLabelText(
      'passengers'
    ) as HTMLInputElement;

    fireEvent.focus(passengersInputNode);
    fireEvent.change(passengersInputNode, {
      target: { value: -1 },
    });
    fireEvent.blur(passengersInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /La cantidad de pasajeros debe ser mayor a 0./i
      );

      expect(invalidMsg).toBeDefined();
    });

    fireEvent.focus(passengersInputNode);
    fireEvent.change(passengersInputNode, {
      target: { value: 35 },
    });
    fireEvent.blur(passengersInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /Se aceptan hasta 30 pasajeros por ticket./i
      );

      expect(invalidMsg).toBeDefined();
    });
  });
});
