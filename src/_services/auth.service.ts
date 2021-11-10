import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser') || '""')
);

const login = (email: string, password: string) => {
  return axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/login`, {
      email,
      password,
    })
    .then(({ data: user }) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
};

const register = (username: string, email: string, password: string) => {
  return axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      const { username, token } = response.data;

      localStorage.setItem('currentUser', JSON.stringify({ username, token }));
      currentUserSubject.next({ username, token });

      return response;
    });
};

const logout = () => {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
};

export const authService = {
  login,
  register,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
