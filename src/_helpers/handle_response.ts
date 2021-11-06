import { authService } from '../_services/auth.service';

export const handleResponse = (response: Response) => {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
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
    }

    return data;
  });
};
