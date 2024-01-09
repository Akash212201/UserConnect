import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import User from './components/user';
import Password from './components/password';
import Profile from './components/profile';
import Recover from './components/recover';
import Register from './components/register';
import Reset from './components/reset';
import PageNotFound from './components/pageNotFound';
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
import './App.css';
const router= createBrowserRouter([
  {
    path: '/',
    element: <User />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/password',
    element: <ProtectRoute><Password /></ProtectRoute>
  },
  {
    path: '/profile',
    element: <AuthorizeUser> <Profile /></AuthorizeUser>
  },
  {
    path: '/recover',
    element: <Recover />
  },
  {
    path: '/reset',
    element: <Reset />
  },
  {
    path: '/error',
    element: <PageNotFound />
  },
]);
function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
