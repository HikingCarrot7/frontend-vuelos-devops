import axios from 'axios';
import { FlightTicket } from 'types/entities/FlightTicket';
import { BASE_API_URL } from 'utils/getBaseApiUrl';

const BASE_USER_FLIGHT_TICKETS_URL = `${BASE_API_URL}/users/me/flight-tickets`;
const BASE_FLIGHT_TICKET_URL = `${BASE_API_URL}/flight-ticket`;

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
  const { id } = flightTicket;

  flightTicket.flightId = parseInt(`${flightTicket.flightId}`);
  flightTicket.flightClassId = parseInt(`${flightTicket.flightClassId}`);
  flightTicket.passengers = parseInt(`${flightTicket.passengers}`);

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
