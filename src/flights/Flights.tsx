import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Flight } from 'types/entities/Flight';
import { CrudTable } from '_components/crud_table';
import { FloatingButton } from '_components/forms/FloatingButton';
import { Navbar } from '_components/shared/Navbar';
import { useFlightService } from '_services/flight.service';
import { CreateFlightModal } from './create_flight/CreateFlightModal';

export interface FlightsProps {}

export const Flights = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flights, setFlights] = useState([]);
  const { getAllFlights, createFlight, deleteFlight, updateFlight } =
    useFlightService();

  useEffect(() => {
    getAllFlights().then((flights) => {
      setFlights(flights);
    });
  }, [getAllFlights]);

  const handleCreateFlight = (flight: Flight) => {
    return createFlight(flight)
      .then((flight) => {
        setFlights((prevFlights) => [...prevFlights, flight]);
        return flight;
      })
      .catch((err) => {
        window.alert(err);
        return Promise.reject(err);
      });
  };

  const handleUpdate = (updatedData, updatedObject) => {
    return updateFlight(updatedObject)
      .then((flight) => true)
      .catch((err) => {
        window.alert(err);
        return Promise.reject(false);
      });
  };

  const handleDelete = (updatedData, deletedData) => {
    const { id } = deletedData;

    return deleteFlight(id)
      .then((flight) => true)
      .catch((err) => {
        window.alert(err);
        return Promise.reject(false);
      });
  };

  return (
    <>
      <Navbar />
      <CrudTable
        {...{
          populateWith: flights,
          onUpdateDataState: setFlights,
          handleUpdate,
          handleDelete,
        }}
      />
      <CreateFlightModal {...{ isOpen, onClose, handleCreateFlight }} />
      <FloatingButton onClick={onOpen} />
    </>
  );
};
