import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Home } from './_components/Home';
import { PrivateRoute } from './_components/PrivateRoute';

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter basename="/app">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
