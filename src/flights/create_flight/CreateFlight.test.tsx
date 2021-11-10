import { fireEvent, render, waitFor } from '@testing-library/react';
import { CreateFlightModal } from './CreateFlightModal';

describe('Create flight form', () => {
  let mockedOnCloseMethod;
  let mockedHandleCreateFlight;

  beforeEach(() => {
    mockedOnCloseMethod = jest.fn();
    mockedHandleCreateFlight = jest.fn(() => Promise.resolve());
  });

  test('Should call handleCreateFlight method when inputs are valid', async () => {
    const newFlight = {
      date: "2021-10-15",
      hour: "10:35",
      estimatedHours: 8,
      takeOffSiteId: 1,
      landingSiteId: 2
    };

    const { getByLabelText } = render(
      <CreateFlightModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateFlight={mockedHandleCreateFlight}
      />
    );

    const dateInputNode = getByLabelText('date') as HTMLInputElement;
    const hourInputNode = getByLabelText('hour') as HTMLInputElement;
    const estimatedHoursInputNode = getByLabelText('estimatedHours') as HTMLInputElement;
    const takeOffSiteIdInputNode = getByLabelText('takeOffSiteId') as HTMLInputElement;
    const landingSiteIdInputNode = getByLabelText('landingSiteId') as HTMLInputElement;

    fireEvent.change(dateInputNode, {
      target: { value: newFlight.date },
    });

    fireEvent.change(hourInputNode, {
      target: { value: newFlight.hour },
    });

    fireEvent.change(estimatedHoursInputNode, {
      target: { value: newFlight.estimatedHours },
    });

    fireEvent.change(takeOffSiteIdInputNode, {
      target: { value: newFlight.takeOffSiteId },
    });

    fireEvent.change(landingSiteIdInputNode, {
      target: { value: newFlight.landingSiteId },
    });

    const createFlightButton = getByLabelText(
      'create-flight'
    ) as HTMLButtonElement;

    fireEvent.click(createFlightButton);

    await waitFor(() => {
      expect(mockedHandleCreateFlight).toHaveBeenCalledTimes(1);
      expect(mockedHandleCreateFlight).toHaveBeenCalledWith(newFlight);
    });
  });

  test('Should show error is number of estimated hours is invalid', async () => {
    const { getByText, getByLabelText } = render(
      <CreateFlightModal
        isOpen={true}
        onClose={mockedOnCloseMethod}
        handleCreateFlight={mockedHandleCreateFlight}
      />
    );

    const estimatedHoursInputNode = getByLabelText(
      'estimatedHours'
    ) as HTMLInputElement;

    fireEvent.focus(estimatedHoursInputNode);
    fireEvent.change(estimatedHoursInputNode, {
      target: { value: -1 },
    });
    fireEvent.blur(estimatedHoursInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /Se requiere un mínimo de 0 horas/i
      );

      expect(invalidMsg).toBeDefined();
    });

    fireEvent.focus(estimatedHoursInputNode);
    fireEvent.change(estimatedHoursInputNode, {
      target: { value: 200 },
    });
    fireEvent.blur(estimatedHoursInputNode);

    await waitFor(() => {
      const invalidMsg = getByText(
        /Se requiere un máximo de 100 horas/i
      );

      expect(invalidMsg).toBeDefined();
    });
  });
});
