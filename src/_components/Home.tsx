import { authService } from '../_services/auth.service';
import { Navbar } from './Navbar';

export const Home = () => {
  const { username } = authService.currentUserValue;

  return (
    <>
      <Navbar username={username} />
    </>
  );
};
