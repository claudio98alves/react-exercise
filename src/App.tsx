import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/callback',
    element: <Callback />,
  },
  {
    path: '/home',
    element: <Home />,
  },
])

const App = () => {

  return (
    <RouterProvider router={router} />
  )
}
export default App