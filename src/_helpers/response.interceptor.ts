import axios from 'axios';
import { authService } from '_services/auth.service';

export const responseInterceptor = () => {
  axios.interceptors.response.use(undefined, (error) => {
    const response = error.response;

    const { status, data } = error.response;

    if ([401, 403].indexOf(status) !== -1) {
      authService.logout();
      window.location.reload();
    }

    if (!data) {
      return Promise.reject(response.statusText);
    }

    if (Array.isArray(data.errors)) {
      return Promise.reject(data.errors[0]);
    }

    return Promise.reject(data.error);
  });
};
