import { authService } from '../_services/auth.service';

export const authHeader = () => {
  const currentUser = authService.currentUserValue;

  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }

  return { Authorization: `Bearer ` };
};
