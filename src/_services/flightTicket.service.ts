import axios from 'axios';
import { FlightTicket } from 'types/entities/FlightTicket';
import { authService } from '../_services/auth.service';

const BASE_USER_FLIGHT_TICKETS_URL = `${process.env.REACT_APP_BASE_API_URL}/users/${authService.currentUserValue.id}/flight-tickets`;
const BASE_FLIGHT_TICKET_URL = `${process.env.REACT_APP_BASE_API_URL}/flight-ticket`;

const getUserFlightTickets = (): Promise<FlightTicket[]> => {
  return axios
    .get<FlightTicket[]>(BASE_USER_FLIGHT_TICKETS_URL)
    .then(({ data: flightTickets }) => {
      return flightTickets.map((flightTicket) => arrange(flightTicket));
    });
};

const createFlightTicket = (
  flightTicket: FlightTicket
): Promise<FlightTicket> => {
  return axios
    .post<FlightTicket>(BASE_FLIGHT_TICKET_URL, flightTicket)
    .then(({ data: flightTicket }) => arrange(flightTicket));
};

const updateFlightTicket = (flightTicket: FlightTicket) => {
  console.log({ flightTicket });
  const { id } = flightTicket;

  flightTicket.passengers = parseInt(`${flightTicket.passengers}`);
  flightTicket.userId = parseInt(`${flightTicket.userId}`);
  flightTicket.flightId = parseInt(`${flightTicket.flightId}`);
  flightTicket.flightClassId = parseInt(`${flightTicket.flightClassId}`);

  return axios
    .put<FlightTicket>(`${BASE_FLIGHT_TICKET_URL}/${id}`, flightTicket)
    .then(({ data: flightTicket }) => arrange(flightTicket));
};

const deleteFlightTicket = (flightTicketId) => {
  return axios
    .delete<FlightTicket>(`${BASE_FLIGHT_TICKET_URL}/${flightTicketId}`)
    .then(({ data: flightTicket }) => arrange(flightTicket));
};

// Para que estén en orden las columnas de la tabla.
const arrange = (flightTicket: any) => {
  return {
    id: flightTicket.id,
    userId: authService.currentUserValue.id,
    flightId: flightTicket.flight.id,
    flightClassId: flightTicket.flightClass.id,
    passengers: flightTicket.passengers,
  };
};

export const useFlightTicketService = () => {
  return {
    getUserFlightTickets,
    createFlightTicket,
    updateFlightTicket,
    deleteFlightTicket,
  };
};
