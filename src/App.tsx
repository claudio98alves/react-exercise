import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Artist from "./pages/Artist";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { AuthProvider } from './hooks/useAuth';

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
    element: <ProtectedRoute/>,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/artist/:artistId',
        element: <Artist />,
      },
      {
        path: '/track/trackId:',
        element: <Home />,
      },
    ]
  },
])

const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
export default App