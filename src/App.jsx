import SearchBar from "./components/SearchBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Form } from "./components/Form";
import { NotFoundPage } from "./components/NotFoundPage";
import { HiredArtists } from "./components/HiredArtists";
import { NavigationBar } from "./components/NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBar />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/hiredArtists",
    element: <HiredArtists />,
  },
]);

function App() {
  return (
    <>        
        <RouterProvider router={router} />
        
    </>
  );
}

export default App;
