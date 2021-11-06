import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers/handle_response';

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser') || '""')
);

const login = (email: string, password: string) => {
  return fetch('http://localhost:5000/api/v1/login', {
    ...requestOptions,
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
};

const register = (username: string, email: string, password: string) => {
  return fetch('http://localhost:5000/api/v1/register', {
    ...requestOptions,
    body: JSON.stringify({ username, email, password }),
  })
    .then(handleResponse)
    .then((user) => {
      const { username, token } = user;

      localStorage.setItem('currentUser', JSON.stringify({ username, token }));
      currentUserSubject.next({ username, token });

      return user;
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
