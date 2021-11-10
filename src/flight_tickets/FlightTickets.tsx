import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FlightTicket } from 'types/entities/FlightTicket';
import { CrudTable } from '_components/crud_table';
import { FloatingButton } from '_components/forms/FloatingButton';
import { Navbar } from '_components/Navbar';
import { useFlightTicketService } from '_services/flight_ticket.service';
import { CreateFlightTicketModal } from './create_flight/CreateFlightTicketModal';

export interface FlightTicketsProps {}

export const FlightTickets = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flightTickets, setFlightTickets] = useState([]);
  const {
    getUserFlightTickets,
    createFlightTicket,
    deleteFlightTicket,
    updateFlightTicket,
  } = useFlightTicketService();

  useEffect(() => {
    getUserFlightTickets().then((flightTickets) => {
      setFlightTickets(flightTickets);
    });
  }, [getUserFlightTickets]);

  const handleCreateFlightTicket = (flightTicket: FlightTicket) => {
    return createFlightTicket(flightTicket)
      .then((flightTicket) => {
        setFlightTickets((prevFlightTickets) => [
          ...prevFlightTickets,
          flightTicket,
        ]);

        return flightTicket;
      })
      .catch((err) => {
        window.alert(err);
        return Promise.reject(err);
      });
  };

  const handleUpdate = (updatedData, updatedObject) => {
    return updateFlightTicket(updatedObject)
      .then((flightTicket) => true)
      .catch((err) => {
        window.alert(err);
        return Promise.reject(false);
      });
  };

  const handleDelete = (updatedData, deletedData) => {
    if (!window.confirm('¿Estás seguro que quiere eliminar esta entrada?')) {
      return Promise.resolve(false);
    }

    const { id } = deletedData;

    return deleteFlightTicket(id)
      .then((flightTicket) => true)
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
          populateWith: flightTickets,
          handleUpdate,
          handleDelete,
        }}
      />
      <CreateFlightTicketModal
        {...{ isOpen, onClose, handleCreateFlightTicket }}
      />
      <FloatingButton onClick={onOpen} />
    </>
  );
};
