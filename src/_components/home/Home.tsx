import { Box } from '@chakra-ui/layout';
import { MdAirplaneTicket, MdOutlineFlight, MdPlace } from 'react-icons/md';
import { Navbar } from '../Navbar';
import { EntityCard } from './EntityCard';

export const Home = () => {
  return (
    <>
      <Navbar />
      <Box
        justifyContent="space-around"
        alignItems="center"
        alignContent="center"
        display={{ sm: 'block', md: 'flex' }}
        maxW="900px"
        m="auto"
        p="3"
      >
        <EntityCard label="Sitios" navigateTo="/sities" icon={MdPlace} />
        <EntityCard
          label="Vuelos"
          navigateTo="/flights"
          icon={MdOutlineFlight}
        />
        <EntityCard
          label="Tickets"
          navigateTo="/tickets"
          icon={MdAirplaneTicket}
        />
      </Box>
    </>
  );
};
