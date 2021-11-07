import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import { authService } from '../../_services/auth.service';

export interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { pathname } = useLocation();
  const currentUser = authService.currentUserValue;

  return currentUser ? (
    children
  ) : (
    <Navigate to={{ pathname: '/login' }} state={{ from: pathname }} />
  );
};
