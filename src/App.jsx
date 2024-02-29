import { useState } from "react";
import SearchBar from "./components/SearchBar";
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Form } from "./components/Form";
import { NotFoundPage } from "./components/NotFoundPage";

const router = createBrowserRouter([{
  path: '/',
  element: <SearchBar />,
  errorElement: <NotFoundPage />
},
{
  path: '/form',
  element: <Form /> 
}
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
