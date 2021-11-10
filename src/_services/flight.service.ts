import axios from 'axios';
import { Flight } from 'types/entities/Flight';
import { BASE_API_URL } from 'utils/getBaseApiUrl';

const BASE_FLIGHT_URL = `${BASE_API_URL}/flights`;

const getAllFlights = (): Promise<Flight[]> => {
  return axios.get<Flight[]>(BASE_FLIGHT_URL).then(({ data: flights }) => {
    return flights.map((flight) => arrange(flight));
  });
};

const createFlight = (flight: Flight): Promise<Flight> => {
  return axios
    .post<Flight>(BASE_FLIGHT_URL, flight)
    .then(({ data: flight }) => arrange(flight));
};

const updateFlight = (flight: Flight) => {
  const { id } = flight;

  flight.takeOffSiteId = parseInt(`${flight.takeOffSiteId}`);
  flight.landingSiteId = parseInt(`${flight.landingSiteId}`);
  flight.estimatedHours = parseInt(`${flight.estimatedHours}`);

  return axios
    .put<Flight>(`${BASE_FLIGHT_URL}/${id}`, flight)
    .then(({ data: flight }) => arrange(flight));
};

const deleteFlight = (flightId) => {
  return axios
    .delete<Flight>(`${BASE_FLIGHT_URL}/${flightId}`)
    .then(({ data: flight }) => arrange(flight));
};

// Para que estén en orden las columnas de la tabla.
const arrange = (flight: any) => {
  return {
    id: flight.id,
    estimatedHours: flight.estimatedHours,
    takeOffSiteId: flight.takeOffSite.id,
    landingSiteId: flight.landingSite.id,
    date: flight.date,
    hour: flight.hour,
  };
};

export const useFlightService = () => {
  return { getAllFlights, createFlight, updateFlight, deleteFlight };
};
