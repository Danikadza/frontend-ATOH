import React from 'react';
import LoginPage from './pages/login/login';
import ClientsPage from './pages/clients/clients';
import ErrorPage from './pages/error/error';
import { ChakraProvider } from '@chakra-ui/react'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "clients",
    element: <ClientsPage/>,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
