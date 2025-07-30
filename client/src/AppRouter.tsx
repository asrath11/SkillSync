import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/landing-page';
import NotFound from './pages/NotFound';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import { AuthProvider } from './context/authProvider';
//context providers

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </>
  )
);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
