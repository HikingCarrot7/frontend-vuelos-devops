import axios from 'axios';
import { authService } from '_services/auth.service';

export const jwtInterceptor = () => {
  axios.interceptors.request.use((request) => {
    const currentUser = authService.currentUserValue;

    if (request.headers) {
      if (currentUser && currentUser.token) {
        request.headers.Authorization = `Bearer ${currentUser.token}`;
      }

      request.headers['Content-Type'] = 'application/json';
    }

    return request;
  });
};
