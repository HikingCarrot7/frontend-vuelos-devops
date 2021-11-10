import { Login } from 'auth/Login';
import { Register } from 'auth/Register';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Sites } from 'sites/Sites';
import { FlightTickets } from 'flightTickets/FlightTickets';
import { Flights } from 'flights/Flights';
import { Home } from '_components/home/Home';
import { PrivateRoute } from '_components/utils/PrivateRoute';

export const AppRoutes = () => {
  return (
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
        />
        <Route
          path="/sities"
          element={
            <PrivateRoute>
              <Sites />
            </PrivateRoute>
          }
        />
        <Route
          path="/flights"
          element={
            <PrivateRoute>
              <Flights />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <FlightTickets />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
